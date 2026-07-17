import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';
import { QuoteCalculator } from '@/components/QuoteCalculator';
import { BackButton } from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Book Printing Calculator',
  description: 'Get an instant estimate for offset book printing — size, paper, cover and binding priced live from our press rate card.',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      
      {/* Navbar is sticky (in flow), not fixed — no clearance padding needed */}
      <main className="flex-1 w-full pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <BackButton />
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>}>
          <QuoteCalculator />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
