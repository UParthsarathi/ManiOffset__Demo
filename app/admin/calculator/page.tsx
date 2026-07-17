'use client';

// Owner-facing price calculator: mirrors the Quotation sheet 1:1 — all six cost
// lines, subtotal, GST, total and unit rate. Exact press-run slabs only.
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  quote, COPIES_SLABS, SIZES, INNER_COLORS, INNER_PAPERS, WRAPPER_TYPES, WRAPPER_BOARDS, BINDINGS,
  Size, InnerColor, InnerPaper, WrapperType, WrapperBoard, Binding, QuoteInput, QuoteResult,
} from '@/lib/offset-pricing';

const inr = (n: number, decimals = 0) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  'w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer';

export default function AdminCalculatorPage() {
  const [pages, setPages] = useState(1488);
  const [copies, setCopies] = useState<number>(10000);
  const [size, setSize] = useState<Size>('1/4 Demy');
  const [innerColor, setInnerColor] = useState<InnerColor>('4 Color');
  const [innerPaper, setInnerPaper] = useState<InnerPaper>('100 GSM White Maplitho');
  const [wrapperType, setWrapperType] = useState<WrapperType>('Normal');
  const [wrapperBoard, setWrapperBoard] = useState<WrapperBoard>('300 GSM Art Board');
  const [binding, setBinding] = useState<Binding>('Perfect Binding');

  const spec: QuoteInput = { pages, copies, size, innerColor, innerPaper, wrapperType, wrapperBoard, binding };
  let q: QuoteResult | null = null;
  let err = '';
  try { q = quote(spec); } catch (e) { err = e instanceof Error ? e.message : String(e); }

  const lines: [string, number][] = q ? [
    ['Plate & Printing', q.printing],
    ['Wrapper Printing', q.wrapperPrinting],
    ['Lamination', q.lamination],
    ['Binding', q.binding],
    ['Inner Paper', q.innerPaper],
    ['Wrapper Paper/Board', q.board],
  ] : [];

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-6 h-6 text-[#f29a1b]" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Price Calculator</h1>
          <p className="text-sm text-slate-500">Full rate-card costing — same numbers as the pricing sheet</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-2 gap-4 h-fit">
          <Field label="Pages">
            <input
              type="number" min={16} max={1496} step={8} value={pages}
              onChange={(e) => setPages(Math.max(8, Math.round(Number(e.target.value) || 0)))}
              className={selectCls + ' font-mono'}
            />
          </Field>
          <Field label="Copies">
            <select value={copies} onChange={(e) => setCopies(Number(e.target.value))} className={selectCls + ' font-mono'}>
              {COPIES_SLABS.map((s) => <option key={s} value={s}>{inr(s)}</option>)}
            </select>
          </Field>
          <Field label="Size">
            <select value={size} onChange={(e) => setSize(e.target.value as Size)} className={selectCls}>
              {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Inner Color">
            <select value={innerColor} onChange={(e) => setInnerColor(e.target.value as InnerColor)} className={selectCls}>
              {INNER_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Inner Paper (GSM + Quality)">
            <select value={innerPaper} onChange={(e) => setInnerPaper(e.target.value as InnerPaper)} className={selectCls}>
              {INNER_PAPERS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Wrapper Type">
            <select value={wrapperType} onChange={(e) => setWrapperType(e.target.value as WrapperType)} className={selectCls}>
              {WRAPPER_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Wrapper Quality">
            <select value={wrapperBoard} onChange={(e) => setWrapperBoard(e.target.value as WrapperBoard)} className={selectCls}>
              {WRAPPER_BOARDS.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Binding">
            <select value={binding} onChange={(e) => setBinding(e.target.value as Binding)} className={selectCls}>
              {BINDINGS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <p className="col-span-2 text-xs text-slate-400">
            Forms: {(pages / 16).toFixed(2)} · Slab quantities 300–10,000 only, exactly as the sheet
          </p>
        </div>

        {/* Quotation */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden h-fit">
          <div className="bg-slate-900 text-white px-6 py-4">
            <h2 className="font-bold">Quotation</h2>
            <p className="text-xs text-slate-400 font-mono">
              {pages}pp · {inr(copies)} copies · {size} · {innerColor} · {binding}
            </p>
          </div>
          {q ? (
            <table className="w-full text-sm">
              <tbody>
                {lines.map(([label, amount]) => (
                  <tr key={label} className="border-b border-slate-100">
                    <td className="px-6 py-2.5 text-slate-600">{label}</td>
                    <td className="px-6 py-2.5 text-right font-mono text-slate-900">₹{inr(amount)}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="px-6 py-2.5 font-semibold text-slate-700">Subtotal</td>
                  <td className="px-6 py-2.5 text-right font-mono font-semibold text-slate-900">₹{inr(q.subtotal)}</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="px-6 py-2.5 font-semibold text-slate-700">GST 18%</td>
                  <td className="px-6 py-2.5 text-right font-mono font-semibold text-slate-900">₹{inr(q.gst)}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-900 text-white">
                  <td className="px-6 py-3 font-bold">TOTAL</td>
                  <td className="px-6 py-3 text-right font-mono font-bold text-lg">₹{inr(q.total)}</td>
                </tr>
                <tr>
                  <td className="px-6 py-2.5 text-slate-600">Unit Rate (per copy)</td>
                  <td className="px-6 py-2.5 text-right font-mono text-[#b06f0e] font-bold">₹{inr(q.perCopy, 2)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="px-6 py-8 text-sm text-amber-700 bg-amber-50">Not on the rate card: {err}</p>
          )}
        </div>
      </div>
    </div>
  );
}
