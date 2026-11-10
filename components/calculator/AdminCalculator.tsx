'use client';

// Admin price calculator with a spreadsheet feel: yellow cells take typing, Enter/Tab/arrows
// move, a block copied from Excel pastes in, and nothing goes live until Publish.
import { useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { publishRates } from '@/app/admin/actions';
import type { RateVersion } from '@/lib/rates';
import {
  quote, DEFAULT_RATES, COPIES_SLABS, QTY_COLS, PAPER_ROWS, BOARD_ROWS, CASE_PAGES, paperReam, paperFix, boardSheet,
  SIZES, INNER_COLORS, INNER_PAPERS, WRAPPER_TYPES, WRAPPER_BOARDS, BINDINGS,
  type RateCard, type QuoteInput, type QuoteResult,
} from '@/lib/offset-pricing';

type Draft = Record<string, string>;

const num = (v: string | number | undefined) => {
  const s = String(v ?? '').replace(/[₹,\s]/g, '');
  return s === '' ? NaN : Number(s);
};
const ok = (n: number) => Number.isFinite(n) && n > 0;
const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
const inr = (n: number, d = 0) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
const mround = (x: number, m: number) => Math.floor(x / m + 0.5) * m;
const wrapRate = (imp: number, base: number, step: number) => (imp <= 1000 ? base : base + Math.ceil((imp - 1000) / 500) * step);
const toDraft = (r: RateCard): Draft => Object.fromEntries(Object.keys(DEFAULT_RATES).map((k) => [k, String(r[k])]));
const toRates = (d: Draft): RateCard => Object.fromEntries(Object.entries(d).map(([k, v]) => [k, num(v)]));
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const PAPER_RULE = 'Feeds Rate per Ream and Rate_Fix. Rate_Fix is the ream rate rounded up to the next ₹100, plus ₹100.';
const BOARD_RULE = 'Feeds the Rate per Sheet guide only. Quotes use the orange Rate_Fix.';
const CASE_RULE = 'Rate per copy for books up to this many pages.';
// column -> [name, the sheet's rule shown in the formula bar]
const COLS: Record<string, [string, string]> = {
  blk: ['Inner Black', 'Rate per plate. Sheet rule: base, plus the step for each extra 1,000 copies, rounded to ₹25.'],
  col: ['Inner 4 Color', 'Rate per plate set. Sheet rule: base, plus the step for each extra 1,000 copies.'],
  ws: ['Wrapper printing, small sizes', 'Flat amount per run for 1/8 Demy, 1/8 Crown and A5. Sheet rule: base up to 1,000 impressions (copies ÷ 4), then the step for every further 500.'],
  wl: ['Wrapper printing, large sizes', 'Flat amount per run for 1/4 Demy, 1/4 Crown, Royal and A4. Sheet rule: base up to 1,000 impressions (copies ÷ 2), then the step for every further 500.'],
  ls: ['Lamination, 1/8 sizes', 'Rate per wrapper, single side, for 1/8 Demy and 1/8 Crown.'],
  ll: ['Lamination, other sizes', 'Rate per wrapper, single side, for A5 and every larger size.'],
  pf: ['Perfect binding', 'Rate per form, minimum 10 forms. Sheet rule: base × copies ÷ 1,000, and 75% of base up to 600 copies.'],
  ss: ['Saddle stitch / Side pin', 'Rate per copy, for 8 to 96 pages.'],
  sp: ['Spiral / Wire O', 'Rate per copy, for 16 to 196 pages. ₹1 per form is added on top.'],
  pw: ['width (cm)', PAPER_RULE], ph: ['height (cm)', PAPER_RULE], pk: ['rate per kg', PAPER_RULE],
  bw: ['width (cm)', BOARD_RULE], bh: ['height (cm)', BOARD_RULE], bk: ['rate per kg', BOARD_RULE],
  bf: ['Rate_Fix', 'Rate per board used in every quote. Typed by hand, as in the sheet.'],
  cs: ['small sizes', CASE_RULE], cl: ['large sizes', CASE_RULE],
};
// Columns that sit side by side in one table, in order — used for pasting a block
const TABLES: string[][] = [[...QTY_COLS], ['pw', 'ph', 'pk'], ['bw', 'bh', 'bk', 'bf'], ['cs', 'cl']];
// Columns the sheet derives from a base number
const FAMILY: Record<string, 'blk' | 'col' | 'wrap' | 'pf'> = { blk: 'blk', col: 'col', ws: 'wrap', wl: 'wrap', pf: 'pf' };

const label = (k: string) => {
  const [c, row] = k.split(':');
  const i = Number(row);
  const name = COLS[c][0];
  if (c === 'pw' || c === 'ph' || c === 'pk') return `${PAPER_ROWS[i].gsm} GSM ${PAPER_ROWS[i].quality}, ${PAPER_ROWS[i].group} · ${name}`;
  if (c[0] === 'b' && c !== 'blk') return `${BOARD_ROWS[i].gsm} GSM ${BOARD_ROWS[i].quality}, ${BOARD_ROWS[i].group} · ${name}`;
  if (c === 'cs' || c === 'cl') return `Case binding up to ${CASE_PAGES[i]} pages · ${name}`;
  return `${name} · ${COPIES_SLABS[i].toLocaleString('en-IN')} copies`;
};

const HDR = 'flex min-h-10 items-center border-r border-b border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold leading-tight text-slate-700';
const GRP = 'flex min-h-8 items-center justify-center border-r border-b border-slate-300 bg-slate-200 px-2 text-xs font-bold text-slate-900';
const LBL = 'flex h-7 items-center border-r border-b border-slate-300 bg-white px-2 text-slate-700';
const NUM = LBL + ' justify-end tabular-nums';
const BTN = 'min-h-10 rounded-md border border-slate-300 bg-white px-3.5 font-semibold text-slate-900 cursor-pointer disabled:cursor-default disabled:opacity-45';
const QTY_GRID = { gridTemplateColumns: '84px repeat(9, 104px)' };
const STOCK_GRID = { gridTemplateColumns: '64px 150px 92px 92px 92px 112px 104px 230px' };
const CASE_GRID = { gridTemplateColumns: '130px 150px 170px' };
const selectCls = 'w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer';

export function AdminCalculator({ published, versions }: { published: RateCard; versions: RateVersion[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<'quote' | 'db' | 'history'>('db');
  const [draft, setDraft] = useState<Draft>(() => toDraft(published));
  const [active, setActive] = useState('');
  const [fills, setFills] = useState({ blk: ['750', '175'], col: ['3000', '500'], wrap: ['3000', '500'], pf: ['500', ''] });
  const [showPublish, setShowPublish] = useState(false);
  const [toast, setToast] = useState('');
  const [undoN, setUndoN] = useState(0);
  const [pending, startTransition] = useTransition();
  const undo = useRef<Draft[]>([]);
  const editKey = useRef<string | null>(null); // cell whose typing already has an undo entry
  const start = useRef({ key: '', value: '' }); // value when the cell got focus, for Esc
  const [spec, setSpec] = useState<QuoteInput>({
    pages: 64, copies: 2000, size: '1/8 Crown', innerColor: 'Black', innerPaper: '70 GSM NS Maplitho',
    wrapperType: 'Normal', wrapperBoard: '300 GSM Art Board', binding: 'Wire O',
  });

  const changes = useMemo(() => Object.keys(draft).flatMap((k) => {
    const now = num(draft[k]);
    return !ok(now) || now !== published[k] ? [{ key: k, old: published[k], now, bad: !ok(now) }] : [];
  }), [draft, published]);
  const bad = changes.filter((c) => c.bad).length;
  const count = changes.length;
  const draftRates = useMemo(() => toRates(draft), [draft]);
  const safe = (r: RateCard): QuoteResult | null => { try { return quote(spec, r); } catch { return null; } };
  const liveQ = safe(published);
  const draftQ = safe(draftRates);

  const setCells = (next: Draft, typing = false, msg = '') => {
    const before: Draft = {};
    for (const k of Object.keys(next)) if (k in draft && draft[k] !== next[k]) before[k] = draft[k];
    const keys = Object.keys(before);
    if (!keys.length) return;
    if (!(typing && editKey.current === keys[0])) {
      undo.current.push(before);
      editKey.current = typing ? keys[0] : null;
    }
    setDraft({ ...draft, ...Object.fromEntries(keys.map((k) => [k, next[k]])) });
    setUndoN(undo.current.length);
    setToast(msg);
  };
  const undoLast = () => {
    const u = undo.current.pop();
    if (!u) return;
    editKey.current = null;
    setDraft({ ...draft, ...u });
    setUndoN(undo.current.length);
  };
  const discard = () => { undo.current = []; setUndoN(0); setDraft(toDraft(published)); setToast('Changes discarded.'); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const [col, row] = (el.dataset.cell ?? '').split(':');
    const go = (t: Element | null | undefined) => { if (t instanceof HTMLElement) { e.preventDefault(); t.focus(); } };
    if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const up = e.key === 'ArrowUp' || (e.key === 'Enter' && e.shiftKey);
      go(document.querySelector(`[data-cell="${col}:${Number(row) + (up ? -1 : 1)}"]`));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Move across only when the whole value is selected or the caret is at that edge
      const len = el.value.length, a = el.selectionStart, b = el.selectionEnd, left = e.key === 'ArrowLeft';
      if (!((a === 0 && b === len) || (left ? a === 0 && b === 0 : a === len && b === len))) return;
      const cells = Array.from(el.closest('[data-row]')?.querySelectorAll('input[data-cell]') ?? []);
      go(cells[cells.indexOf(el) + (left ? -1 : 1)]);
    } else if (e.key === 'Escape' && start.current.key === el.dataset.cell) {
      setCells({ [start.current.key]: start.current.value });
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const id = (e.target as HTMLElement).dataset?.cell;
    if (!id) return;
    const text = e.clipboardData.getData('text');
    const lines = text.replace(/\r/g, '').split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    if (lines.length < 2 && !text.includes('\t')) return; // a single value pastes normally
    e.preventDefault();
    const [col, row] = id.split(':');
    const order = TABLES.find((t) => t.includes(col)) ?? [col];
    const next: Draft = {};
    lines.forEach((line, r) => line.split('\t').forEach((v, c) => {
      const target = order[order.indexOf(col) + c];
      if (target) next[`${target}:${Number(row) + r}`] = v.replace(/[₹,\s]/g, '');
    }));
    setCells(next, false, `Pasted ${plural(lines.length, 'row', 'rows')}.`);
  };

  const fam = FAMILY[active.split(':')[0]];
  const fillColumn = () => {
    if (!fam) return;
    const B = num(fills[fam][0]), S = num(fills[fam][1]);
    if (!ok(B) || (fam !== 'pf' && !(S >= 0))) { setToast('Enter the base and the step as numbers first.'); return; }
    const r2 = (x: number) => String(Math.round(x * 100) / 100);
    const next: Draft = {};
    COPIES_SLABS.forEach((c, i) => {
      if (fam === 'blk') next[`blk:${i}`] = r2(c <= 1000 ? B : mround(B + (c / 1000 - 1) * S, 25));
      else if (fam === 'col') next[`col:${i}`] = r2(c <= 1000 ? B : B + (c / 1000 - 1) * S);
      else if (fam === 'wrap') { next[`ws:${i}`] = r2(wrapRate(c / 4, B, S)); next[`wl:${i}`] = r2(wrapRate(c / 2, B, S)); }
      else next[`pf:${i}`] = r2(c <= 600 ? mround(B * 0.75, 25) : c <= 1000 ? B : (B * c) / 1000);
    });
    setCells(next, false, 'Filled from the base. Any cell can still be typed over.');
  };

  const publish = () => startTransition(async () => {
    const res = await publishRates(draftRates, plural(count, 'cell changed', 'cells changed'));
    setShowPublish(false);
    if (res.error) { setToast(`Not published: ${res.error}`); return; }
    undo.current = [];
    setUndoN(0);
    setDraft(toDraft(draftRates));
    setToast('Published. Both calculators now use these rates.');
    router.refresh();
  });

  const cell = (k: string, orange = false) => {
    const n = num(draft[k]);
    const good = ok(n);
    const changed = good && n !== published[k];
    const bg = !good ? 'bg-red-200 font-bold' : changed ? 'bg-blue-200 font-bold' : orange ? 'bg-[#FFB84D]' : 'bg-[#FFF066]';
    return (
      <input
        key={k} type="text" data-cell={k} aria-label={label(k)} value={draft[k]}
        onChange={(e) => setCells({ [k]: e.target.value }, true)}
        onFocus={(e) => { editKey.current = null; start.current = { key: k, value: e.target.value }; e.target.select(); setActive(k); }}
        onKeyDown={onKey}
        className={`h-7 w-full min-w-0 rounded-none border-0 border-r border-b border-slate-300 px-2 text-right tabular-nums text-slate-900 focus:relative focus:z-10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#107c41] ${bg}`}
      />
    );
  };

  const stockRows = (kind: 'paper' | 'board') => (kind === 'paper' ? PAPER_ROWS : BOARD_ROWS).map((row, i) => {
    const p = kind === 'paper' ? 'p' : 'b';
    const w = num(draft[`${p}w:${i}`]), h = num(draft[`${p}h:${i}`]), kg = num(draft[`${p}k:${i}`]);
    const good = ok(w) && ok(h) && ok(kg);
    const fix = good ? paperFix(paperReam(w, h, row.gsm, kg)) : NaN;
    const liveFix = paperFix(paperReam(published[`pw:${i}`], published[`ph:${i}`], row.gsm, published[`pk:${i}`]));
    return (
      <div key={i} data-row className="grid" style={STOCK_GRID}>
        <div className={NUM}>{row.gsm}</div>
        <div className={LBL}>{row.quality}</div>
        {cell(`${p}w:${i}`)}{cell(`${p}h:${i}`)}{cell(`${p}k:${i}`)}
        <div className={NUM}>{!good ? '—' : fmt(kind === 'paper' ? paperReam(w, h, row.gsm, kg) : boardSheet(w, h, row.gsm, kg))}</div>
        {kind === 'paper'
          ? <div className={`${NUM} font-bold text-slate-900 ${good && fix !== liveFix ? '!bg-blue-200' : '!bg-[#FFB84D]'}`}>{good ? fmt(fix) : '—'}</div>
          : cell(`bf:${i}`, true)}
        <div className={LBL}>{row.sizes}</div>
      </div>
    );
  });
  const stockHead = (rateName: string) => (
    <div className="grid" style={STOCK_GRID}>
      {['GSM', 'Paper Quality', 'Width (cm)', 'Height (cm)', 'Rate per kg', rateName, 'Rate_Fix', 'Applicable for book sizes'].map((h) => <div key={h} className={HDR}>{h}</div>)}
    </div>
  );

  const quoteLines: [string, keyof QuoteResult, number, string][] = [
    ['Plate & Printing', 'printing', 0, ''], ['Wrapper Printing', 'wrapperPrinting', 0, ''], ['Lamination', 'lamination', 0, ''],
    ['Binding', 'binding', 0, ''], ['Inner Paper', 'innerPaper', 0, ''], ['Wrapper Paper/Board', 'board', 0, ''],
    ['Subtotal', 'subtotal', 0, 'sum'], ['GST 18%', 'gst', 0, ''], ['TOTAL', 'total', 0, 'total'], ['Unit Rate (per copy)', 'perCopy', 2, ''],
  ];
  const tabCls = (t: typeof tab) => `min-h-[42px] px-4 cursor-pointer ${tab === t ? 'bg-white font-bold text-[#107c41] shadow-[inset_0_3px_0_#107c41]' : 'font-medium text-slate-700'}`;
  const status = bad ? `${plural(bad, 'cell is', 'cells are')} not a valid number. Fix before publishing.`
    : count ? `${plural(count, 'unpublished change', 'unpublished changes')}. Customers still see the published rates.`
    : versions.length ? `All rates are live. Version ${versions[0].id}.` : 'All rates are live: the built-in rates from the pricing sheet.';

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-[13px] text-slate-900">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-2.5 border-b border-slate-200 px-5 py-3.5">
        <div className="mr-auto min-w-[220px]">
          <h1 className="text-lg font-bold">Price Calculator</h1>
          <p className={`text-[12.5px] font-medium ${bad ? 'text-red-800' : count ? 'text-blue-700' : 'text-slate-600'}`}>{status}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-slate-700">
          {[['bg-[#FFF066]', 'Type here'], ['bg-[#FFB84D]', 'Rate_Fix'], ['bg-blue-200', 'Changed, not published'], ['bg-white', 'Calculated or locked']].map(([bg, text]) => (
            <span key={text} className="inline-flex items-center gap-1.5"><span aria-hidden className={`inline-block h-3.5 w-3.5 border border-slate-400 ${bg}`} />{text}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={BTN} disabled={!undoN} onClick={undoLast}>Undo</button>
          <button type="button" className={BTN} disabled={!count} onClick={discard}>Discard changes</button>
          <button type="button" disabled={!count || bad > 0 || pending} onClick={() => setShowPublish(true)}
            className="min-h-10 rounded-md border border-[#c2760a] bg-[#f29a1b] px-4 font-bold text-stone-900 cursor-pointer disabled:cursor-default disabled:opacity-45">
            {count ? `Publish ${plural(count, 'change', 'changes')}` : 'Publish'}
          </button>
        </div>
      </header>

      {tab === 'db' && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-slate-200 bg-slate-50 px-5 py-2">
          <div className="flex min-h-8 min-w-[250px] items-center border border-slate-300 bg-white px-2.5 font-semibold">{active ? label(active) : 'No cell selected'}</div>
          <span aria-hidden className="font-serif text-[15px] italic text-slate-600">fx</span>
          <div className="min-w-0 flex-[1_1_280px] text-slate-700">
            {active ? COLS[active.split(':')[0]][1] : 'Click a yellow cell and type. Enter moves down, Tab and the arrow keys move across, and a block copied from Excel can be pasted in.'}
          </div>
          {fam && (<>
            {[fam === 'pf' ? 'Base ₹ per 1,000 copies' : 'Base ₹', fam === 'wrap' ? 'Step ₹ per 500 impressions' : 'Step ₹ per extra 1,000'].map((text, i) => (fam === 'pf' && i === 1 ? null : (
              <label key={text} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">{text}
                <input type="text" value={fills[fam][i]} onChange={(e) => setFills({ ...fills, [fam]: fills[fam].map((v, j) => (j === i ? e.target.value : v)) })}
                  className="h-8 w-[84px] rounded border border-slate-400 bg-white px-2 text-right" />
              </label>
            )))}
            <button type="button" onClick={fillColumn} className="min-h-8 rounded border border-[#107c41] bg-white px-3 font-semibold text-[#107c41] cursor-pointer">
              {fam === 'wrap' ? 'Fill both wrapper columns' : 'Fill column'}
            </button>
          </>)}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-auto" onPaste={onPaste}>
        {/* Costing Database: kept mounted so scroll position and focus survive tab switches */}
        <div className={tab === 'db' ? 'space-y-8 px-5 pt-4 pb-9' : 'hidden'}>
          <section>
            <h2 className="mb-2 font-bold">Rates by quantity</h2>
            <div className="w-[1020px] border-l border-t border-slate-300">
              <div className="sticky top-0 z-20">
                <div className="grid" style={QTY_GRID}>
                  <div className={GRP} />
                  <div className={`${GRP} col-span-2`}>Inner Offset Printing</div>
                  <div className={`${GRP} col-span-2`}>Wrapper Printing</div>
                  <div className={`${GRP} col-span-2`}>Lamination</div>
                  <div className={`${GRP} col-span-3`}>Binding</div>
                </div>
                <div className="grid" style={QTY_GRID}>
                  {['Copies', 'Black', '4 Color', 'Small sizes', 'Large sizes', '1/8 sizes', 'Other sizes', 'Perfect, per form', 'Saddle / Side Pin', 'Spiral / Wire O'].map((h) => <div key={h} className={HDR}>{h}</div>)}
                </div>
              </div>
              {COPIES_SLABS.map((c, i) => (
                <div key={c} data-row className="grid" style={QTY_GRID}>
                  <div className={`${NUM} !bg-slate-50 font-semibold`}>{c.toLocaleString('en-IN')}</div>
                  {QTY_COLS.map((col) => cell(`${col}:${i}`))}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-bold">Inner Paper for Printing</h2>
            <p className="mb-2 text-xs text-slate-600">Quotes use Rate_Fix: the ream rate rounded up to the next ₹100, plus ₹100.</p>
            <div className="w-[936px] border-l border-t border-slate-300">{stockHead('Rate per Ream')}{stockRows('paper')}</div>
          </section>

          <section>
            <h2 className="font-bold">Wrapper Paper / Board</h2>
            <p className="mb-2 text-xs text-slate-600">Quotes use the Rate_Fix you type. Rate per Sheet is a guide only.</p>
            <div className="w-[936px] border-l border-t border-slate-300">{stockHead('Rate per Sheet')}{stockRows('board')}</div>
          </section>

          <section>
            <h2 className="font-bold">Case Binding</h2>
            <p className="mb-2 text-xs text-slate-600">Rate per copy. Minimum 64 pages.</p>
            <div className="w-[450px] border-l border-t border-slate-300">
              <div className="grid" style={CASE_GRID}>
                {['Pages', '1/8 Demy, 1/8 Crown, A5', '1/4 Demy, 1/4 Crown, A4, Royal'].map((h) => <div key={h} className={HDR}>{h}</div>)}
              </div>
              {CASE_PAGES.map((pg, i) => (
                <div key={pg} data-row className="grid" style={CASE_GRID}>
                  <div className={LBL}>Up to {pg.toLocaleString('en-IN')}</div>
                  {cell(`cs:${i}`)}{cell(`cl:${i}`)}
                </div>
              ))}
            </div>
          </section>
        </div>

        {tab === 'quote' && (
          <div className="flex flex-wrap items-start gap-7 px-5 pt-5 pb-9">
            <section className="grid max-w-[460px] flex-[1_1_320px] grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-slate-600">Pages</span>
                <select value={spec.pages} onChange={(e) => setSpec({ ...spec, pages: Number(e.target.value) })} className={selectCls}>
                  {Array.from({ length: 186 }, (_, i) => 16 + i * 8).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="block space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-slate-600">Copies</span>
                <select value={spec.copies} onChange={(e) => setSpec({ ...spec, copies: Number(e.target.value) })} className={selectCls}>
                  {COPIES_SLABS.map((s) => <option key={s} value={s}>{s.toLocaleString('en-IN')}</option>)}
                </select>
              </label>
              {([['Size', 'size', SIZES], ['Inner Color', 'innerColor', INNER_COLORS], ['Inner Paper', 'innerPaper', INNER_PAPERS],
                ['Wrapper Type', 'wrapperType', WRAPPER_TYPES], ['Wrapper Quality', 'wrapperBoard', WRAPPER_BOARDS], ['Binding', 'binding', BINDINGS]] as const).map(([text, field, options]) => (
                <label key={field} className="block space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-slate-600">{text}</span>
                  <select value={spec[field]} onChange={(e) => setSpec({ ...spec, [field]: e.target.value } as QuoteInput)} className={selectCls}>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              ))}
            </section>
            <section className="max-w-[580px] flex-[1_1_420px]">
              <div className="border border-slate-300">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-slate-300 bg-slate-100 text-xs font-semibold text-slate-700">
                  <div className="px-3 py-2" /><div className="px-3 py-2 text-right">Live on website</div><div className="px-3 py-2 text-right">With your changes</div>
                </div>
                {quoteLines.map(([name, field, d, kind]) => {
                  const a = liveQ?.[field], b = draftQ?.[field];
                  const differs = a != null && b != null && a !== b;
                  return (
                    <div key={field} className={`grid grid-cols-[1.4fr_1fr_1fr] border-b border-slate-200 ${kind === 'total' ? 'bg-slate-900 font-bold text-white' : kind === 'sum' ? 'bg-slate-100 font-bold' : ''}`}>
                      <div className="px-3 py-2">{name}</div>
                      <div className="px-3 py-2 text-right tabular-nums">{a == null ? '—' : inr(a, d)}</div>
                      <div className={`px-3 py-2 text-right tabular-nums ${differs ? (kind === 'total' ? 'font-bold text-blue-200' : 'font-bold text-blue-700') : ''}`}>{b == null ? '—' : inr(b, d)}</div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2.5 text-[12.5px] text-slate-600">
                {!liveQ ? 'This combination is not on the rate card.' : !draftQ ? 'A changed cell is not a valid number, so the right-hand column cannot be worked out.'
                  : count ? 'The right-hand column uses your unpublished rates.' : 'Nothing is unpublished, so both columns match.'}
              </p>
            </section>
          </div>
        )}

        {tab === 'history' && (
          <div className="max-w-[720px] px-5 pt-5 pb-9">
            {!versions.length && <p className="text-slate-700">Nothing has been published yet. The site is using the built-in rates from the pricing sheet.</p>}
            {versions.map((v, i) => (
              <div key={v.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200 py-3">
                <div className="min-w-0 flex-[1_1_260px]">
                  <div className="font-bold">Version {v.id} {i === 0 && <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-900">Live on the website</span>}</div>
                  <div className="text-xs text-slate-600">
                    {new Date(v.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}{v.note ? ` · ${v.note}` : ''}
                  </div>
                </div>
                <button type="button" className={BTN} onClick={() => { setCells(toDraft(v.rates), false, `Version ${v.id} loaded as unpublished changes. Publish to make it live.`); setTab('db'); }}>Load into editor</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-stretch gap-x-1 border-t border-slate-300 bg-slate-100 px-3">
        <button type="button" className={tabCls('quote')} onClick={() => setTab('quote')}>Quotation</button>
        <button type="button" className={tabCls('db')} onClick={() => setTab('db')}>Costing Database</button>
        <button type="button" className={tabCls('history')} onClick={() => setTab('history')}>History</button>
        <span aria-live="polite" className="ml-auto self-center px-2 py-1.5 text-[12.5px] font-medium text-green-900">{toast}</span>
      </div>

      {showPublish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-5">
          <section aria-labelledby="pub-title" className="flex max-h-[86vh] w-full max-w-[640px] flex-col gap-3.5 overflow-auto rounded-xl bg-white p-6">
            <h2 id="pub-title" className="text-[17px] font-bold">Publish {plural(count, 'change', 'changes')}?</h2>
            <p className="text-slate-700">Customers and the Quotation tab switch to these rates as soon as you publish. The current version is kept, so you can go back.</p>
            <div className="border-t border-slate-200">
              {changes.map((c) => (
                <div key={c.key} className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-200 py-2">
                  <span className="min-w-0 flex-[1_1_240px]">{label(c.key)}</span>
                  <span className="tabular-nums text-slate-600">{fmt(c.old)}</span><span aria-hidden className="text-slate-600">→</span>
                  <span className="font-bold tabular-nums text-blue-700">{fmt(c.now)}</span>
                  {Math.abs(c.now - c.old) / c.old > 0.3 && <span className="rounded bg-amber-200 px-2 py-0.5 text-[11.5px] font-bold text-amber-900">Large change</span>}
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-slate-100 px-3.5 py-3">
              <div className="text-xs font-semibold text-slate-700">
                Check quote: {spec.pages} pages · {spec.copies.toLocaleString('en-IN')} copies · {spec.size} · {spec.innerColor} · {spec.innerPaper} · {spec.wrapperType} · {spec.wrapperBoard} · {spec.binding}
              </div>
              <div className="mt-1.5 text-base font-bold tabular-nums">
                {liveQ ? inr(liveQ.total) : '—'} <span aria-hidden className="text-slate-600">→</span> <span className="text-blue-700">{draftQ ? inr(draftQ.total) : '—'}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className={BTN} onClick={() => setShowPublish(false)}>Cancel</button>
              <button type="button" disabled={pending} onClick={publish} className="min-h-10 rounded-md border border-[#c2760a] bg-[#f29a1b] px-4 font-bold text-stone-900 cursor-pointer disabled:opacity-45">
                {pending ? 'Publishing…' : 'Publish now'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
