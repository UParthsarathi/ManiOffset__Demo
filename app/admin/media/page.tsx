import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { products } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { ADMIN_EMAIL } from '@/lib/admin'

export default async function MediaDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, typeof products>)

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#20283c] mb-2">Product Media Manager</h1>
          <p className="text-slate-500">Manage master images and gallery assets for all 29 products.</p>
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map(product => (
                <Link 
                  key={product.id} 
                  href={`/admin/media/${product.id}`}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-indigo-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                      Master Image
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-slate-900 line-clamp-1" title={product.title}>{product.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {/* Mock gallery thumbnails */}
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-6 w-6 rounded border-2 border-white bg-slate-200 overflow-hidden">
                            <Image src={product.imageUrl} alt="gallery" width={24} height={24} className="opacity-50 object-cover h-full w-full" />
                          </div>
                        ))}
                        <div className="h-6 w-6 rounded border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-medium">
                          +2
                        </div>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 group-hover:underline">Edit Media →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
