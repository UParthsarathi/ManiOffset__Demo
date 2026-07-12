-- ============================================================
-- Mani Offset / FeelThePRINT — backend schema + security
-- Target project: amdxvexpbsympnpqpbub
-- Run in Supabase SQL Editor, or apply via the Supabase MCP.
-- Idempotent: safe to re-run.
--
-- NOTE: policies below grant admin-only read using the email
-- 'parthu3915@gmail.com' — this MUST match ADMIN_EMAIL in the
-- app (app/admin/**). Change both together if the admin changes.
-- ============================================================

-- ---------- QUOTES (fed by /api/quotes, read in /admin/orders/quotes) ----------
create table if not exists public.quotes (
  id              bigint generated always as identity primary key,
  created_at      timestamptz not null default now(),
  name            text not null,
  email           text not null,
  phone           text not null,
  organization    text,
  product_id      integer,
  product_title   text,
  copies          integer,
  pages           integer,
  size_format     text,
  binding         text,
  inner_color     text,
  inner_paper     text,
  wrapper         text,
  estimated_price numeric
);

-- ---------- EXPRESS ORDERS (fed by /api/orders/express, read in /admin/orders/critical) ----------
create table if not exists public.express_orders (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  first_name   text not null,
  last_name    text,
  email        text not null,
  phone        text not null,
  product_type text not null,
  deadline     text not null,   -- range label e.g. "24-48-hours"
  details      text
);

-- ---------- BULK ORDERS (fed by /api/orders/bulk, read in /admin/orders/high-volume) ----------
create table if not exists public.bulk_orders (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  first_name   text not null,
  last_name    text,
  email        text not null,
  phone        text not null,
  company      text,
  product_type text not null,
  quantity     text not null,   -- range label e.g. "500-1000"
  details      text
);

-- ---------- PRODUCT MEDIA (managed in /admin/media, stored in bucket product-media) ----------
create table if not exists public.product_media (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  product_id integer not null,   -- matches lib/data product ids (1-29)
  image_url  text not null,
  is_master  boolean not null default false
);
create index if not exists product_media_product_id_idx on public.product_media (product_id);

-- ============================================================
-- Row Level Security
-- Anon (public visitors) may SUBMIT forms but never read others'
-- submissions. Only the admin email can read orders/quotes.
-- ============================================================
alter table public.quotes         enable row level security;
alter table public.express_orders enable row level security;
alter table public.bulk_orders    enable row level security;
alter table public.product_media  enable row level security;

-- QUOTES
drop policy if exists quotes_insert_public on public.quotes;
create policy quotes_insert_public on public.quotes
  for insert to anon, authenticated with check (true);
drop policy if exists quotes_select_admin on public.quotes;
create policy quotes_select_admin on public.quotes
  for select to authenticated using (auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

-- EXPRESS ORDERS
drop policy if exists express_insert_public on public.express_orders;
create policy express_insert_public on public.express_orders
  for insert to anon, authenticated with check (true);
drop policy if exists express_select_admin on public.express_orders;
create policy express_select_admin on public.express_orders
  for select to authenticated using (auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

-- BULK ORDERS
drop policy if exists bulk_insert_public on public.bulk_orders;
create policy bulk_insert_public on public.bulk_orders
  for insert to anon, authenticated with check (true);
drop policy if exists bulk_select_admin on public.bulk_orders;
create policy bulk_select_admin on public.bulk_orders
  for select to authenticated using (auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

-- PRODUCT MEDIA — public read (image URLs), admin-only write
drop policy if exists media_select_public on public.product_media;
create policy media_select_public on public.product_media
  for select to anon, authenticated using (true);
drop policy if exists media_write_admin on public.product_media;
create policy media_write_admin on public.product_media
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'parthu3915@gmail.com')
  with check (auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

-- ============================================================
-- Storage bucket for product images (public read, admin write)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do update set public = true;

drop policy if exists product_media_read on storage.objects;
create policy product_media_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-media');

drop policy if exists product_media_admin_insert on storage.objects;
create policy product_media_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-media' and auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

drop policy if exists product_media_admin_update on storage.objects;
create policy product_media_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'product-media' and auth.jwt() ->> 'email' = 'parthu3915@gmail.com');

drop policy if exists product_media_admin_delete on storage.objects;
create policy product_media_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-media' and auth.jwt() ->> 'email' = 'parthu3915@gmail.com');
