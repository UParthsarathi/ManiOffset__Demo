"use client";
import { useRouter } from "next/navigation";
import { ChevronRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { RealisticBook } from "./RealisticBook";
import { CALCULATOR_ENABLED } from '@/lib/features';

interface HeroProps {
  onLaunchBooklet: () => void;
}

export function Hero({ onLaunchBooklet }: HeroProps) {
  const router = useRouter();

  return (
    <section className="relative w-full bg-[#1e2363] overflow-hidden py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 xl:px-24">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: headline + CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-1 sm:gap-3"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Highest Quality
            </span>
            <span className="text-5xl sm:text-6xl md:text-7xl font-black text-[#f29a1b] tracking-tight leading-[1]">
              Custom Printing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Offset printing for books, textbooks and corporate stationery — in volume, on time.
          </motion.p>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2">
            <a
              href="#home-products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#f29a1b] hover:bg-[#de8710] text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors text-center flex items-center justify-center gap-2 group cursor-pointer"
              id="hero-discover-options-btn"
            >
              <span>Browse Print Catalog</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => router.push(CALCULATOR_ENABLED ? '/calculator' : '/contact/express')}
              className="text-white/90 hover:text-[#f29a1b] text-sm font-semibold underline underline-offset-4 decoration-white/30 hover:decoration-[#f29a1b] transition-colors cursor-pointer text-center"
            >
              Get a custom quote
            </button>
          </div>

          {/* Stats */}
          <div className="pt-8 mt-4 border-t border-white/10 flex items-center gap-6 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">28+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Years Exp.</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">10k+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Projects</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">ZERO</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Missed Deadlines</span>
            </div>
          </div>
        </div>

        {/* Right: 3D catalogue book (click opens the flipbook showroom) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative py-12 md:py-6 h-[400px] md:h-[500px] xl:h-[600px]">
          <div className="relative w-full max-w-[500px] flex-1 flex items-center justify-center">
            <div className="absolute scale-100 sm:scale-110 md:scale-125 lg:scale-[1.15] xl:scale-[1.3] origin-center">
              <RealisticBook
                title="FeelThePRINT"
                onClick={onLaunchBooklet}
                thickness={36}
              />
            </div>
          </div>
          <button
            onClick={onLaunchBooklet}
            className="relative z-20 mt-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#f29a1b] transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Click the book to flip through our catalogue</span>
          </button>
        </div>
      </div>
    </section>
  );
}
