// Shared visual pieces for the book calculator UIs: the 3D book preview,
// binding line-art (placeholder until the owner supplies photos), option-card
// styling and customer-facing copy for papers/bindings.
import { Size, Binding, SIZE_CM } from '@/lib/offset-pricing';

export const BINDING_DESC: Record<Binding, string> = {
  'Perfect Binding': 'Glued square spine — the standard paperback look',
  'Saddle Stitch': 'Folded sheets stapled through the spine fold',
  'Side Pin': 'Stapled through the front, near the spine edge',
  'Spiral': 'Plastic coil through punched holes — lies flat open',
  'Wire O': 'Twin-loop wire binding — lies flat, premium feel',
  'Case Binding': 'Rigid hardcover boards — the premium option',
};

export const PAPER_DESC: Record<string, string> = {
  'NS Maplitho': 'economy, everyday',
  'White Maplitho': 'bright white, smooth',
  'Art Paper': 'coated, glossy',
};

export const cardCls = (active: boolean, disabled = false) =>
  `p-4 rounded-xl border transition-colors ${
    disabled
      ? 'opacity-40 cursor-not-allowed bg-slate-50 border-gray-200'
      : active
        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 cursor-pointer'
        : 'border-gray-200 bg-white hover:border-gray-400 cursor-pointer'
  }`;

// Placeholder line art until the owner supplies real binding photos
export function BindingGlyph({ b }: { b: Binding }) {
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

export function BookPreview({ size, pages }: { size: Size; pages: number }) {
  const [w, h] = SIZE_CM[size];
  const thickCm = Math.max(0.4, pages * 0.006); // ≈0.06 mm bulk per page
  const S = 4; // px per cm
  const W = w * S, H = h * S, T = Math.min(thickCm * S, 44);
  return (
    <div className="flex items-center gap-4">
      <div className="h-36 w-36 flex items-center justify-center shrink-0" style={{ perspective: '900px' }}>
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
