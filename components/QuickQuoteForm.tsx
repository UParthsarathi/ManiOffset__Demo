'use client';

import { useState } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function QuickQuoteForm({ productId, rawWhatsappMessage }: { productId: number, rawWhatsappMessage: string }) {
  const [pages, setPages] = useState('');
  const [quantity, setQuantity] = useState('');
  // Only paged products (ids 1-10: books + paged academic items) ask for a page count
  const showPages = productId <= 10;

  const buildWhatsappUrl = () => {
    let msg = rawWhatsappMessage;
    if (pages || quantity) {
      msg += `\n\nDetails:`;
      if (pages) msg += `\n- Pages: ${pages}`;
      if (quantity) msg += `\n- Copies: ${quantity}`;
    }
    return `https://wa.me/919444409824?text=${encodeURIComponent(msg)}`;
  };

  const calculatorUrl = `/calculator?product=${productId}${pages ? `&pages=${pages}` : ''}${quantity ? `&quantity=${quantity}` : ''}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5">
        {showPages && (
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Pages</label>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder-gray-400 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., 100"
            />
          </div>
        </div>
        )}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Copies</label>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder-gray-400 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., 500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-lg transition-all font-bold text-[15px]"
        >
          <MessageCircle className="w-5 h-5" />
          Order via WhatsApp
        </a>
        <Link
          href={calculatorUrl}
          className="flex-1 group flex items-center justify-center gap-2 bg-[#005fb3] hover:bg-[#004c8f] text-white px-6 py-3.5 rounded-lg transition-all font-bold text-[15px]"
        >
          <span>Get an Instant Quote</span>
          <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <p
        style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}
        className="text-center mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        A unit of Mani Offset Press · Printing since 1995
      </p>
    </div>
  );
}
