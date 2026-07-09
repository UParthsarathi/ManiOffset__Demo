import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'

const ADMIN_EMAIL = 'parthu3915@gmail.com'

export default async function QuoteOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/admin')
  }
  
  const { data: quotes } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
  
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#20283c] mb-2">Customer Quote Orders</h1>
        <p className="text-slate-500">View and manage all custom quote requests submitted by customers.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
        <h3 className="font-semibold text-lg text-[#20283c] border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f29a1b]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            All Quote Requests
          </span>
          <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{quotes?.length || 0} total</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Customer Details</th>
                <th className="px-6 py-4 font-semibold">Product Requested</th>
                <th className="px-6 py-4 font-semibold">Specs</th>
                <th className="px-6 py-4 font-semibold text-right">Est. Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes?.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      {quote.created_at ? format(new Date(quote.created_at), 'MMM d, yyyy') : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {quote.created_at ? format(new Date(quote.created_at), 'h:mm a') : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-semibold text-slate-900 flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {quote.name}
                    </div>
                    {quote.organization && <div className="text-slate-500 text-xs mt-0.5 ml-6 font-medium bg-slate-100 px-2 py-0.5 rounded inline-block">{quote.organization}</div>}
                    <div className="text-slate-600 mt-2 flex flex-col gap-1.5 text-xs ml-6">
                      <a href={`mailto:${quote.email}`} className="hover:text-blue-600 flex items-center gap-1.5 truncate">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        {quote.email}
                      </a>
                      <a href={`tel:${quote.phone}`} className="hover:text-blue-600 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {quote.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-slate-800">{quote.product_title || 'Custom Product'}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#005fb3]/10 text-[#005fb3] text-xs font-semibold border border-[#005fb3]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                      {quote.copies} Copies
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top text-xs text-slate-600">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider">Pages</span> <span className="font-medium text-slate-700">{quote.pages}</span></div>
                      <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider">Format</span> <span className="font-medium text-slate-700">{quote.size_format}</span></div>
                      <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider">Binding</span> <span className="font-medium text-slate-700">{quote.binding}</span></div>
                      <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider">Paper</span> <span className="font-medium text-slate-700">{quote.inner_paper}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top text-right font-mono font-medium text-slate-900 text-base">
                    {quote.estimated_price ? `₹${Number(quote.estimated_price).toLocaleString()}` : 'N/A'}
                  </td>
                </tr>
              ))}
              
              {(!quotes || quotes.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-slate-300"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <p className="text-base font-medium text-slate-600">No quote requests found</p>
                    <p className="text-sm mt-1">When customers request quotes, they will appear here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
