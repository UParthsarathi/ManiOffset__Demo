"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImageUrl: string;
  title: string;
}

export function ProductGallery({ mainImageUrl, title }: ProductGalleryProps) {
  // Main image + four detail crops of the same photo (top/bottom/left/right),
  // so every thumbnail shows the actual product image rather than an unrelated
  // placeholder. Swap in the owner's real photos when available.
  const images = [
    mainImageUrl,
    `${mainImageUrl}&h=800&crop=top`,
    `${mainImageUrl}&h=800&crop=bottom`,
    `${mainImageUrl}&h=800&crop=left`,
    `${mainImageUrl}&h=800&crop=right`,
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image — LCP element, so load it eagerly with priority */}
      <div className="bg-[#f4f4f4] rounded-2xl aspect-[4/3] relative overflow-hidden border border-gray-100">
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thumbnails — only shown when there is more than one real image */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === idx ? 'border-amber-500 shadow-md ring-2 ring-amber-100 ring-offset-1' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="absolute inset-0 bg-[#f4f4f4]" />
              <Image
                src={img}
                alt={`${title} — view ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
