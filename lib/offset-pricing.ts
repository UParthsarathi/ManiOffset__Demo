// Offset printing cost engine — direct port of the owner's price calculator
// workbook (sheets: Quotation, Calc, Costing Database). Offset only.
// The formulas live here; the numbers live in a RateCard that the admin edits at
// /admin/calculator (Costing Database tab). DEFAULT_RATES are the sheet's own values
// and are used until the first rate card is published.
// Self-check: npx tsx lib/offset-pricing.test.ts

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

// Rate lookups are exact-match on copies — only these quantities are quotable.
export const COPIES_SLABS = [
  300, 500, 600, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
  11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
  21000, 22000, 23000, 24000, 25000,
] as const;

// Valid page counts per the workbook's Data Validation list: 16–1496 in steps of 8
export const PAGES_OPTIONS: readonly number[] = Array.from({ length: 186 }, (_, i) => 16 + i * 8);

// Only paged book products carry this rate card; other products' pricing flow is TBD by the owner
export const isBookProduct = (id: number) => id >= 1 && id <= 10;

// Trimmed book sizes in cm (W × H). A5/A4 are ISO-exact; the trade sizes are derived
// from the owner's parent-sheet dimensions + published Indian trade sizes — owner to
// confirm, especially Royal (his sheet costs it on Crown paper like a quarto).
export const SIZE_CM: Record<Size, [number, number]> = {
  '1/8 Demy': [14, 21.5],
  '1/8 Crown': [12.5, 18.5],
  'A5': [14.8, 21],
  '1/4 Demy': [22, 28],
  '1/4 Crown': [18.5, 24.5],
  'Royal': [19, 24.5],
  'A4': [21, 29.7],
};

// Buildable page ranges per binding — stated on the owner's rate card (his sheet
// notes them but doesn't enforce; the customer UI enforces so orders stay buildable)
export const PAGE_LIMITS: Record<Binding, [number, number]> = {
  'Perfect Binding': [40, 1496],
  'Saddle Stitch': [8, 96],
  'Side Pin': [8, 96],
  'Spiral': [16, 196],
  'Wire O': [16, 196],
  'Case Binding': [64, 1496],
};

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
// Paper family (Costing Database "Applicable for books sizes"): 0 Demy, 1 A, 2 Crown
const PAPER_GROUP: Record<Size, 0 | 1 | 2> = {
  '1/8 Demy': 0, '1/4 Demy': 0, A5: 1, A4: 1, '1/8 Crown': 2, '1/4 Crown': 2, Royal: 2,
};

// Excel MROUND: nearest multiple, ties away from zero
const mround = (x: number, m: number) => Math.floor(x / m + 0.5) * m;

// ---------------------------------------------------------------------------
// Rate card — the sheet's yellow (and orange board Rate_Fix) cells as one flat map.
// Keys are `${column}:${row}`:
//   blk col ws wl ls ll pf ss sp : row = index into COPIES_SLABS
//   pw ph pk                     : row = index into PAPER_ROWS (width, height, rate per kg)
//   bw bh bk bf                  : row = index into BOARD_ROWS (…, Rate_Fix)
//   cs cl                        : row = index into CASE_PAGES (small / large sizes)
// ---------------------------------------------------------------------------
export type RateCard = Record<string, number>;

export const QTY_COLS = ['blk', 'col', 'ws', 'wl', 'ls', 'll', 'pf', 'ss', 'sp'] as const;
export type QtyCol = (typeof QTY_COLS)[number];

