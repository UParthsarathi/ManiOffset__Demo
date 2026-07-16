# FeelThePRINT — Optimized Keyword Map

Source: owner's `Keywords - FeelThePRINT.com.xlsx` (7 sheets, ~1,250 raw rows) cleaned down per current Google policies (spam policy: keyword stuffing; helpful-content system).
Business location: **Chennai (Vanagaram, 600077)** — NOT Sivakasi. Volumes shown are monthly searches from the owner's sheet.

## Rules (apply to every page and every rewritten doc)

1. **One primary keyword per page.** It appears in: `<title>`, H1, first ~100 words, and meta description — once each, naturally. Never twice in one sentence.
2. **Secondary keywords** appear once or twice in body/H2s only where the sentence would make sense without SEO. Use natural variants, not exact-match repetition.
3. **Never write "near me" in copy.** "Near me" queries are won by the Google Business Profile + LocalBusiness schema (already fixed in `lib/seo.ts`) + city mentioned naturally ("our Chennai plant"). Writing "near me" in a sentence is a spam signal.
4. **No bold-highlighting of keywords** in page copy (the owner docs bold them — remove all of it).
5. **Informational questions** ("what is X", "X size") go into an FAQ/definition section on the page — they earn featured snippets and are the highest-volume terms in the sheet. Answer them genuinely.
6. **No city names we don't operate in** (Delhi/Mumbai/Bangalore…): phrase as "delivered across India" instead.
7. Two page pairs share topics — keyword split is mandatory to avoid cannibalization (marked ⚠ below).

## Site-level (home `/`, `/products`)

| Target | Keyword | Vol | Where |
|---|---|---|---|
| Primary (home) | offset printing company in chennai | — | title (done), H1, intro |
| Secondary | offset printing | 9,900 | home body |
| Secondary | commercial printing / printing services | 8,100 | home body |
| Secondary | printing press | 22,200 | naturally in copy |
| Secondary | book printing | 5,400 | home + /products |
| FAQ (/press pages) | what is offset printing / offset define | 22,200 | /press/process |
| FAQ (/press pages) | types of printing | 8,100 | /press/options |
| FAQ (/press pages) | cmyk vs rgb for printing, what is dpi | 320 ea | /press/pre-press |

## Product pages (`/product/[id]`) — one row per owner doc

