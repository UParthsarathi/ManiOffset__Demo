import React from 'react';
import Link from 'next/link';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductDescriptionRenderer } from '@/components/descriptions';
import { QuickQuoteForm } from '@/components/QuickQuoteForm';

interface ProductViewProps {
  product: any;
  whatsappMessage: string;
}

export function ProductView({ product, whatsappMessage }: ProductViewProps) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-10">
        
        {/* Product image */}
        <div className="w-full lg:w-[55%] xl:w-[60%] shrink-0">
           <ProductGallery mainImageUrl={product.imageUrl} title={product.title} />
        </div>

        {/* Details & action */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col">
          <h1
            style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#20283c' }}
            className="text-[30px] md:text-[38px] font-semibold leading-[1.12] tracking-[-0.01em] [text-wrap:balance] mb-6"
          >
            {product.title}
          </h1>

          <ul className="list-disc pl-5 space-y-2.5 mb-8 text-[15px] text-gray-700 leading-relaxed">
            <li><strong>From 200 to 1 Crore Copies</strong> — High-quality printing in every size.</li>
            <li><strong>200 Copies Minimum</strong> — Bulk offset printing that saves you money.</li>
            <li><strong>3–10 Day Delivery</strong> — Urgent orders? We’ll make it happen.</li>
            <li><strong>Printing Sizes & Models</strong> — Full options listed below.</li>
            <li><strong>Learn Our Printing Process</strong> — <Link href="/press" className="underline hover:text-gray-900">Visit the Press section</Link>.</li>
          </ul>

          <QuickQuoteForm productId={product.id} rawWhatsappMessage={`Hi, I'm interested in printing: ${product.title}. I'd like to share my design and get support to place an order.`} />
        </div>
      </div>

      <ProductDescriptionRenderer product={product} whatsappMessage={whatsappMessage} />
    </div>
  );
}
