-- Express/bulk forms: phone becomes the only required contact field,
-- category dropped entirely. Existing rows were test data (owner confirmed).
delete from public.express_orders;
delete from public.bulk_orders;

alter table public.express_orders drop column if exists product_type;
alter table public.bulk_orders    drop column if exists product_type;

alter table public.express_orders alter column first_name drop not null;
alter table public.express_orders alter column email      drop not null;
alter table public.bulk_orders    alter column first_name drop not null;
alter table public.bulk_orders    alter column email      drop not null;
