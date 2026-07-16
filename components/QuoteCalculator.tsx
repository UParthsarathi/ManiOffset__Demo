"use client";

import React, { useState } from 'react';
import { Calculator, Package, Check, Info, X, IndianRupee } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import Image from 'next/image';
import {
  quote, snapToSlab, COPIES_SLABS, SIZES, INNER_COLORS, INNER_PAPERS, WRAPPER_BOARDS, BINDINGS,
  Size, InnerColor, InnerPaper, WrapperBoard, Binding,
} from '@/lib/offset-pricing';

const inr = (n: number, decimals = 0) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const PRICE_BREAK_QTYS = [500, 1000, 2000, 3000, 5000, 10000];

function OptionPills<T extends string>({ options, value, onChange }: {
  options: readonly T[]; value: T; onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
            value === opt
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Section({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold">{step}</span>
        <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function QuoteCalculator() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const queryPages = searchParams.get('pages');
  const queryQuantity = searchParams.get('quantity');

  const selectedProduct = productId ? products.find(p => String(p.id) === productId) : null;

  const [pages, setPages] = useState(queryPages ? Math.max(8, Number(queryPages)) : 88);
  const [copies, setCopies] = useState(queryQuantity ? snapToSlab(Number(queryQuantity)) : 2000);
  const [size, setSize] = useState<Size>('1/8 Demy');
  const [innerColor, setInnerColor] = useState<InnerColor>('4 Color');
  const [innerPaper, setInnerPaper] = useState<InnerPaper>('70 GSM NS Maplitho');
  const [wrapperBoard, setWrapperBoard] = useState<WrapperBoard>('300 GSM Art Board');
  const [binding, setBinding] = useState<Binding>('Perfect Binding');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', organization: '' });

  const spec = { pages, copies, size, innerColor, innerPaper, wrapperBoard, binding };
  const q = quote(spec);

  const breakdown: [string, number][] = [
    ['Plates & inner printing', q.printing],
    ['Cover printing', q.wrapperPrinting],
    ['Inner paper', q.innerPaper],
    ['Cover board', q.board],
    ['Lamination', q.lamination],
    ['Binding', q.binding],
  ];

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
          wrapper: wrapperBoard,
          estimated_price: q.total
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
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

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
          <Section step={1} title="Pages & Quantity">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pages per Copy
                  <span className="text-[10px] text-slate-400 font-normal normal-case">multiples of 4 print best</span>
                </label>
                <input
                  type="number"
                  min={8}
                  value={pages}
                  onChange={(e) => setPages(Math.max(8, Math.round(Number(e.target.value) || 0)))}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors font-mono text-base"
                />
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

          <Section step={2} title="Book Size">
            <OptionPills options={SIZES} value={size} onChange={(v) => setSize(v)} />
            <p className="text-xs text-slate-400">Demy 1/8 ≈ 5.5&quot; × 8.5&quot; (novels) · 1/4 ≈ 8.5&quot; × 11&quot; (magazines, catalogs)</p>
          </Section>

          <Section step={3} title="Inside Pages">
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Inner Paper</label>
                <select
                  value={innerPaper}
                  onChange={(e) => setInnerPaper(e.target.value as InnerPaper)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                >
                  {INNER_PAPERS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section step={4} title="Cover">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Paper / Board <span className="text-slate-400 font-normal normal-case">(4-color printed, laminated)</span></label>
              <select
                value={wrapperBoard}
                onChange={(e) => setWrapperBoard(e.target.value as WrapperBoard)}
                className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors appearance-none cursor-pointer"
              >
                {WRAPPER_BOARDS.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </Section>

          <Section step={5} title="Binding">
            <OptionPills options={BINDINGS} value={binding} onChange={(v) => setBinding(v)} />
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

          {/* Cost breakdown */}
          <div className="px-6 py-5 space-y-2.5 border-b border-gray-100">
            {breakdown.map(([label, amount]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-900 font-mono">₹{inr(amount)}</span>
              </div>
            ))}
          </div>

          <div className="px-6 py-6 bg-slate-50 border-b border-gray-100">
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Total</span>
                <span className="text-3xl font-bold text-gray-900 tracking-tight">₹{inr(q.total)}</span>
                <span className="block text-xs text-gray-500 mt-1">excl. GST &amp; freight</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Per Book</span>
                <span className="inline-flex items-center text-xl font-bold text-[#b06f0e]">
                  <IndianRupee className="w-4 h-4" />{inr(q.perCopy, 2)}
                </span>
              </div>
            </div>
          </div>

          {/* Price breaks */}
          <div className="px-6 py-4 border-b border-gray-100">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Per-book price at volume</span>
            <div className="grid grid-cols-3 gap-1.5">
              {PRICE_BREAK_QTYS.map((qty) => {
                const per = quote({ ...spec, copies: qty }).perCopy;
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
                    <span className={`block text-xs font-bold ${active ? 'text-white' : 'text-gray-900'}`}>₹{inr(per, 1)}</span>
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
