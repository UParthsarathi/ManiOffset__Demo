"use client";

import React, { useState } from 'react';
import { Calculator, Package, Check, Info, X, IndianRupee } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import Image from 'next/image';
import {
  quote, snapToSlab, COPIES_SLABS, PAGES_OPTIONS, SIZES, INNER_COLORS, INNER_PAPERS, WRAPPER_TYPES, WRAPPER_BOARDS, BINDINGS,
  Size, InnerColor, InnerPaper, WrapperType, WrapperBoard, Binding, QuoteInput, QuoteResult,
} from '@/lib/offset-pricing';

const snapToPages = (n: number) => Math.min(1496, Math.max(16, Math.round(n / 8) * 8));

const inr = (n: number, decimals = 0) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const PRICE_BREAK_QTYS = [500, 1000, 2000, 3000, 5000, 10000];

// Some spec combinations aren't on the rate card (e.g. Case Binding above 2000 pages)
const safeQuote = (spec: QuoteInput): QuoteResult | null => {
  try { return quote(spec); } catch { return null; }
};

// Trimmed book sizes in cm (W × H). A5/A4 are ISO-exact; the trade sizes are derived
// from the owner's parent-sheet dimensions + published Indian trade sizes — owner to
// confirm, especially Royal (his sheet costs it on Crown paper like a quarto).
const SIZE_CM: Record<Size, [number, number]> = {
  '1/8 Demy': [14, 21.5],
  '1/8 Crown': [12.5, 18.5],
  'A5': [14.8, 21],
  '1/4 Demy': [22, 28],
  '1/4 Crown': [18.5, 24.5],
  'Royal': [19, 24.5],
  'A4': [21, 29.7],
};

// Buildable page ranges per binding — stated on the owner's rate card (his sheet
// notes them but doesn't enforce; we enforce here so customers can't order the unbuildable)
const PAGE_LIMITS: Record<Binding, [number, number]> = {
  'Perfect Binding': [40, 1496],
  'Saddle Stitch': [8, 96],
  'Side Pin': [8, 96],
  'Spiral': [16, 196],
  'Wire O': [16, 196],
  'Case Binding': [64, 1496],
};

const BINDING_DESC: Record<Binding, string> = {
  'Perfect Binding': 'Glued square spine — the standard paperback look',
  'Saddle Stitch': 'Folded sheets stapled through the spine fold',
  'Side Pin': 'Stapled through the front, near the spine edge',
  'Spiral': 'Plastic coil through punched holes — lies flat open',
  'Wire O': 'Twin-loop wire binding — lies flat, premium feel',
  'Case Binding': 'Rigid hardcover boards — the premium option',
};

const cardCls = (active: boolean, disabled = false) =>
  `p-4 rounded-xl border transition-colors ${
    disabled
      ? 'opacity-40 cursor-not-allowed bg-slate-50 border-gray-200'
      : active
        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 cursor-pointer'
        : 'border-gray-200 bg-white hover:border-gray-400 cursor-pointer'
  }`;

// Placeholder line art until the owner supplies real binding photos
function BindingGlyph({ b }: { b: Binding }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 56 44" className="w-14 h-11">
      {b === 'Perfect Binding' && (<>
        <rect x="12" y="6" width="34" height="32" rx="2" {...s} />
        <line x1="17" y1="6" x2="17" y2="38" {...s} />
      </>)}
      {b === 'Saddle Stitch' && (<>
        <path d="M8 24 L28 12 L48 24" {...s} />
        <path d="M8 30 L28 18 L48 30" {...s} />
        <line x1="24" y1="13.5" x2="26" y2="12.5" {...s} />
        <line x1="30" y1="12.5" x2="32" y2="13.5" {...s} />
      </>)}
      {b === 'Side Pin' && (<>
        <rect x="12" y="6" width="34" height="32" rx="2" {...s} />
        <circle cx="18" cy="15" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="18" cy="29" r="1.4" fill="currentColor" stroke="none" />
      </>)}
      {b === 'Spiral' && (<>
        <rect x="18" y="6" width="28" height="32" rx="2" {...s} />
        {[10, 17, 24, 31].map((y) => <circle key={y} cx="14" cy={y + 3} r="3.2" {...s} />)}
      </>)}
      {b === 'Wire O' && (<>
        <rect x="18" y="6" width="28" height="32" rx="2" {...s} />
        {[9, 16, 23, 30].map((y) => (
          <g key={y}>
            <circle cx="12.5" cy={y + 3} r="2.4" {...s} />
            <circle cx="16" cy={y + 3} r="2.4" {...s} />
          </g>
        ))}
      </>)}
      {b === 'Case Binding' && (<>
        <rect x="10" y="4" width="38" height="36" rx="1.5" {...s} />
        <rect x="16" y="8" width="28" height="28" {...s} strokeWidth={1.4} />
        <line x1="14" y1="4" x2="14" y2="40" {...s} />
      </>)}
    </svg>
  );
}

