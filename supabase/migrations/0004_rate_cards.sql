-- ============================================================
-- Rate cards for the price calculator (edited at /admin/calculator)
-- Each publish inserts one row; the newest row is the live rate card.
-- Rows are never updated or deleted, so every earlier version stays restorable.
-- Idempotent: safe to re-run.
--
-- NOTE: the admin email below MUST match ADMIN_EMAIL in lib/admin.ts.
-- ============================================================
create table if not exists public.rate_cards (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  created_by text,
  note       text,
  rates      jsonb not null   -- flat map, keys documented in lib/offset-pricing.ts
);

alter table public.rate_cards enable row level security;

-- Public read: the calculator prices quotes from the newest row
drop policy if exists rate_cards_select_public on public.rate_cards;
create policy rate_cards_select_public on public.rate_cards
  for select to anon, authenticated using (true);

-- Admin-only insert. No update/delete policy on purpose.
drop policy if exists rate_cards_insert_admin on public.rate_cards;
create policy rate_cards_insert_admin on public.rate_cards
  for insert to authenticated
  with check (auth.jwt() ->> 'email' = 'parthu3915@gmail.com');
