// Offset printing cost engine — direct port of the owner's price calculator
// workbook ("Price Calculator - Rough Anand", sheets: Quotation, Copy of Calc,
// Costing Database). Verified against Excel recalculation on 79 input
// combinations (18 curated + 61 random) — exact match on every cost component.
// Offset printing only; the workbook's digital/POD side is out of scope.

export const SIZES = ['1/8 Demy', '1/8 Crown', '1/4 Demy', '1/4 Crown', 'Royal'] as const;
export const INNER_COLORS = ['Black', '4 Color'] as const;
export const INNER_PAPERS = [
  '70 GSM NS Maplitho',
  '80 GSM NS Maplitho',
  '100 GSM NS Maplitho',
  '130 GSM Art Paper',
] as const;
export const WRAPPER_BOARDS = ['170 GSM Art Paper', '250 GSM Art Board', '300 GSM Art Board'] as const;
export const BINDINGS = [
  'Perfect Binding',
  'Saddle Stitch',
  'Side Pin',
  'Spiral',
  'Wire O',
  'Case Binding',
] as const;

// The workbook's rate lookups are exact-match on copies — only these
// quantities are quotable.
export const COPIES_SLABS = [
  300, 500, 600, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
] as const;

export type Size = (typeof SIZES)[number];
export type InnerColor = (typeof INNER_COLORS)[number];
export type InnerPaper = (typeof INNER_PAPERS)[number];
export type WrapperBoard = (typeof WRAPPER_BOARDS)[number];
export type Binding = (typeof BINDINGS)[number];

export interface QuoteInput {
  pages: number;
  copies: number;
  size: Size;
  innerColor: InnerColor;
  innerPaper: InnerPaper;
  wrapperBoard: WrapperBoard;
  binding: Binding;
}

export interface QuoteResult {
  printing: number;
  wrapperPrinting: number;
  lamination: number;
  binding: number;
  innerPaper: number;
  board: number;
  total: number;
  perCopy: number;
}

export const snapToSlab = (n: number): number =>
  COPIES_SLABS.reduce((best, s) => (Math.abs(s - n) < Math.abs(best - n) ? s : best), COPIES_SLABS[0]);

const EIGHTH = new Set<Size>(['1/8 Demy', '1/8 Crown']); // 16pp/form, 2 copies per sheet

// Rate tables (Costing Database sheet), rupees
const PAPER_REAM_RATE: Record<string, Record<InnerPaper, number>> = {
  Demy: { '70 GSM NS Maplitho': 1600, '80 GSM NS Maplitho': 1750, '100 GSM NS Maplitho': 2150, '130 GSM Art Paper': 3300 },
  Crown: { '70 GSM NS Maplitho': 1100, '80 GSM NS Maplitho': 1250, '100 GSM NS Maplitho': 1550, '130 GSM Art Paper': 2400 },
};
const BOARD_RATE: Record<string, Record<WrapperBoard, number>> = {
  Demy: { '170 GSM Art Paper': 10, '250 GSM Art Board': 16, '300 GSM Art Board': 16 },
  Crown: { '170 GSM Art Paper': 7, '250 GSM Art Board': 11, '300 GSM Art Board': 11.5 },
};

// Excel MROUND: nearest multiple, ties away from zero
const mround = (x: number, m: number) => Math.floor(x / m + 0.5) * m;

const blackRate = (copies: number) => (copies <= 1000 ? 600 : 600 + (copies / 1000 - 1) * 150);
const colorRate = (copies: number) => (copies <= 1000 ? 2500 : 2500 + (copies / 1000 - 1) * 400);
const wrapperRate = (copies: number) => (copies <= 2000 ? 3500 : 3500 + (copies / 1000 - 2) * 500);

const lamRate = (size: Size, copies: number): number => {
  if (EIGHTH.has(size)) return 2;
  if (copies <= 750) return 2.5;
  if (copies <= 1000) return 2;
  if (copies <= 2000) return 1.8;
  if (copies <= 3000) return 1.5;
  if (copies <= 4000) return 1.3;
  return 1.25;
};

const perfectRate = (copies: number) => (copies <= 600 ? 300 : copies <= 1000 ? 400 : (400 * copies) / 1000);
// Saddle Stitch / Side Pin / Spiral / Wire O share the same per-copy rates.
// (The workbook's Spiral lookup errors below 1000 copies; we use the rate its
// own table lists for those slabs.)
const perCopyBindRate = (copies: number) => (copies <= 750 ? 2.5 : copies <= 4500 ? 2 : 1.75);

export function quote(input: QuoteInput): QuoteResult {
  const { pages, copies, size, innerColor, innerPaper, wrapperBoard, binding } = input;
  const family = size === '1/8 Demy' || size === '1/4 Demy' ? 'Demy' : 'Crown';
  const forms16 = pages / 16; // forms at 16pp — paper & binding use this for every size

  // 1. Inner plate & printing
  let printing: number;
  if (innerColor === 'Black') {
    const plates = EIGHTH.has(size) ? Math.ceil(forms16) : Math.ceil(forms16 * 2);
    printing = blackRate(copies) * plates;
  } else {
    const forms = EIGHTH.has(size) ? pages / 16 : pages / 8;
    printing = colorRate(copies) * forms * 2;
  }

  // 2. Cover/wrapper printing (flat by copies)
  const wrapperPrinting = wrapperRate(copies);

  // 3. Lamination
  const lamination = lamRate(size, copies) * copies;

  // 4. Binding
  let bind: number;
  if (binding === 'Perfect Binding') {
    bind = perfectRate(copies) * (Math.max(mround(forms16, 1), 10) + 1);
  } else if (binding === 'Case Binding') {
    const f = mround(forms16, 1);
    bind = (f <= 50 ? 45 : f <= 65 ? 50 : 60) * copies;
  } else {
    bind = perCopyBindRate(copies) * copies;
  }

  // 5. Inner paper — the workbook's live paper row hardcodes its size cell to
  // '1/8 Demy', so paper is always costed at half-copies-per-sheet with Demy
  // ream rates regardless of the selected size. Mirrored deliberately: these
  // are the prices the owner actually quotes. If the owner ever fixes the
  // sheet: sheets = copies/2+50 only for 1/8 sizes (else copies+50), and rate
  // by `family`.
  const reams = ((copies / 2 + 50) * forms16) / 500;
  const paper = Math.ceil(PAPER_REAM_RATE['Demy'][innerPaper] * reams);

  // 6. Cover board (8 covers per board on 1/8 sizes, 4 otherwise, +50 wastage)
  const boards = (EIGHTH.has(size) ? copies / 8 : copies / 4) + 50;
  const board = BOARD_RATE[family][wrapperBoard] * boards;

  // Quotation sheet rounds each component to the nearest ₹50 before summing
  const r = {
    printing: mround(printing, 50),
    wrapperPrinting: mround(wrapperPrinting, 50),
    lamination: mround(lamination, 50),
    binding: mround(bind, 50),
    innerPaper: mround(paper, 50),
    board: mround(board, 50),
  };
  const total = r.printing + r.wrapperPrinting + r.lamination + r.binding + r.innerPaper + r.board;
  return { ...r, total, perCopy: total / copies };
}
