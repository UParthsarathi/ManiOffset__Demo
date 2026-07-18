import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { ADMIN_EMAIL } from '@/lib/admin'

export default async function HighVolumeOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/admin')
  }
  
  const { data: bulkOrders } = await supabase.from('bulk_orders').select('*').order('created_at', { ascending: false });
  
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#20283c] mb-2">High Volume Orders</h1>
        <p className="text-slate-500">Manage and track large-scale commercial printing orders.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
        <h3 className="font-semibold text-lg text-[#20283c] border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
            Bulk Orders
          </span>
          <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{bulkOrders?.length || 0} total</span>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Customer Details</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bulkOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      {order.created_at ? format(new Date(order.created_at), 'MMM d, yyyy') : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {order.created_at ? format(new Date(order.created_at), 'h:mm a') : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-semibold text-slate-900 flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {[order.first_name, order.last_name].filter(Boolean).join(' ') || '—'}
                    </div>
                    {order.company && <div className="text-slate-500 text-xs mt-0.5 ml-6 font-medium bg-slate-100 px-2 py-0.5 rounded inline-block">{order.company}</div>}
                    <div className="text-slate-600 mt-2 flex flex-col gap-1.5 text-xs ml-6">
                      {order.email && (
                        <a href={`mailto:${order.email}`} className="hover:text-blue-600 flex items-center gap-1.5 truncate">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                          {order.email}
                        </a>
                      )}
                      <a href={`tel:${order.phone}`} className="hover:text-blue-600 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {order.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-100 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                      {order.quantity} Units
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top text-xs text-slate-600 max-w-[250px]">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 h-full">
                      <p className="line-clamp-4">{order.details || <span className="text-slate-400 italic">No additional details provided.</span>}</p>
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!bulkOrders || bulkOrders.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-slate-300"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                    <p className="text-base font-medium text-slate-600">No bulk orders found</p>
                    <p className="text-sm mt-1">Large quantity orders will appear here.</p>
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
