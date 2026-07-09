'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Layers, AlertCircle, ShoppingCart } from 'lucide-react'

export function AdminSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 p-4 space-y-8">
      <div className="space-y-1">
        <Link 
          href="/admin" 
          className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
            pathname === '/admin' ? 'bg-[#f29a1b]/10 text-[#f29a1b] font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LayoutDashboard size={18} />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>
      </div>

      <div className="space-y-3">
        <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mt-8">
          <ShoppingCart size={14} />
          Customer Orders
        </h3>
        <div className="space-y-1">
          <Link 
            href="/admin/orders/quotes" 
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              pathname === '/admin/orders/quotes' ? 'bg-[#f29a1b]/10 text-[#f29a1b] font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText size={18} />
            <span className="font-medium text-sm">Quote Orders</span>
          </Link>
          <Link 
            href="/admin/orders/high-volume" 
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              pathname === '/admin/orders/high-volume' ? 'bg-blue-500/10 text-blue-400 font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Layers size={18} />
            <span className="font-medium text-sm">Bulk Orders</span>
          </Link>
          <Link 
            href="/admin/orders/critical" 
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              pathname === '/admin/orders/critical' ? 'bg-red-500/10 text-red-400 font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <AlertCircle size={18} />
            <span className="font-medium text-sm">Express Delivery</span>
          </Link>
        </div>

        {/* Product media management disabled for now
        <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          Content Management
        </h3>
        <div className="space-y-1">
          <Link 
            href="/admin/media" 
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              pathname.startsWith('/admin/media') ? 'bg-indigo-500/10 text-indigo-400 font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            <span className="font-medium text-sm">Product Media</span>
          </Link>
        </div>
        */}
      </div>
    </nav>
  )
}
