'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function MediaManagerClient({ 
  product, 
  existingMedia 
}: { 
  product: any, 
  existingMedia: any[] 
}) {
  const router = useRouter()
  const supabase = createClient()
  const [isUploading, setIsUploading] = useState(false)
  
  // File inputs references
  const masterInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  // Default to the original image if no master is set in DB yet
  const masterMedia = existingMedia.find(m => m.is_master) || { image_url: product.imageUrl, is_placeholder: true }
  const galleryMedia = existingMedia.filter(m => !m.is_master)

  const handleUpload = async (file: File, isMaster: boolean) => {
    try {
      setIsUploading(true)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${product.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-media')
        .getPublicUrl(filePath)

      // If uploading a new master, unset old masters
      if (isMaster) {
        await supabase
          .from('product_media')
          .update({ is_master: false })
          .eq('product_id', product.id)
      }

      // Insert into product_media table
      const { error: dbError } = await supabase
        .from('product_media')
        .insert({
          product_id: product.id,
          image_url: publicUrl,
          is_master: isMaster
        })

      if (dbError) throw dbError

      router.refresh()
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Make sure your bucket policies allow inserts.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    try {
      // Delete from storage
      const urlParts = imageUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]
      await supabase.storage.from('product-media').remove([fileName])

      // Delete from DB
      await supabase.from('product_media').delete().eq('id', id)
      
      router.refresh()
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete image.')
    }
  }

  const handleSetMaster = async (id: string) => {
    try {
      // Unset all masters for this product
      await supabase.from('product_media').update({ is_master: false }).eq('product_id', product.id)
      // Set the new master
      await supabase.from('product_media').update({ is_master: true }).eq('id', id)
      
      router.refresh()
    } catch (error) {
      console.error('Setting master failed:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Hidden file inputs */}
      <input 
        type="file" 
        ref={masterInputRef} 
        onChange={(e) => {
          if (e.target.files?.[0]) handleUpload(e.target.files[0], true)
        }} 
        className="hidden" 
        accept="image/*" 
      />
      <input 
        type="file" 
        ref={galleryInputRef} 
        onChange={(e) => {
          if (e.target.files?.[0]) handleUpload(e.target.files[0], false)
        }} 
        className="hidden" 
        accept="image/*" 
        multiple
      />

      {/* Left Column - Master Image */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Master Image
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Primary</span>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              This image represents the product globally across the storefront, catalog, and checkout.
            </p>
            
            <div className={`relative aspect-square w-full bg-slate-100 rounded-lg overflow-hidden border-2 border-dashed border-slate-300 group hover:border-indigo-400 transition-colors ${isUploading ? 'opacity-50' : ''}`}>
              <Image 
                src={masterMedia.image_url}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button 
                  onClick={() => masterInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-white text-slate-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 shadow-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  {isUploading ? 'Uploading...' : 'Replace Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="font-medium text-sm text-slate-800 mb-2">Usage Locations</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg> Main Product Listing</li>
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg> Category Hero Banner</li>
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg> Order Summaries</li>
          </ul>
        </div>
      </div>

      {/* Right Column - Gallery Images */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                Product Gallery
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Maximum 5 gallery images.</p>
            </div>
            <span className="text-sm font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
              {galleryMedia.length} / 5 Slots Used
            </span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              {galleryMedia.map((mediaItem, i) => (
                <div key={mediaItem.id} className="group relative aspect-square rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                  <Image 
                    src={mediaItem.image_url}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {i + 1}
                  </div>
                  
                  {/* Hover controls */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button 
                      onClick={() => handleSetMaster(mediaItem.id)}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-indigo-700 shadow-sm w-[100px]"
                    >
                      Set Master
                    </button>
                    <button 
                      onClick={() => handleDelete(mediaItem.id, mediaItem.image_url)}
                      className="bg-white text-red-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-50 shadow-sm w-[100px]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Slot */}
              {galleryMedia.length < 5 && (
                <button 
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={isUploading}
                  className={`aspect-square rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors group ${isUploading ? 'opacity-50' : ''}`}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </div>
                  <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Add Image'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
