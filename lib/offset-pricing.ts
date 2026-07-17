// Offset printing cost engine — direct port of the owner's price calculator
// workbook ("Price Calculator For Website", sheets: Quotation, Calc,
// Costing Database). Offset only; digital/POD is out of scope.
// Verified against live Excel recalculation of the workbook — see
// lib/offset-pricing.test.ts (npx tsx lib/offset-pricing.test.ts).

export const SIZES = ['1/8 Demy', '1/8 Crown', 'A5', '1/4 Demy', '1/4 Crown', 'Royal', 'A4'] as const;
export const INNER_COLORS = ['Black', '4 Color'] as const;
// Only these GSM × quality pairs exist in the rate card: 70/80 GSM come in NS or
// White Maplitho only, 100 GSM in White Maplitho or Art Paper, 130 GSM in Art Paper only.
export const INNER_PAPERS = [
  '70 GSM NS Maplitho',
  '70 GSM White Maplitho',
  '80 GSM NS Maplitho',
  '80 GSM White Maplitho',
  '100 GSM White Maplitho',
  '100 GSM Art Paper',
  '130 GSM Art Paper',
] as const;
// 'No Wrapper' exists in the sheet's dropdown but its cost rows error out — unsupported.
export const WRAPPER_TYPES = ['Normal', 'Flap'] as const;
export const WRAPPER_BOARDS = ['170 GSM Art Paper', '250 GSM Art Board', '300 GSM Art Board'] as const;
export const BINDINGS = ['Perfect Binding', 'Saddle Stitch', 'Side Pin', 'Spiral', 'Wire O', 'Case Binding'] as const;

// The workbook's rate lookups are exact-match on copies — only these quantities are quotable.
export const COPIES_SLABS = [
  300, 500, 600, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
] as const;

// Valid page counts per the workbook's Data Validation list: 16–1496 in steps of 8
export const PAGES_OPTIONS: readonly number[] = Array.from({ length: 186 }, (_, i) => 16 + i * 8);

export type Size = (typeof SIZES)[number];
export type InnerColor = (typeof INNER_COLORS)[number];
export type InnerPaper = (typeof INNER_PAPERS)[number];
export type WrapperType = (typeof WRAPPER_TYPES)[number];
export type WrapperBoard = (typeof WRAPPER_BOARDS)[number];
export type Binding = (typeof BINDINGS)[number];

export interface QuoteInput {
  pages: number;
  copies: number;
  size: Size;
  innerColor: InnerColor;
  innerPaper: InnerPaper;
  wrapperType: WrapperType;
  wrapperBoard: WrapperBoard;
  binding: Binding;
}

export interface QuoteResult {
  // Each cost line rounded to the nearest ₹50 (Quotation sheet D column)
  printing: number;
  wrapperPrinting: number;
  lamination: number;
  binding: number;
  innerPaper: number;
  board: number;
  subtotal: number;
  gst: number; // 18% of subtotal
  total: number;
  perCopy: number; // GST-inclusive total / copies
}

export const snapToSlab = (n: number): number =>
  COPIES_SLABS.reduce((best, s) => (Math.abs(s - n) < Math.abs(best - n) ? s : best), COPIES_SLABS[0]);

// Sheet's size groups: 16pp forms + 2-up sheets vs 8pp forms
const SMALL = new Set<Size>(['1/8 Demy', '1/8 Crown', 'A5']);
// Lamination alone groups A5 with the large sizes (Calc D39 checks only the two 1/8 sizes)
const LAM_SMALL = new Set<Size>(['1/8 Demy', '1/8 Crown']);
// Paper rate size groups (Costing Database "Applicable for books sizes")
const PAPER_GROUP: Record<Size, 'demy' | 'a' | 'crown'> = {
  '1/8 Demy': 'demy', '1/4 Demy': 'demy',
  A5: 'a', A4: 'a',
  '1/8 Crown': 'crown', '1/4 Crown': 'crown', Royal: 'crown',
};

// Excel MROUND: nearest multiple, ties away from zero
const mround = (x: number, m: number) => Math.floor(x / m + 0.5) * m;

// --- Rate tables (Costing Database sheet), rupees, keyed by copies slab ---
const slabTable = (rates: number[]): Record<number, number> =>
  Object.fromEntries(COPIES_SLABS.map((c, i) => [c, rates[i]]));

// Plate & printing per plate, black (B4:C26)
const BLACK_RATE = slabTable([
  750, 750, 750, 750, 750, 850, 925, 1025, 1100, 1200, 1275, 1375, 1450,
  1550, 1625, 1725, 1800, 1900, 1975, 2075, 2150, 2250, 2325,
]);
// Plate & printing per plate set, 4 color (F4:G26)
const COLOR_RATE = slabTable([
  3000, 3000, 3000, 3000, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000,
  5250, 5500, 5750, 6000, 6250, 6500, 6750, 7000, 7250, 7500,
]);
// Wrapper printing, flat by copies (B47:D69 small sizes / G47:I69 large)
const WRAP_PRINT_SMALL = slabTable([
  3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3500, 3500,
  3500, 3500, 4000, 4000, 4000, 4000, 4500, 4500, 4500, 4500,
]);
const WRAP_PRINT_LARGE = slabTable([
  3000, 3000, 3000, 3000, 3000, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500,
  5000, 5000, 5500, 5500, 6000, 6000, 6500, 6500, 7000, 7000,
]);
// Lamination per wrapper (B91:C113 for 1/8 sizes / G91:H113 incl. A5)
const LAM_SMALL_RATE = slabTable([
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1.5,
]);
const LAM_LARGE_RATE = slabTable([
  2.5, 2.5, 2.5, 2.5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8,
]);
// Perfect binding rate per form (C169:D191)
const PERFECT_RATE = slabTable([
  375, 375, 375, 500, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500,
  2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000,
]);
// Saddle Stitch / Side Pin rate per copy (C213:D235)
const SADDLE_RATE = slabTable([
  4, 4, 4, 4, 4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
]);

