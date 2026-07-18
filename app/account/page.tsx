import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=' + encodeURIComponent('/account'))
  }

  // Explicit user_id filter matters: the admin's RLS policy can read every
  // row, so without it the admin's own /account would list all submissions.
  const [{ data: quotes }, { data: expressOrders }, { data: bulkOrders }] = await Promise.all([
    supabase.from('quotes').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('express_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('bulk_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
  ])

  const hasNothing = !quotes?.length && !expressOrders?.length && !bulkOrders?.length

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">My Account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Signed in as <span className="font-medium text-slate-700">{user.email}</span>
        </p>

        {hasNothing && (
          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
            No quotes or orders yet. Requests you submit while signed in will show up here.
          </div>
        )}

        {!!quotes?.length && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">My Quotes</h2>
            <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
              {quotes.map((q) => (
                <div key={q.id} className="p-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm font-medium text-slate-900">
                    {q.product_title || 'Custom quote'}
                  </span>
                  <span className="text-sm text-slate-500">
                    {q.copies ? `${q.copies} copies` : ''}{q.pages ? ` · ${q.pages} pages` : ''}
                    {q.binding ? ` · ${q.binding}` : ''}
                  </span>
                  {q.estimated_price != null && (
                    <span className="text-sm font-semibold text-slate-900">
                      ₹{Number(q.estimated_price).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="ml-auto text-xs text-slate-400">{formatDate(q.created_at)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!expressOrders?.length && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Express Orders</h2>
            <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
              {expressOrders.map((o) => (
                <div key={o.id} className="p-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm font-medium text-slate-900">{o.product_type}</span>
                  <span className="text-sm text-slate-500">Deadline: {o.deadline}</span>
                  <span className="ml-auto text-xs text-slate-400">{formatDate(o.created_at)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!bulkOrders?.length && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Bulk Orders</h2>
            <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
              {bulkOrders.map((o) => (
                <div key={o.id} className="p-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm font-medium text-slate-900">{o.product_type}</span>
                  <span className="text-sm text-slate-500">
                    Qty: {o.quantity}{o.company ? ` · ${o.company}` : ''}
                  </span>
                  <span className="ml-auto text-xs text-slate-400">{formatDate(o.created_at)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