const PAPER_DESC: Record<string, string> = {
  'NS Maplitho': 'economy, everyday',
  'White Maplitho': 'bright white, smooth',
  'Art Paper': 'coated, glossy',
};

function BookPreview({ size, pages }: { size: Size; pages: number }) {
  const [w, h] = SIZE_CM[size];
  const thickCm = Math.max(0.4, pages * 0.006); // ≈0.06 mm bulk per page
  const S = 4; // px per cm
  const W = w * S, H = h * S, T = Math.min(thickCm * S, 44);
  return (
    <div className="flex items-center gap-6">
      <div className="h-36 w-40 flex items-center justify-center shrink-0" style={{ perspective: '900px' }}>
        <div
          className="relative transition-all duration-300"
          style={{ width: W, height: H, transformStyle: 'preserve-3d', transform: 'rotateY(-30deg) rotateX(4deg)' }}
        >
          {/* page block (back) */}
          <div className="absolute inset-0 bg-slate-100 rounded-r-sm" />
          {/* spine */}
          <div
            className="absolute top-0 left-0 h-full bg-slate-800 transition-all duration-300"
            style={{ width: Math.max(T, 2), transformOrigin: 'left center', transform: 'rotateY(-90deg)' }}
          />
          {/* front cover */}
          <div
            className="absolute inset-0 rounded-r-sm bg-gradient-to-br from-slate-700 to-slate-900 p-2 flex flex-col justify-end gap-1 transition-all duration-300"
            style={{ transform: `translateZ(${Math.max(T, 2)}px)` }}
          >
            <div className="h-1.5 w-3/4 bg-white/25 rounded-full" />
            <div className="h-1 w-1/2 bg-white/15 rounded-full" />
          </div>
        </div>
      </div>
      <div className="text-sm">
        <p className="font-bold text-slate-900">{size}</p>
        <p className="text-slate-600 font-mono">{w} × {h} cm</p>
        <p className="text-xs text-slate-400 mt-1">≈ {thickCm.toFixed(1)} cm spine at {pages} pages</p>
      </div>
    </div>
  );
}

