'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6 group w-fit"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Back
    </button>
  );
}
