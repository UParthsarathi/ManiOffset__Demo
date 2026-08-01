import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ADMIN_EMAIL } from '@/lib/admin'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }
  
  const isAdmin = user.email === ADMIN_EMAIL;
  
  let quotesCount = 0;
  let bulkOrdersCount = 0;
  let expressOrdersCount = 0;

  if (isAdmin) {
    const { count: qc } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
    quotesCount = qc || 0;
    
    try {
      const { count: bc } = await supabase.from('bulk_orders').select('*', { count: 'exact', head: true });
      bulkOrdersCount = bc || 0;
    } catch (e) {}

    try {
      const { count: ec } = await supabase.from('express_orders').select('*', { count: 'exact', head: true });
      expressOrdersCount = ec || 0;
    } catch (e) {}
  }
  
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-[#20283c] mb-2">Dashboard Overview</h1>
      <p className="text-slate-500 mb-8">Welcome back, {user.email}.</p>
      
      {isAdmin ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/orders/quotes" className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-[#f29a1b] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#f29a1b]/10 text-[#f29a1b] rounded-lg group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Quote Requests</p>
                  <p className="text-3xl font-bold text-slate-900">{quotesCount}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#f29a1b] text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <span>View all quotes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </Link>
            
            <Link href="/admin/orders/critical" className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-red-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-red-100 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Express Orders</p>
                  <p className="text-3xl font-bold text-slate-900">{expressOrdersCount}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-red-600 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <span>View express orders</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </Link>

            <Link href="/admin/orders/high-volume" className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Bulk Orders</p>
                  <p className="text-3xl font-bold text-slate-900">{bulkOrdersCount}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <span>View bulk orders</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </Link>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center mt-8">
            <h3 className="text-lg font-bold text-slate-700 mb-2">Welcome to the Command Center</h3>
            <p className="text-slate-500 max-w-lg mb-6">Select a category above or from the sidebar to view detailed orders. This modular layout keeps your data separated and easy to manage.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 text-center max-w-2xl">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 8 3 3-3 3"/><path d="M22 11h-7"/></svg>
          </div>
          <h2 className="text-xl font-bold text-[#20283c] mb-2">Welcome to Mani Offset</h2>
          <p className="text-slate-600 mb-6">
            We&apos;re preparing your dedicated client portal. Soon you will be able to track your orders, 
            request new quotes directly, and review past invoices right from this dashboard.
          </p>
          <div className="inline-flex px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-sm font-medium">
            Client Features Currently Under Construction
          </div>
        </div>
      )}
    </div>
  )
}
