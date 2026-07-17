// Self-check for the offset pricing engine. Run: npx tsx lib/offset-pricing.test.ts
// Expected values come from live Excel recalculation of the owner's FINAL workbook
// (sheet id 1rbZzX3uoE8KLf0JplTek07E1oG9j8WpGt8-G7irqdm8, 2026-07-17): a 125-combo
// COM sweep matched the engine exactly on every cost line, subtotal, GST, total
// and per-copy price. The cases below were each individually Excel-confirmed.
import { strict as assert } from 'node:assert';
import { quote, snapToSlab, type QuoteInput } from './offset-pricing';

type Case = [QuoteInput, [number, number, number, number, number, number, number, number, number]];
const q = (pages: number, copies: number, size: string, innerColor: string, innerPaper: string,
  wrapperType: string, wrapperBoard: string, binding: string): QuoteInput =>
  ({ pages, copies, size, innerColor, innerPaper, wrapperType, wrapperBoard, binding } as QuoteInput);

// expected: [printing, wrapperPrinting, lamination, binding, innerPaper, board, subtotal, gst, total]
const CASES: Case[] = [
  // anchor — also matches Google Sheets' own cached computation
  [q(232, 600, 'A4', 'Black', '130 GSM Art Paper', 'Normal', '250 GSM Art Board', 'Case Binding'),
    [21750, 3000, 1500, 42000, 64950, 3000, 136200, 24516, 160716]],
  // spiral/wire-o: flat ₹20/copy + ₹1/form at every slab (final sheet fixed the old lookup bug)
  [q(96, 300, '1/8 Demy', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Spiral'),
    [4500, 3000, 600, 7800, 3850, 1000, 20750, 3735, 24485]],
  [q(96, 500, 'Royal', '4 Color', '100 GSM Art Paper', 'Flap', '300 GSM Art Board', 'Wire O'),
    [72000, 3000, 1250, 13000, 12250, 5400, 106900, 19242, 126142]],
  [q(96, 600, '1/8 Crown', 'Black', '70 GSM White Maplitho', 'Normal', '170 GSM Art Paper', 'Spiral'),
    [4500, 3000, 1200, 15600, 5050, 1250, 30600, 5508, 36108]],
  [q(96, 750, 'A4', '4 Color', '130 GSM Art Paper', 'Flap', '250 GSM Art Board', 'Wire O'),
    [72000, 3000, 1900, 19500, 32650, 6400, 135450, 24381, 159831]],
  [q(96, 1000, 'A5', 'Black', '80 GSM White Maplitho', 'Normal', '250 GSM Art Board', 'Spiral'),
    [4500, 3000, 2000, 26000, 13200, 2650, 51350, 9243, 60593]],
  [q(160, 4000, '1/4 Crown', '4 Color', '100 GSM White Maplitho', 'Flap', '170 GSM Art Paper', 'Wire O'),
    [180000, 4000, 8000, 120000, 139400, 20500, 471900, 84942, 556842]],
  [q(160, 4500, '1/4 Demy', 'Black', '80 GSM NS Maplitho', 'Normal', '300 GSM Art Board', 'Spiral'),
    [27500, 4500, 9000, 135000, 174800, 25850, 376650, 67797, 444447]],
  // perfect binding: 10-form floor, .5-form MROUND tie, max run
  [q(64, 300, '1/8 Demy', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Perfect Binding'),
    [3000, 3000, 600, 4150, 2550, 1000, 14300, 2574, 16874]],
  [q(168, 1000, 'A5', '4 Color', '100 GSM White Maplitho', 'Flap', '250 GSM Art Board', 'Perfect Binding'),
    [63000, 3000, 2000, 6000, 28900, 4500, 107400, 19332, 126732]],
  [q(952, 10000, 'A4', '4 Color', '130 GSM Art Paper', 'Flap', '300 GSM Art Board', 'Perfect Binding'),
    [1785000, 7000, 18000, 305000, 3846100, 111100, 6072200, 1092996, 7165196]],
  // case binding page thresholds
  [q(504, 300, '1/8 Crown', 'Black', '80 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Case Binding'),
    [24000, 3000, 600, 18000, 17650, 900, 64150, 11547, 75697]],
  [q(512, 300, '1/4 Crown', 'Black', '100 GSM Art Paper', 'Normal', '170 GSM Art Paper', 'Case Binding'),
    [48000, 3000, 750, 24000, 43500, 1250, 120500, 21690, 142190]],
  [q(752, 5000, 'Royal', '4 Color', '100 GSM White Maplitho', 'Flap', '250 GSM Art Board', 'Case Binding'),
    [940000, 4500, 10000, 400000, 815000, 35700, 2205200, 396936, 2602136]],
  [q(760, 500, 'A5', 'Black', '70 GSM NS Maplitho', 'Normal', '300 GSM Art Board', 'Case Binding'),
    [36000, 3000, 1250, 45000, 51300, 2550, 139100, 25038, 164138]],
  [q(952, 2500, '1/4 Demy', '4 Color', '80 GSM White Maplitho', 'Flap', '300 GSM Art Board', 'Case Binding'),
    [892500, 3500, 5000, 250000, 587850, 28600, 1767450, 318141, 2085591]],
  // lamination/wrapper/saddle slab boundaries; A5 laminates on the large-size table
  [q(80, 750, 'A4', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Saddle Stitch'),
    [7500, 3000, 1900, 3000, 15300, 2650, 33350, 6003, 39353]],
  [q(80, 1000, 'Royal', 'Black', '70 GSM White Maplitho', 'Normal', '170 GSM Art Paper', 'Side Pin'),
    [7500, 3000, 2000, 4000, 13200, 3000, 32700, 5886, 38586]],
  [q(80, 5000, '1/4 Demy', '4 Color', '100 GSM Art Paper', 'Flap', '250 GSM Art Board', 'Saddle Stitch'),
    [100000, 4500, 10000, 10000, 117300, 38250, 280050, 50409, 330459]],
  [q(80, 5500, '1/4 Crown', 'Black', '80 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Side Pin'),
    [15500, 5000, 9900, 11000, 78400, 14250, 134050, 24129, 158179]],
  [q(88, 9500, '1/8 Demy', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Saddle Stitch'),
    [13500, 4500, 19000, 19000, 84500, 13650, 154150, 27747, 181897]],
  [q(88, 10000, '1/8 Crown', '4 Color', '80 GSM White Maplitho', 'Flap', '300 GSM Art Board', 'Side Pin'),
    [82500, 4500, 15000, 20000, 77750, 45900, 245650, 44217, 289867]],
  [q(88, 750, 'A5', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Saddle Stitch'),
    [4500, 3000, 1900, 3000, 8400, 1600, 22400, 4032, 26432]],
  [q(88, 10000, 'A5', 'Black', '70 GSM NS Maplitho', 'Normal', '170 GSM Art Paper', 'Saddle Stitch'),
    [13950, 4500, 18000, 20000, 100000, 14300, 170750, 30735, 201485]],
];

for (const [input, [printing, wrapperPrinting, lamination, binding, innerPaper, board, subtotal, gst, total]] of CASES) {
  const r = quote(input);
  const id = JSON.stringify(input);
  assert.equal(r.printing, printing, `printing ${id}`);
  assert.equal(r.wrapperPrinting, wrapperPrinting, `wrapperPrinting ${id}`);
  assert.equal(r.lamination, lamination, `lamination ${id}`);
  assert.equal(r.binding, binding, `binding ${id}`);
  assert.equal(r.innerPaper, innerPaper, `innerPaper ${id}`);
  assert.equal(r.board, board, `board ${id}`);
  assert.equal(r.subtotal, subtotal, `subtotal ${id}`);
  assert.ok(Math.abs(r.gst - gst) < 0.005, `gst ${id}: ${r.gst} != ${gst}`);
  assert.ok(Math.abs(r.total - total) < 0.005, `total ${id}: ${r.total} != ${total}`);
  assert.ok(Math.abs(r.perCopy - total / input.copies) < 1e-9, `perCopy ${id}`);
}

// Non-slab copies are not quotable
assert.throws(() => quote(q(96, 400, 'A4', 'Black', '130 GSM Art Paper', 'Normal', '250 GSM Art Board', 'Perfect Binding')));
// Case Binding rate card tops out at 2000 pages (the sheet errors above it too)
assert.throws(() => quote(q(2008, 500, 'A4', 'Black', '130 GSM Art Paper', 'Normal', '250 GSM Art Board', 'Case Binding')));

assert.equal(snapToSlab(1), 300);
assert.equal(snapToSlab(649), 600);
assert.equal(snapToSlab(99999), 10000);

console.log(`OK — ${CASES.length} Excel-verified cases + error handling checks passed`);