function Section({ step, title, hint, children }: { step: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold">{step}</span>
          <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">{title}</h3>
        </div>
        {hint && <p className="text-sm text-slate-500 mt-2">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

export function QuoteCalculator() {
  const searchParams = useSearchParams();
  // Books only: the rate card covers paged, bound products (ids 1-10). Other product
  // ids are ignored here — their flow is TBD by the owner; they keep the quote form.
  const rawProductId = searchParams.get('product');
  const productId = rawProductId && Number(rawProductId) <= 10 ? rawProductId : null;
  const queryPages = searchParams.get('pages');
  const queryQuantity = searchParams.get('quantity');

  const selectedProduct = productId ? products.find(p => String(p.id) === productId) : null;

  const [pages, setPages] = useState(queryPages ? snapToPages(Number(queryPages) || 88) : 88);
  // Query quantity from the product page snaps once, on arrival, to the nearest press run
  const [copies, setCopies] = useState(queryQuantity ? snapToSlab(Number(queryQuantity) || 2000) : 2000);
  const [size, setSize] = useState<Size>('1/8 Demy');
  const [innerColor, setInnerColor] = useState<InnerColor>('4 Color');
  const [innerPaper, setInnerPaper] = useState<InnerPaper>('70 GSM NS Maplitho');
  const [wrapperType, setWrapperType] = useState<WrapperType>('Normal');
  const [wrapperBoard, setWrapperBoard] = useState<WrapperBoard>('300 GSM Art Board');
  const [binding, setBinding] = useState<Binding>('Perfect Binding');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', organization: '' });

  const spec: QuoteInput = { pages, copies, size, innerColor, innerPaper, wrapperType, wrapperBoard, binding };
  const [minPages, maxPages] = PAGE_LIMITS[binding];
  const pageLimitError = pages < minPages || pages > maxPages
    ? `${binding} works for ${minPages}–${maxPages} pages — adjust the page count or pick another binding.`
    : '';
  let q: QuoteResult | null = null;
  let quoteError = '';
  try { q = quote(spec); } catch (e) { quoteError = e instanceof Error ? e.message : String(e); }
  if (pageLimitError) q = null;

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product_id: productId,
          product_title: selectedProduct?.title,
          copies,
          pages,
          size_format: size,
          binding,
          inner_color: innerColor,
          inner_paper: innerPaper,
          wrapper: `${wrapperBoard} (${wrapperType})`,
          estimated_price: q ? Math.round(q.total) : null
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setFormData({ name: '', phone: '', email: '', organization: '' });
        }, 3000);
      } else {
        console.error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">

      {/* Left Column: Configurator */}
      <div className="flex-1 space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Build Your Book Quote</h2>
          <p className="text-slate-500">Real offset press rates — the same costing our estimators use. Prices update as you choose.</p>
        </div>

        {selectedProduct && (
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="relative w-16 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0">
              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                fill
                sizes="64px"
                className="object-contain p-2 mix-blend-multiply"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedProduct.categoryLabel}</p>
              <h3 className="text-sm font-bold text-slate-900">{selectedProduct.title}</h3>
            </div>
          </div>
        )}

        <form className="space-y-10">
          <Section step={1} title="Pages & Quantity" hint="How big is the book, and how many copies do you need?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pages per Copy
                  <span className="text-[10px] text-slate-400 font-normal normal-case">printed in multiples of 8</span>
                </label>
                <select
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors appearance-none cursor-pointer font-mono text-base"
                >
                  {PAGES_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Copies
                  <span className="text-[10px] text-slate-400 font-normal normal-case">standard press runs</span>
                </label>
                <select
                  value={copies}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors appearance-none cursor-pointer font-mono text-base"
                >
                  {COPIES_SLABS.map((s) => (
                    <option key={s} value={s}>{inr(s)}</option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          <Section step={2} title="Book Size" hint="The finished, trimmed size of your book — drawn to scale.">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {SIZES.map((s) => {
                const [w, h] = SIZE_CM[s];
                const active = s === size;
                const SC = 2.6; // shared px-per-cm so relative sizes are honest
                return (
                  <button key={s} type="button" onClick={() => setSize(s)} className={`${cardCls(active)} flex flex-col items-center gap-2`}>
                    <span className="h-[84px] flex items-end justify-center">
                      <span
                        className={`relative block border-2 rounded-r-sm transition-colors ${active ? 'border-slate-900' : 'border-slate-400'}`}
                        style={{ width: w * SC, height: h * SC }}
                      >
                        <span className={`absolute left-0 top-0 h-full w-[5px] ${active ? 'bg-slate-900' : 'bg-slate-400'}`} />
                      </span>
                    </span>
                    <span className="text-sm font-bold text-gray-900">{s}</span>
                    <span className="text-xs text-slate-500 font-mono">{w} × {h} cm</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section step={3} title="Inside Pages" hint="What the inner pages are printed in, and on.">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {INNER_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setInnerColor(c)}
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                      innerColor === c ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    <span className="block text-sm font-bold text-gray-900">{c === 'Black' ? 'Black & White' : 'Full Color (CMYK)'}</span>
                    <span className="block text-xs text-gray-500 mt-1">{c === 'Black' ? 'Text-heavy books, most economical' : 'Photos, art & illustrated books'}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Inner Paper <span className="text-slate-400 font-normal normal-case">(higher GSM = thicker sheet)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
                  {INNER_PAPERS.map((p) => {
                    const gsm = parseInt(p);
                    const quality = p.split(' GSM ')[1];
                    const active = p === innerPaper;
                    return (
                      <button key={p} type="button" onClick={() => setInnerPaper(p)} className={`${cardCls(active)} flex flex-col items-center gap-1.5 text-center`}>
                        <span
                          className={`block w-10 rounded-sm ${active ? 'bg-slate-900' : 'bg-slate-300'}`}
                          style={{ height: Math.round(gsm / 18) }}
                        />
                        <span className="text-sm font-bold text-gray-900">{gsm} GSM</span>
                        <span className="text-xs text-gray-700">{quality}</span>
                        <span className="text-[10px] text-slate-400">{PAPER_DESC[quality]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          <Section step={4} title="Cover" hint="The printed, laminated wrapper that goes around your book.">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {WRAPPER_TYPES.map((wt) => {
                    const active = wt === wrapperType;
                    const flap = wt === 'Flap';
                    return (
                      <button key={wt} type="button" onClick={() => setWrapperType(wt)} className={`${cardCls(active)} flex items-center gap-4 text-left`}>
                        <svg viewBox="0 0 64 44" className={`w-16 h-11 shrink-0 ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                          <rect x={flap ? 20 : 14} y="6" width="28" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2.2" />
                          {flap && (<>
                            <rect x="8" y="9" width="12" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                            <rect x="48" y="9" width="9" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                          </>)}
                        </svg>
                        <span>
                          <span className="block text-sm font-bold text-gray-900">{wt}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">
                            {flap ? 'Folded-in flaps, like a dust jacket' : 'Standard wrap-around cover'}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Cover Paper / Board <span className="text-slate-400 font-normal normal-case">(thicker = stiffer cover)</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {WRAPPER_BOARDS.map((wb) => {
                    const gsm = parseInt(wb);
                    const active = wb === wrapperBoard;
                    return (
                      <button key={wb} type="button" onClick={() => setWrapperBoard(wb)} className={`${cardCls(active)} flex flex-col items-center gap-1.5 text-center`}>
                        <span
                          className={`block w-12 rounded-sm ${active ? 'bg-slate-900' : 'bg-slate-300'}`}
                          style={{ height: Math.round(gsm / 40) }}
                        />
                        <span className="text-sm font-bold text-gray-900">{gsm} GSM</span>
                        <span className="text-xs text-gray-700">{wb.split(' GSM ')[1]}</span>
                        <span className="text-[10px] text-slate-400">
                          {gsm === 170 ? 'flexible' : gsm === 250 ? 'sturdy' : 'stiffest, most premium'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          <Section step={5} title="Binding" hint="How your book is held together — one of the biggest factors in its look and feel.">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              {BINDINGS.map((b) => {
                const [lo, hi] = PAGE_LIMITS[b];
                const active = b === binding;
                const disabled = pages < lo || pages > hi;
                return (
                  <button
                    key={b}
                    type="button"
                    disabled={disabled}
                    onClick={() => setBinding(b)}
                    className={`${cardCls(active && !disabled, disabled)} flex flex-col items-start gap-1.5 text-left`}
                  >
                    <span className={active && !disabled ? 'text-slate-900' : 'text-slate-400'}><BindingGlyph b={b} /></span>
                    <span className="text-sm font-bold text-gray-900">{b}</span>
                    <span className="text-xs text-gray-500 leading-snug">{BINDING_DESC[b]}</span>
                    <span className={`text-[10px] font-semibold ${disabled ? 'text-red-500' : 'text-slate-400'}`}>
                      {lo}–{hi} pages{disabled ? ` · yours has ${pages}` : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>
        </form>
      </div>

      {/* Right Column: Sticky Live Estimate */}
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="sticky top-32 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-[#f29a1b]" />
              <h3 className="text-base font-bold">Live Estimate</h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Offset</span>
          </div>

          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-900">{pages} pages</strong> · <strong className="text-gray-900">{inr(copies)} copies</strong> · {size} · {innerColor === 'Black' ? 'B&W' : 'Full color'} · {binding}
            </p>
          </div>

          <div className="px-6 py-4 border-b border-gray-100 bg-slate-50/60">
            <BookPreview size={size} pages={pages} />
          </div>

          {q ? (
            <div className="px-6 py-6 bg-slate-50 border-b border-gray-100">
              <div className="flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Total</span>
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">₹{inr(q.total)}</span>
                  <span className="block text-xs text-gray-500 mt-1">incl. 18% GST · excl. freight</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Per Book</span>
                  <span className="inline-flex items-center text-xl font-bold text-[#b06f0e]">
                    <IndianRupee className="w-4 h-4" />{inr(q.perCopy, 2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-8 border-b border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {pageLimitError || (
                  <>This combination isn&apos;t on our standard rate card ({quoteError}). Try a different quantity or
                  binding — or request an official quote and we&apos;ll price it manually.</>
                )}
              </p>
            </div>
          )}

          {/* Price breaks */}
          <div className="px-6 py-4 border-b border-gray-100">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Per-book price at volume</span>
            <div className="grid grid-cols-3 gap-1.5">
              {PRICE_BREAK_QTYS.map((qty) => {
                const bq = pageLimitError ? null : safeQuote({ ...spec, copies: qty });
                const active = qty === copies;
                return (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setCopies(qty)}
                    className={`rounded-lg px-2 py-2 text-center border transition-colors cursor-pointer ${
                      active ? 'border-slate-900 bg-slate-900 text-white' : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <span className={`block text-[10px] font-mono ${active ? 'text-slate-300' : 'text-gray-400'}`}>{inr(qty)}</span>
                    <span className={`block text-xs font-bold ${active ? 'text-white' : 'text-gray-900'}`}>{bq ? `₹${inr(bq.perCopy, 1)}` : '—'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 space-y-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center py-4 px-6 bg-[#f29a1b] hover:bg-[#de8710] text-white text-sm font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Request Official Quote
            </button>
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-gray-500">
                Estimate from our standard offset rate card. Final pricing confirmed after artwork review.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-600">
            <Package className="w-4 h-4 text-gray-400" />
            Standard production time: <strong className="text-gray-900">5-7 Days</strong>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Request Official Quote</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Quote Requested!</h4>
                  <p className="text-slate-500 text-sm">We have received your request and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Organization / Company</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold rounded transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
