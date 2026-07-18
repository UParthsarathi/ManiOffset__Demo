"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  ChevronDown, 
  Phone, 
  User, 
  ShoppingCart, 
  Book,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

import { useRouter } from "next/navigation";
import { SearchWidget } from "./SearchWidget";
import { products } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_EMAIL } from "@/lib/admin";

export function Navbar() {
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setShowAccount(false);
    router.refresh(); // re-render server components with the cleared session
  };

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categoriesData = [
    {
      name: "Books & Publications",
      subcategories: [
        "Softcover Books (Paperback)",
        "Hardcover Books (Hardbound)",
        "Magazines and Journals",
        "Comics and Graphic Novels",
        "Religious and Spiritual Books"
      ]
    },
    {
      name: "Academic & Educational",
      subcategories: [
        "Textbooks, Guides, and Educational Books",
        "School and College Notebooks",
        "Academic Diaries and Planners",
        "Record Books and Lab Manuals",
        "Application Forms, Answer Sheets",
        "Report Cards, Certificates",
        "Educational and Kids Charts"
      ]
    },
    {
      name: "Marketing & Promotional",
      subcategories: [
        "Flyers, Leaflets, and Pamphlets",
        "Brochures and Booklets",
        "Product Catalogues",
        "Monthly Wall Calendars",
        "Academic and Corporate Invitation",
        "Postcards"
      ]
    },
    {
      name: "Business & Corporate",
      subcategories: [
        "Visiting Cards",
        "Letterheads and Envelopes",
        "Business Diaries and Planners",
        "Company Folders",
        "Certificates and Award Cards"
      ]
    },
    {
      name: "Banking & Financial",
      subcategories: [
        "Passbooks",
        "Challans and Deposit Slips",
        "Banking Forms"
      ]
    },
    {
      name: "Product Support Materials",
      subcategories: [
        "Instruction Manuals and Guides",
        "Product Inserts and Leaflets",
        "Warranty, Registration & Service Cards"
      ]
    }
  ];



    const handleScrollToConfigurator = () => {
      router.push("/calculator");
    };

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 bg-[#0d1430]">
      {/* 1. Thin Notification/Header Top Bar */}
      <div className="w-full bg-[#080d22] text-white py-2 px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium tracking-wide border-b border-white/5 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer">
          <Mail className="w-3.5 h-3.5 text-blue-400" />
          <span>contact@feeltheprint.com</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-slate-300 font-sans">
          <Link href="/about" className="text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold flex items-center gap-1">ABOUT US</Link>
          <Link href="/press" className="hover:text-amber-500 transition-colors uppercase tracking-widest text-[10px]">PRESS</Link>
          <span className="text-slate-600">|</span>
          <Link href="#track" className="hover:text-amber-500 transition-colors uppercase tracking-widest text-[10px]">TRACK ORDER</Link>
          <span className="text-slate-600">|</span>
          <Link href="#help" className="hover:text-amber-500 transition-colors uppercase tracking-widest text-[10px]">HELP</Link>
        </div>
      </div>

      {/* 2. Main High-Fidelity Navigation Bar */}
      <header className="w-full bg-[#0d1430] text-white border-b border-white/5 py-3 px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-1 min-w-fit">
          <Link href="/" className="flex flex-col group">
            {/* Place your logo in the public folder and update the src below */}
            <div className="relative h-10 w-40 sm:h-12 sm:w-48 my-1">
              <Image 
                src="/logo.png" 
                alt="FeelThe Print Logo" 
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left" 
                priority
              />
            </div>

            {/* Slogan */}
            <span className="text-[7.5px] sm:text-[8px] italic font-serif text-slate-400 font-light tracking-wider leading-none">
              Where printing meets perfection.
            </span>
          </Link>
        </div>

        {/* Center Search Widget & Dropdown - Desktop Only */}
        <div className="hidden lg:flex items-center flex-1 max-w-2xl border border-white/10 rounded-lg shadow-sm bg-[#090f24] h-[46px]">
          {/* BROWSE CATEGORIES DROPDOWN TRIGGER */}
          <div className="relative h-full shrink-0" onMouseLeave={() => { setShowCategories(false); setActiveCategory(null); }}>
            <button 
              onMouseEnter={() => setShowCategories(true)}
              onClick={() => {
                setShowCategories(false);
                router.push('/products');
              }}
              className="px-4 h-full bg-[#f29a1b] hover:bg-[#de8710] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer w-64 justify-between rounded-l-lg"
            >
              <div className="flex items-center gap-2">
                <Menu className="w-3.5 h-3.5" />
                <span>Browse Categories</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategories ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {showCategories && (
              <div className="absolute left-0 top-[46px] flex shadow-2xl z-50 animate-fade-in origin-top-left" style={{ minWidth: activeCategory !== null ? '550px' : '260px' }}>
                {/* Main Categories Panel */}
                <div className="w-[260px] bg-[#111111] text-slate-300 font-sans text-[13px] border border-white/5 py-1">
                  {categoriesData.map((cat, idx) => (
                    <Link
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      key={idx}
                      onMouseEnter={() => setActiveCategory(idx)}
                      onClick={() => {
                        setShowCategories(false);
                        setActiveCategory(null);
                      }}
                      className={`w-full px-5 py-3 cursor-pointer flex items-center justify-between transition-colors border-b border-white/5 last:border-0 ${
                        activeCategory === idx ? 'bg-[#1a1a1a] text-white font-semibold' : 'hover:bg-[#1a1a1a] hover:text-white font-medium'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-50" />
                    </Link>
                  ))}
                </div>

                {/* Subcategories Flyout Panel */}
                {activeCategory !== null && (
                  <div className="flex-1 bg-[#1a1a1a] text-slate-300 font-sans text-[13px] border border-l-0 border-white/5 py-1 min-w-[290px]">
                    {categoriesData[activeCategory].subcategories.map((sub, sIdx) => {
                      const matchedProduct = products.find(p => p.title === sub);
                      return (
                        <Link
                          key={sIdx}
                          href={matchedProduct ? `/product/${matchedProduct.id}` : "#"}
                          onClick={() => {
                            setShowCategories(false);
                            setActiveCategory(null);
                          }}
                          className="block w-full px-5 py-3 cursor-pointer transition-colors hover:bg-white/5 hover:text-amber-500 hover:pl-6 duration-200"
                        >
                          {sub}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SEARCH WIDGET */}
          <SearchWidget />

          {/* GET QUOTE NAV TRIGGER */}
          <button 
            onClick={handleScrollToConfigurator}
            className="h-full px-5 bg-[#f29a1b] hover:bg-[#de8710] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-r-lg"
          >
            Get Quote
          </button>
        </div>

        {/* Right Info Widgets: Phone Contact, Profile & Shopping Cart */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Phone call section */}
          <div className="hidden md:flex items-center gap-3">
            <div className="p-2 border border-white/10 bg-white/5 rounded-full text-amber-400">
              <Phone className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col font-sans">
              <span className="text-sm font-black text-white leading-tight">+91 94444 09824</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold leading-none">For Orders Call</span>
            </div>
          </div>

          {/* User/Account Profile icon — three-way: signed out / admin / customer */}
          <div className="relative" onMouseLeave={() => setShowAccount(false)}>
            <button
              onClick={() => {
                if (!userEmail) { router.push('/login'); return; }
                if (userEmail === ADMIN_EMAIL) { router.push('/admin'); return; }
                setShowAccount((v) => !v);
              }}
              className="p-1 text-slate-300 hover:text-white transition-colors relative cursor-pointer"
              title={!userEmail ? 'Sign In' : userEmail === ADMIN_EMAIL ? 'Admin Dashboard' : 'Account'}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Customer account dropdown (styled like the categories dropdown) */}
            {userEmail && userEmail !== ADMIN_EMAIL && showAccount && (
              <div className="absolute right-0 top-[38px] w-60 bg-[#111111] text-slate-300 font-sans text-[13px] border border-white/5 py-1 shadow-2xl z-50 animate-fade-in origin-top-right rounded-lg">
                <div className="px-5 py-3 border-b border-white/5 text-slate-400 text-xs truncate">{userEmail}</div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-5 py-3 cursor-pointer transition-colors hover:bg-[#1a1a1a] hover:text-white font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button 
            className="lg:hidden p-1 text-slate-300 hover:text-white cursor-pointer"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 3. Mobile Navigation drawer and quick links */}
      {showMobileMenu && (
        <div className="lg:hidden w-full border-b border-white/10 bg-[#090f24] p-4 space-y-4 shadow-inner flex flex-col font-sans animate-fade-in z-45">
          {/* Quick Categories list */}
          <div className="space-y-1">
            <div className="text-[10.5px] uppercase tracking-widest font-bold text-slate-400 mb-2 px-1">Quick Browse</div>
            <div className="grid grid-cols-2 gap-2">
              {categoriesData.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push(`/products?category=${encodeURIComponent(cat.name)}`);
                  }}
                  className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-left text-xs text-slate-200 font-semibold hover:bg-white/10 transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar for mobile */}
          <SearchWidget isMobile onResultClick={() => setShowMobileMenu(false)} />

          {/* Hot call CTAs */}
          <div className="flex gap-2.5">
            <button 
              onClick={() => { setShowMobileMenu(false); handleScrollToConfigurator(); }}
              className="flex-1 py-2.5 bg-[#f29a1b] hover:bg-[#de8710] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center shadow-md cursor-pointer transition-colors"
            >
              Get Custom Quote
            </button>
            <a
              href="tel:+919444409824"
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1 cursor-pointer hover:bg-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Press</span>
            </a>
          </div>

          {/* Account (three-way: signed out / admin / customer) */}
          <div className="pt-1 border-t border-white/10 space-y-2">
            {!userEmail ? (
              <button
                onClick={() => { setShowMobileMenu(false); router.push('/login'); }}
                className="w-full px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 text-left text-xs text-slate-200 font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-amber-400" /> Sign In
              </button>
            ) : userEmail === ADMIN_EMAIL ? (
              <button
                onClick={() => { setShowMobileMenu(false); router.push('/admin'); }}
                className="w-full px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 text-left text-xs text-slate-200 font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-amber-400" /> Admin Dashboard
              </button>
            ) : (
              <>
                <div className="px-1 text-[11px] text-slate-400 truncate">{userEmail}</div>
                <button
                  onClick={async () => { setShowMobileMenu(false); await handleSignOut(); }}
                  className="w-full px-3 py-2.5 bg-white/5 rounded-lg border border-white/10 text-left text-xs text-slate-200 font-semibold hover:bg-white/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

