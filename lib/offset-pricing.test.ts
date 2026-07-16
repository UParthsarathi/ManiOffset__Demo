// Self-check: 18 cases verified cell-for-cell against the owner's Excel
// workbook via COM recalculation (see repo history). Run: npx tsx lib/offset-pricing.test.ts
import assert from 'node:assert';
import { quote, QuoteInput } from './offset-pricing';

type Case = [QuoteInput, number, number]; // input, expected total, expected per-copy

const base: QuoteInput = {
  pages: 88, copies: 2000, size: '1/8 Demy', innerColor: '4 Color',
  innerPaper: '70 GSM NS Maplitho', wrapperBoard: '300 GSM Art Board', binding: 'Perfect Binding',
};

const cases: Case[] = [
  [base, 71500, 35.75],
  [{ ...base, innerColor: 'Black' }, 44100, 22.05],
  [{ ...base, copies: 500 }, 42400, 84.8],
  [{ ...base, copies: 10000 }, 248300, 24.83],
  [{ ...base, pages: 200 }, 138000, 69],
  [{ ...base, size: '1/4 Demy' }, 107000, 53.5],
  [{ ...base, size: '1/8 Crown' }, 70150, 35.075],
  [{ ...base, size: 'Royal' }, 104550, 52.275],
  [{ ...base, innerPaper: '100 GSM NS Maplitho' }, 77850, 38.925],
  [{ ...base, innerPaper: '130 GSM Art Paper' }, 91100, 45.55],
  [{ ...base, wrapperBoard: '170 GSM Art Paper' }, 69700, 34.85],
  [{ ...base, wrapperBoard: '250 GSM Art Board' }, 71500, 35.75],
  [{ ...base, binding: 'Saddle Stitch' }, 66700, 33.35],
  [{ ...base, binding: 'Side Pin' }, 66700, 33.35],
  [{ ...base, binding: 'Spiral' }, 66700, 33.35],
  [{ ...base, binding: 'Wire O' }, 66700, 33.35],
  [{ ...base, binding: 'Case Binding' }, 152700, 76.35],
  [{ pages: 320, copies: 5000, size: '1/4 Crown', innerColor: 'Black',
     innerPaper: '80 GSM NS Maplitho', wrapperBoard: '250 GSM Art Board', binding: 'Case Binding' }, 477050, 95.41],
];

for (const [input, total, perCopy] of cases) {
  const q = quote(input);
  assert.strictEqual(q.total, total, `total for ${JSON.stringify(input)}: got ${q.total}, want ${total}`);
  assert.ok(Math.abs(q.perCopy - perCopy) < 0.005, `perCopy for ${JSON.stringify(input)}: got ${q.perCopy}, want ${perCopy}`);
}
console.log(`${cases.length}/${cases.length} Excel-verified cases pass`);