| # | Page (id) | Primary keyword | Secondary (top picks) | FAQ / definition targets |
|---|---|---|---|---|
| 1 | Softcover Books (1) | paperback book printing | softcover book printing; paperback binding (170); book printing online (1.9k) | paperback meaning (22.2k); paperback vs hardcover (6.6k) |
| 2 | Hardcover Books (2) | hardcover book printing (260) | hardbound book binding (590); hardback book (3.6k) | hardcover vs softcover (14.8k); why hardcover books are expensive |
| 3 | Magazines & Journals (3) | magazine printing | magazine printing online (1k); custom magazine (590); journal printing (390) | magazine size (1k); magazine paper material (1.3k) |
| 4 | Comics & Graphic Novels (4) | comic book printing | graphic novel printing; comics story book (720) | comic book vs graphic novel; how to make a comic book (1.9k) |
| 5 | Religious & Spiritual Books (5) | religious book printing | spiritual books (5.4k)*; bhagavad gita / quran / bible printing as natural mentions | types of religious books |
| 6 | Textbooks & Educational (6) | textbook printing services (320) | educational book printing; educational books (2.9k) | — |
| 7 | School/College Notebooks (7) | notebook printing (480) | custom notebook printing (320); wholesale notebook printing | notebook print size |
| 8 | Academic Diaries & Planners (8) ⚠ | school diary printing | student planner (480); study planner (8.1k); exam planner (590); 10th class diary (4.4k) | how to make a diary (1.3k) |
| 9 | Record Books & Lab Manuals (9) | record book printing | lab manual printing; practical record book | — (no sheet data; low competition, exact intent) |
| 10 | Forms, Answer Sheets, Exam Booklets (10) ⚠ | answer sheet printing | exam booklet printing; exam paper printing | — ("application form" 74k = intent mismatch, dropped) |
| 11 | Report Cards & Marksheets (11) ⚠ | marksheet printing service (10) | report card printing (30); school certificate printing | — (generic "certificate printing" belongs to #23) |
| 12 | Educational & Kids Charts (12) | educational chart printing | educational chart (1.6k); alphabet charts for classroom (320); wall chart printing | — |
| 13 | Flyers, Leaflets, Pamphlets (13) | pamphlet printing (4.4k) | flyer printing (1.3k); leaflet printing (590); bulk pamphlet printing | leaflet vs pamphlet vs brochure (260); pamphlet size (3.6k); flyer size (2.9k); pamphlet printing cost (880) |
| 14 | Brochures & Booklets (14) ⚠ | brochure printing (1.6k) | booklet printing; tri fold brochure (3.6k); saddle stitch booklet (590); custom booklets (1k) | brochure size (3.6k); booklet vs brochure; brochure fold types |
| 15 | Product Catalogues (15) | catalogue printing (880) | product catalogue (5.4k); wholesale catalogue (590); catalogue printing services | catalogue size (480) |
| 16 | Monthly Wall Calendars (16) | calendar printing (3.6k) | wall calendar printing (140); monthly calendar printing (170); bulk calendar printing; **calendar printing in chennai (140)** | calendar printing cost (110) |
| 17 | Invitation Cards (17) | invitation card printing | corporate event invitation card (140); retirement event invitation (3.6k); sports event invitation card (170) | event invitation size |
| 18 | Postcards (18) | postcard printing (590) | bulk postcard printing; business postcard printing | postcard size (8.1k); what is a postcard (1.3k) |
| 19 | Visiting Cards (19) | visiting card printing (9.9k) | business card printing; premium visiting cards (1.3k); visiting card types (720); **visiting cards chennai (170)** | visiting card size (40.5k!); visiting card size in inches (6.6k); visiting card vs business card |
| 20 | Letterheads & Envelopes (20) | letterhead printing (1.3k) | envelope printing (2.4k); letterpad printing (1.3k); envelope name printing | letterhead paper size (170); envelope sizes (8.1k) |
| 21 | Business Diaries & Planners (21) ⚠ | diary printing (1k) | corporate diary printing (50); executive diary (1.3k); customised diary printing (590); new year diary printing (110); bulk diary printing | A5 diary size (720+880) |
| 22 | Company Folders (22) | corporate folder printing (40) | presentation folder printing; company folder; file cover design (5.4k)* | company folder size |
| 23 | Certificates & Award Cards (23) ⚠ | certificate printing (1.9k) | paper certificate printing (880); online certificate printing (480); **certificate printing chennai (40)** | certificate printing cost (260); certificate paper size A4 (140) |
| 24 | Passbooks (24) | passbook printing (880) | bank passbook (9.9k)*; passbook binding | passbook meaning (1.6k); types of passbooks |
| 25 | Challans & Deposit Slips (25) | deposit slip printing | bank challan printing (challan 1.9k); cheque deposit slip (2.9k)* | — |
| 26 | Banking Forms (26) | banking forms printing | bank form (2.9k)*; multi-part carbonless forms | — |

`*` = high volume but mixed intent (people searching to *use/buy* the item, not to print it). Mention once naturally; do not build the page around it.

### ⚠ Cannibalization splits
- **Diaries:** student/school/academic diary terms → page 8; generic "diary printing" + corporate/executive/new-year → page 21.
- **Certificates:** marksheets, report cards, school results → page 11; "certificate printing" + awards/corporate → page 23.
- **Booklets:** exam booklets → page 10; marketing booklets/saddle-stitch → page 14.
- **Planners:** study/exam planners → page 8; business/corporate planners → page 21.

## Local SEO (covers ALL "near me" keywords — ~200 rows of the sheet)

- Google Business Profile: name "FeelThePRINT", category *Offset printing service / Commercial printer*, address 115, 4A-1, Noombal Main Rd, Mahalakshmi Nagar, Vanagaram, Chennai 600077, phone +91 94444 09824 — keep identical everywhere (NAP consistency).
- `LocalBusiness` schema in `lib/seo.ts` — ✅ corrected (Chennai geo 13.0554668, 80.1424155).
- Mention "Chennai" naturally once per page (e.g., "printed at our Chennai facility, delivered across India").

## Dropped from the sheet (do not use)

| Group | Examples | Reason |
|---|---|---|
| Competitor brands | rathna/shubham/eagle/five star/all time offset printers, office depot | Targeting competitor names = irrelevant + spammy |
| Sivakasi terms | printers in sivakasi, diary printing sivakasi, calendar printing press in sivakasi | Wrong location — business is in Chennai |
| Foreign geo | johannesburg, durban, cape town, malta, lesotho, malawi, karachi, lahore, colombo, dubai, uk, australia, china | Not the market |
| Other-city terms | diary printing in delhi/mumbai/bangalore/jaipur/... | No presence there; use "across India" phrasing. Revisit only if owner wants city landing pages |
| Intent mismatch | application form (74k), calendar (1M), diary (201k), magazine (110k), passbook printer (hardware), movie diary / sales diary (films), flyer/pamphlet maker apps, harry potter hardcover | Searcher isn't looking for a printing service |
| Junk | "print near mr", "business card near.me", "pamphlet pamphlet", all 0-volume rows, duplicate rows | Typos / no value |
| History trivia | who invented the printing press (12.1k), printing revolution | Only worth it as a blog post later, not on product pages |

## Content gaps (in the sheet, but no page exists — owner's call)

- **Bill book / receipt book / invoice book printing** (6.6k + 480 + 260 + 140) — strongest gap, clear buying intent
- Sticker & label printing (8.1k + 12.1k)
- Box/packaging printing (1.3k)
- Wedding/personal invitation cards (only corporate exists)
