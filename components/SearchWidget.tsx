"use client";
import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

interface SearchWidgetProps {
  isMobile?: boolean;
  onResultClick?: () => void;
}

export function SearchWidget({ isMobile = false, onResultClick }: SearchWidgetProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredProducts = query.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to top 5 results

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "flex-1 h-full"}`} ref={wrapperRef}>
      <div 
        className={`flex items-center ${
          isMobile 
            ? "bg-slate-50 border border-slate-200 rounded-lg p-2.5" 
            : "px-4 h-full"
        }`}
      >
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search for products..." 
          className={`w-full outline-none bg-transparent ${
            isMobile ? "text-xs text-ink pr-2" : "text-sm text-ink placeholder-slate-400 pr-8"
          }`}
        />
        {query ? (
          <button 
            type="button"
            onClick={handleClear}
            className={`cursor-pointer ${isMobile ? "text-slate-400" : "absolute right-4 text-slate-400 hover:text-ink"}`}
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <Search className={`w-4 h-4 ${isMobile ? "text-slate-400" : "absolute right-4 text-slate-400"}`} />
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() !== "" && (
        <div 
          className={`absolute z-50 bg-white border border-slate-200 shadow-xl overflow-hidden animate-fade-in ${
            isMobile 
              ? "left-0 right-0 top-full mt-2 rounded-lg" 
              : "left-0 right-0 top-[calc(100%+1px)] rounded-b-lg"
          }`}
        >
          {filteredProducts.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 border-b border-slate-100 mb-1">
                Products
              </div>
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    if (onResultClick) onResultClick();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 bg-white border border-slate-200">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="40px"
                      className="object-cover opacity-90 group-hover:opacity-100 mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-ink truncate group-hover:text-amber-600 transition-colors">{product.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{product.category}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-400">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
