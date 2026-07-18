-- ============================================================
-- Customer accounts: optional login (Google via Supabase Auth).
-- Adds nullable user_id to submission tables so logged-in
-- customers can see their own rows. Anonymous submissions keep
-- working (user_id stays null). Idempotent: safe to re-run.
-- ============================================================

alter table public.quotes         add column if not exists user_id uuid references auth.users (id) on delete set null;
alter table public.express_orders add column if not exists user_id uuid references auth.users (id) on delete set null;
alter table public.bulk_orders    add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists quotes_user_id_idx         on public.quotes (user_id);
create index if not exists express_orders_user_id_idx on public.express_orders (user_id);
create index if not exists bulk_orders_user_id_idx    on public.bulk_orders (user_id);

-- Tighten inserts: user_id may only be null (anonymous) or the
-- caller's own uid — prevents planting rows in someone else's
-- account via a direct supabase-js insert with the anon key.
drop policy if exists quotes_insert_public on public.quotes;
create policy quotes_insert_public on public.quotes
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

drop policy if exists express_insert_public on public.express_orders;
create policy express_insert_public on public.express_orders
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

drop policy if exists bulk_insert_public on public.bulk_orders;
create policy bulk_insert_public on public.bulk_orders
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- Own-rows read access. These are permissive policies, so they OR
-- with the existing admin-only select policies: admin still reads
-- everything, customers read only their own submissions.
drop policy if exists quotes_select_own on public.quotes;
create policy quotes_select_own on public.quotes
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists express_select_own on public.express_orders;
create policy express_select_own on public.express_orders
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists bulk_select_own on public.bulk_orders;
create policy bulk_select_own on public.bulk_orders
  for select to authenticated using (auth.uid() = user_id);
