"use client";
import Link from "next/link";
import Image from "next/image";
import { Book, Mail, MapPin, PhoneCall, ArrowUp } from "lucide-react";

  import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToCalculator = () => {
    router.push("/calculator");
  };

  return (
    <footer className="w-full bg-[#fdfbf7] text-slate-600 font-sans border-t border-slate-200 relative">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 lg:py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column (Brand info & Address) - 4 columns wide */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Trademark Brand Logo */}
          <div className="flex flex-col">
            <Link href="/" className="block">
              {/* Place your logo in the public folder and update the src below */}
              <div className="relative h-12 w-48 mb-2">
                <Image 
                  src="/logo.png" 
                  alt="FeelThe Print Logo" 
                  fill
                  sizes="192px"
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            <span className="text-[7.5px] italic font-serif text-slate-500 font-light tracking-wider leading-none mt-2">
              Where printing meets perfection.
            </span>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-2">
              SINCE 1995
            </span>
          </div>

          {/* Sourcing/Location */}
          <div className="space-y-3 pt-2 text-xs md:text-sm text-slate-600">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#f29a1b] shrink-0 mt-0.5" />
              <span>FeelThePRINT, Chennai, Tamil Nadu, India.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-[#f29a1b] shrink-0" />
              <span>+91 97911 83612</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#f29a1b] shrink-0" />
              <span>contact@feeltheprint.com</span>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="pt-4">
            <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe
                width="100%"
                height="100%"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.68885008967!2d80.1424155!3d13.0554668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261b79e6e9fe3%3A0x9e2ddbf3b79b8fad!2sFeelThePRINT!5e0!3m2!1sen!2sin!4v1782747887270!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Columns (3 link directories) - 8 columns wide */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Links 1: LET US HELP */}
          <div className="space-y-4">
            <h4 className="text-ink text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              LET US HELP
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  My Account
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Direct Callback FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Links 2: OUR PRODUCTS */}
          <div className="space-y-4">
            <h4 className="text-ink text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              OUR PRODUCTS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Books & Paperbacks
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Stationery & Cards
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Flyers & Leaflets
                </button>
              </li>
              <li>
                <button onClick={handleScrollToCalculator} className="hover:text-[#f29a1b] hover:font-semibold transition-all cursor-pointer">
                  Academic Diaries
                </button>
              </li>
            </ul>
          </div>

          {/* Links 3: OUR COMPANY */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-ink text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              OUR COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  About Us & History
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Careers at Press
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#environmental" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Sustainable Foresting
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Extreme Fine Bottom Bar / Subfoot */}
      <div className="w-full bg-white py-6 px-6 sm:px-12 border-t border-slate-200 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          &copy; {new Date().getFullYear()} feeltheprint. All rights reserved. A Unit of Mani Offset Press.
        </div>
        
        {/* Quick Back to Top button */}
        <button 
          onClick={handleScrollToTop}
          className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 text-slate-600 hover:text-ink transition-all cursor-pointer flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

