'use client';

import { useState } from 'react';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export function QuickQuoteForm({ productId, rawWhatsappMessage }: { productId: number, rawWhatsappMessage: string }) {
  const [pages, setPages] = useState('');
  const [quantity, setQuantity] = useState('');

  const buildWhatsappUrl = () => {
    let msg = rawWhatsappMessage;
    if (pages || quantity) {
      msg += `\n\nDetails:`;
      if (pages) msg += `\n- Pages: ${pages}`;
      if (quantity) msg += `\n- Quantity: ${quantity}`;
    }
    return `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
  };

  const calculatorUrl = `/calculator?product=${productId}${pages ? `&pages=${pages}` : ''}${quantity ? `&quantity=${quantity}` : ''}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Pages</label>
          <div className="relative">
            <input 
              type="number" 
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder-gray-400 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., 100"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
          <div className="relative">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder-gray-400 bg-gray-50/50 hover:bg-white"
              placeholder="e.g., 500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link 
          href={calculatorUrl}
          className="flex-1 group flex items-center justify-center gap-2 bg-[#6cd4f4] hover:bg-[#5bc8e8] text-slate-900 px-6 py-4 rounded-xl transition-all font-bold text-[15px] shadow-sm"
        >
          <span>Calculate Price</span>
          <ArrowRight className="w-5 h-5 text-slate-700 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <a 
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl transition-all font-bold text-[15px] shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Order via WhatsApp
        </a>
      </div>
      
      <div className="text-center mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
          <Check className="w-2.5 h-2.5 text-gray-400" />
        </div>
        <span>100% satisfaction guaranteed</span>
      </div>
    </div>
  );
}