// Costing Database row order: each paper type on Demy, A and Crown parent sheets
const PAPER_TYPES: [number, string][] = [
  [70, 'NS Maplitho'], [80, 'NS Maplitho'], [70, 'White Maplitho'], [80, 'White Maplitho'],
  [100, 'White Maplitho'], [100, 'Art Paper'], [130, 'Art Paper'],
];
const PAPER_NAMES = PAPER_TYPES.map(([gsm, quality]) => `${gsm} GSM ${quality}`);
const PAPER_FAMILIES = [
  { group: 'Demy', w: 58.5, h: 91, sizes: '1/8 Demy, 1/4 Demy' },
  { group: 'A', w: 63.5, h: 91, sizes: 'A5, A4' },
  { group: 'Crown', w: 51, h: 76, sizes: '1/8 Crown, 1/4 Crown, Royal' },
];
export const PAPER_ROWS = PAPER_TYPES.flatMap(([gsm, quality]) => PAPER_FAMILIES.map((f) => ({ gsm, quality, ...f })));
export const BOARD_ROWS = ([
  [170, 'Art Paper', 63.5, 11], [250, 'Art Board', 63.5, 15], [300, 'Art Board', 63.5, 22],
  [170, 'Art Paper', 58.5, 10], [250, 'Art Board', 58.5, 14], [300, 'Art Board', 58.5, 18],
] as [number, string, number, number][]).map(([gsm, quality, w, fix], i) => ({
  gsm, quality, w, h: 91, fix,
  group: i < 3 ? 'Demy and A sizes' : 'Crown sizes',
  sizes: i < 3 ? 'A5, A4, 1/8 Demy, 1/4 Demy' : '1/8 Crown, 1/4 Crown, Royal',
}));
// Case binding rate bands: exact-or-next-larger page count
export const CASE_PAGES = [504, 752, 1264, 1776, 2000];

// Sheet formulas behind the calculated columns
export const paperReam = (w: number, h: number, gsm: number, kg: number) => mround((w * h * gsm * kg * 500) / 1e7, 1);
export const paperFix = (ream: number) => Math.ceil(ream / 100) * 100 + 100; // ROUNDUP(ream,-2)+100
export const boardSheet = (w: number, h: number, gsm: number, kg: number) => mround((w * h * gsm * kg) / 1e7, 0.5);

const seq = (start: number, step: number, n: number) => Array.from({ length: n }, (_, i) => start + i * step);
const rep = (v: number, n: number) => Array<number>(n).fill(v);
// Sheet values per copies slab: first 23 entries are 300–10,000, last 15 are 11,000–25,000
const QTY_DEFAULTS: Record<QtyCol, number[]> = {
  blk: [750, 750, 750, 750, 750, 850, 925, 1025, 1100, 1200, 1275, 1375, 1450,
    1550, 1625, 1725, 1800, 1900, 1975, 2075, 2150, 2250, 2325, ...seq(2500, 175, 15)],
  col: [3000, 3000, 3000, 3000, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000,
    5250, 5500, 5750, 6000, 6250, 6500, 6750, 7000, 7250, 7500, ...seq(8000, 500, 15)],
  ws: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3500, 3500,
    3500, 3500, 4000, 4000, 4000, 4000, 4500, 4500, 4500, 4500,
    5000, 5000, 5500, 5500, 6000, 6000, 6500, 6500, 7000, 7000, 7500, 7500, 8000, 8000, 8500],
  wl: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500,
    5000, 5000, 5500, 5500, 6000, 6000, 6500, 6500, 7000, 7000, ...seq(7500, 500, 15)],
  ls: [...rep(2, 22), ...rep(1.5, 16)],
  ll: [...rep(2.5, 4), ...rep(2, 9), ...rep(1.8, 25)],
  pf: [375, 375, 375, 500, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500,
    2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, ...seq(5500, 500, 15)],
  ss: [...rep(4, 5), ...rep(2.5, 6), ...rep(2, 27)],
  sp: rep(20, 38),
};

export const DEFAULT_RATES: RateCard = (() => {
  const d: RateCard = {};
  for (const c of QTY_COLS) QTY_DEFAULTS[c].forEach((v, i) => { d[`${c}:${i}`] = v; });
  PAPER_ROWS.forEach((p, i) => { d[`pw:${i}`] = p.w; d[`ph:${i}`] = p.h; d[`pk:${i}`] = 80; });
  BOARD_ROWS.forEach((b, i) => { d[`bw:${i}`] = b.w; d[`bh:${i}`] = b.h; d[`bk:${i}`] = 85; d[`bf:${i}`] = b.fix; });
  [60, 70, 90, 140, 160].forEach((v, i) => { d[`cs:${i}`] = v; });
  [70, 80, 100, 150, 175].forEach((v, i) => { d[`cl:${i}`] = v; });
  return d;
})();

