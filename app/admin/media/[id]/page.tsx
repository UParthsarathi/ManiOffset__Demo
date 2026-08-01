import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { products } from '@/lib/data'
import Link from 'next/link'
import { MediaManagerClient } from './MediaManagerClient'
import { ADMIN_EMAIL } from '@/lib/admin'

export default async function ProductMediaEditor({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id)
  const product = products.find(p => p.id === productId)

  if (!product) {
    redirect('/admin/media')
  }

  // Fetch existing media from Supabase
  const { data: existingMedia } = await supabase
    .from('product_media')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: true });

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <Link href="/admin/media" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m15 18-6-6 6-6"/></svg>
          Back to Media Manager
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#20283c] mb-2">{product.title}</h1>
            <p className="text-slate-500">{product.category}</p>
          </div>
        </div>
      </div>

      <MediaManagerClient product={product} existingMedia={existingMedia || []} />
    </div>
  )
}
