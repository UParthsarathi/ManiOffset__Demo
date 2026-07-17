import { Metadata } from 'next';
import { Calculator, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Quote Calculator — Coming Soon',
  description: 'Instant pricing for this product is on its way. Order via WhatsApp meanwhile.',
};

export default function CalculatorComingSoonPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full pt-8 pb-20 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <BackButton />
          <div className="text-center border border-gray-200 rounded-2xl px-6 py-14 sm:px-10">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Instant quotes for this product are coming soon</h1>
            <p className="text-slate-500 mb-8">
              Meanwhile, message us on WhatsApp with your requirement — we reply fast with a price.
            </p>
            <a
              href={`https://wa.me/919444409824?text=${encodeURIComponent("Hi, I'd like a price quote for my printing requirement.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[15px] rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