// Inner paper Rate_Fix per ream (A133:H153), by size group
const PAPER_RATE: Record<'demy' | 'a' | 'crown', Record<InnerPaper, number>> = {
  demy: {
    '70 GSM NS Maplitho': 1600, '70 GSM White Maplitho': 1600,
    '80 GSM NS Maplitho': 1900, '80 GSM White Maplitho': 1900,
    '100 GSM White Maplitho': 2300, '100 GSM Art Paper': 2300, '130 GSM Art Paper': 2900,
  },
  a: {
    '70 GSM NS Maplitho': 1800, '70 GSM White Maplitho': 1800,
    '80 GSM NS Maplitho': 2000, '80 GSM White Maplitho': 2000,
    '100 GSM White Maplitho': 2500, '100 GSM Art Paper': 2500, '130 GSM Art Paper': 3200,
  },
  crown: {
    '70 GSM NS Maplitho': 1200, '70 GSM White Maplitho': 1200,
    '80 GSM NS Maplitho': 1400, '80 GSM White Maplitho': 1400,
    '100 GSM White Maplitho': 1700, '100 GSM Art Paper': 1700, '130 GSM Art Paper': 2200,
  },
};
// Wrapper board Rate_Fix per sheet (A158:H163) — Demy and A sizes share one row set
const BOARD_RATE: Record<'big' | 'crown', Record<WrapperBoard, number>> = {
  big: { '170 GSM Art Paper': 11, '250 GSM Art Board': 15, '300 GSM Art Board': 22 },
  crown: { '170 GSM Art Paper': 10, '250 GSM Art Board': 14, '300 GSM Art Board': 18 },
};
// Case binding rate per copy by pages, exact-or-next-larger (C295:E300)
const CASE_PAGES = [504, 752, 1264, 1776, 2000];
const CASE_RATE_SMALL = [60, 70, 90, 140, 160];
const CASE_RATE_LARGE = [70, 80, 100, 150, 175];

export function quote(input: QuoteInput): QuoteResult {
  const { pages, copies, size, innerColor, innerPaper, wrapperType, wrapperBoard, binding } = input;
  if (!(copies in BLACK_RATE)) throw new Error(`copies must be one of the press-run slabs (300–10000), got ${copies}`);
  const small = SMALL.has(size);
  const forms16 = pages / 16; // Calc's forms count — unrounded where the sheet leaves it unrounded
  const formsRound = mround(forms16, 1);

  // 1. Inner plate & printing (Calc J6 / J13)
  const printing =
    innerColor === 'Black'
      ? BLACK_RATE[copies] * (small ? Math.ceil(forms16) : Math.ceil(forms16 * 2))
      : COLOR_RATE[copies] * (small ? forms16 : pages / 8) * 2;

  // 2. Wrapper printing, flat by copies (Calc J19)
  const wrapperPrinting = small ? WRAP_PRINT_SMALL[copies] : WRAP_PRINT_LARGE[copies];

  // 3. Lamination (Calc J39)
  const lamination = (LAM_SMALL.has(size) ? LAM_SMALL_RATE[copies] : LAM_LARGE_RATE[copies]) * copies;

  // 4. Binding (Calc J45 / J49 / J53 / J57)
  let bind: number;
  if (binding === 'Perfect Binding') {
    bind = PERFECT_RATE[copies] * (Math.max(formsRound, 10) + 1);
  } else if (binding === 'Case Binding') {
    const idx = CASE_PAGES.findIndex((p) => p >= pages);
    if (idx < 0) throw new Error(`Case Binding supports up to ${CASE_PAGES[CASE_PAGES.length - 1]} pages, got ${pages}`);
    bind = (small ? CASE_RATE_SMALL[idx] : CASE_RATE_LARGE[idx]) * copies;
  } else if (binding === 'Spiral' || binding === 'Wire O') {
    // Final sheet fixed the old mis-ranged VLOOKUP: flat ₹20/copy at every slab + ₹1 per form
    bind = copies * (20 + formsRound);
  } else {
    bind = SADDLE_RATE[copies] * copies;
  }

  // 5. Inner paper (Calc E25/I25/J25): reams from copies+wastage, Rate_Fix per ream
  const reams = small ? ((copies / 2 + 50) * forms16) / 500 : ((copies + 100) * forms16) / 500;
  const paper = Math.ceil(PAPER_RATE[PAPER_GROUP[size]][innerPaper] * reams);

  // 6. Cover board (Calc F33/G33/J33): covers per board halve with small size / Flap doubles
  const boardsRaw = (small ? copies / 8 : copies / 4) * (wrapperType === 'Flap' ? 2 : 1) + 50;
  const board = BOARD_RATE[PAPER_GROUP[size] === 'crown' ? 'crown' : 'big'][wrapperBoard] * mround(boardsRaw, 5);

  // Quotation sheet: each line to nearest ₹50, then 18% GST on the sum
  const r = {
    printing: mround(printing, 50),
    wrapperPrinting: mround(wrapperPrinting, 50),
    lamination: mround(lamination, 50),
    binding: mround(bind, 50),
    innerPaper: mround(paper, 50),
    board: mround(board, 50),
  };
  const subtotal = r.printing + r.wrapperPrinting + r.lamination + r.binding + r.innerPaper + r.board;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  return { ...r, subtotal, gst, total, perCopy: total / copies };
}
