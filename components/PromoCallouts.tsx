"use client";
import { Mail, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import BulkOrderButton from './BulkOrderButton';
import ExpressOrderButton from './ExpressOrderButton';

export function PromoCallouts() {
  const router = useRouter();

  return (
    <section className="w-full bg-transparent py-4 sm:py-6 px-4 sm:px-6 md:px-12 xl:px-24 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left Card: Need high volume printing? (Navy Blue / Violet) */}
        <div className="bg-ink rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
          
          
          
          <div className="space-y-2 sm:space-y-3">
            {/* Left Header Tag */}
            <span className="text-amber-300 text-[9px] sm:text-[10px] font-black tracking-widest uppercase font-mono block">
              BULK & INSTITUTIONAL ORDERS
            </span>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight leading-none">
              Need high volume printing?
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans max-w-md pt-1 font-light">
              From academic textbooks to banking forms, we offer special pricing and dedicated account management for large scale orders.
            </p>
          </div>

          <div className="pt-6 sm:pt-8">
            <BulkOrderButton />
          </div>
        </div>

        {/* Right Card: Critical deadlines? (Ivory Cream Yellow) */}
        <div className="bg-[#fffbeb] rounded-2xl p-6 sm:p-8 text-[#2e2300] flex flex-col justify-between relative overflow-hidden group border border-amber-200/70 transition-all duration-300">
          
          

          <div className="space-y-2 sm:space-y-3">
            {/* Right Header Tag */}
            <span className="text-[#b45309] text-[9px] sm:text-[10px] font-black tracking-widest uppercase font-mono block">
              FAST TURNAROUND
            </span>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold tracking-tight leading-none text-[#5c3e03]">
              Critical deadlines?
            </h3>

            {/* Description */}
            <p className="text-[#855d14] text-xs sm:text-sm leading-relaxed font-sans max-w-md pt-1 font-light">
              We understand the importance of timing for marketing materials and institutional records. Express production available.
            </p>
          </div>

          <div className="pt-6 sm:pt-8">
            <ExpressOrderButton />
          </div>
        </div>

      </div>
    </section>
  );
}