// Trust boundary for anything read from the database or sent by the admin form:
// every key present, every value a sane positive number. Returns null otherwise.
export function parseRates(x: unknown): RateCard | null {
  if (!x || typeof x !== 'object') return null;
  const out: RateCard = {};
  for (const k of Object.keys(DEFAULT_RATES)) {
    const n = Number((x as Record<string, unknown>)[k]);
    if (!Number.isFinite(n) || n <= 0 || n > 1e7) return null;
    out[k] = n;
  }
  return out;
}

export function quote(input: QuoteInput, rates: RateCard = DEFAULT_RATES): QuoteResult {
  const { pages, copies, size, innerColor, innerPaper, wrapperType, wrapperBoard, binding } = input;
  const i = (COPIES_SLABS as readonly number[]).indexOf(copies);
  if (i < 0) throw new Error(`copies must be one of the press-run slabs (300–25000), got ${copies}`);
  const small = SMALL.has(size);
  const group = PAPER_GROUP[size];
  const forms16 = pages / 16; // Calc's forms count — unrounded where the sheet leaves it unrounded
  const formsRound = mround(forms16, 1);

  // 1. Inner plate & printing (Calc J6 / J13)
  const printing =
    innerColor === 'Black'
      ? rates[`blk:${i}`] * (small ? Math.ceil(forms16) : Math.ceil(forms16 * 2))
      : rates[`col:${i}`] * (small ? forms16 : pages / 8) * 2;

  // 2. Wrapper printing, flat by copies (Calc J19)
  const wrapperPrinting = rates[small ? `ws:${i}` : `wl:${i}`];

  // 3. Lamination (Calc J39)
  const lamination = rates[LAM_SMALL.has(size) ? `ls:${i}` : `ll:${i}`] * copies;

  // 4. Binding (Calc J45 / J49 / J53 / J57)
  let bind: number;
  if (binding === 'Perfect Binding') {
    bind = rates[`pf:${i}`] * (Math.max(formsRound, 10) + 1);
  } else if (binding === 'Case Binding') {
    const idx = CASE_PAGES.findIndex((p) => p >= pages);
    if (idx < 0) throw new Error(`Case Binding supports up to ${CASE_PAGES[CASE_PAGES.length - 1]} pages, got ${pages}`);
    bind = rates[small ? `cs:${idx}` : `cl:${idx}`] * copies;
  } else if (binding === 'Spiral' || binding === 'Wire O') {
    bind = copies * (rates[`sp:${i}`] + formsRound); // rate per copy + ₹1 per form
  } else {
    bind = rates[`ss:${i}`] * copies;
  }

  // 5. Inner paper (Calc E25/I25/J25): reams from copies+wastage, Rate_Fix per ream
  const reams = small ? ((copies / 2 + 50) * forms16) / 500 : ((copies + 100) * forms16) / 500;
  const row = PAPER_NAMES.indexOf(innerPaper) * 3 + group;
  const ratePerReam = paperFix(paperReam(rates[`pw:${row}`], rates[`ph:${row}`], PAPER_ROWS[row].gsm, rates[`pk:${row}`]));
  const paper = Math.ceil(ratePerReam * reams);

  // 6. Cover board (Calc F33/G33/J33): covers per board halve with small size / Flap doubles
  const boardsRaw = (small ? copies / 8 : copies / 4) * (wrapperType === 'Flap' ? 2 : 1) + 50;
  const boardRow = WRAPPER_BOARDS.indexOf(wrapperBoard) + (group === 2 ? 3 : 0);
  const board = rates[`bf:${boardRow}`] * mround(boardsRaw, 5);

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
  if (!Number.isFinite(subtotal)) throw new Error('rate card is incomplete for this combination');
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  return { ...r, subtotal, gst, total, perCopy: total / copies };
}
