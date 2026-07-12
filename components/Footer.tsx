"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, PhoneCall, ArrowUp, Clock } from "lucide-react";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0d1430] text-slate-300 font-sans border-t border-white/5 relative">
      {/* Decorative Blueprint Lines */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px] pointer-events-none" />

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
          <div className="space-y-3 pt-2 text-xs md:text-sm text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#f29a1b] shrink-0 mt-0.5" />
              <span>115, 4A-1, Noombal Main Rd, Mahalakshmi Nagar, Vanagaram, Chennai — 600077</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-[#f29a1b] shrink-0" />
              <span>+91 97911 83612</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#f29a1b] shrink-0" />
              <span>contact@feeltheprint.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#f29a1b] shrink-0" />
              <span>Mon–Sat, 9:30 AM – 7:00 PM</span>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="pt-4">
            <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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
          
          {/* Links 1: POPULAR PRODUCTS */}
          <div className="space-y-4">
            <h4 className="text-white text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              POPULAR PRODUCTS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/product/1" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Softcover Books
                </Link>
              </li>
              <li>
                <Link href="/product/2" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Hardcover Books
                </Link>
              </li>
              <li>
                <Link href="/product/8" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Academic Diaries
                </Link>
              </li>
              <li>
                <Link href="/product/23" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Certificates & Award Cards
                </Link>
              </li>
              <li>
                <Link href="/product/3" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Magazines & Journals
                </Link>
              </li>
              <li>
                <Link href="/product/16" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Wall Calendars
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: CATEGORIES */}
          <div className="space-y-4">
            <h4 className="text-white text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/products?category=Books%20and%20Publications" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Books & Publications
                </Link>
              </li>
              <li>
                <Link href="/products?category=Academic%20and%20Educational" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Academic & Educational
                </Link>
              </li>
              <li>
                <Link href="/products?category=Marketing%20and%20Promotional%20Materials" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Marketing & Promotional
                </Link>
              </li>
              <li>
                <Link href="/products?category=Business%20and%20Corporate" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Business & Corporate
                </Link>
              </li>
              <li>
                <Link href="/products?category=Banking%20and%20Financial" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Banking & Financial
                </Link>
              </li>
              <li>
                <Link href="/products?category=Product%20Support%20Materials" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Product Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: OUR COMPANY */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-white text-xs sm:text-sm font-black tracking-widest uppercase font-mono">
              OUR COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  About Us & History
                </Link>
              </li>
              <li>
                <Link href="/press/process" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/about/careers" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Careers at Press
                </Link>
              </li>
              <li>
                <Link href="/about/sustainability" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact/corporate" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-[#f29a1b] hover:font-semibold transition-colors">
                  Price Calculator
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Extreme Fine Bottom Bar / Subfoot */}
      <div className="w-full bg-[#0a0f26] py-6 px-6 sm:px-12 border-t border-white/5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          &copy; {new Date().getFullYear()} feeltheprint. All rights reserved. A Unit of Mani Offset Press.
        </div>
        
        {/* Quick Back to Top button */}
        <button 
          onClick={handleScrollToTop}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-slate-300 hover:text-white transition-all shadow cursor-pointer flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

