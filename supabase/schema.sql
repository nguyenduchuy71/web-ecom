-- Camera shop landing — Supabase schema
-- Applied via Supabase MCP migrations: init_products_schema, fix_set_updated_at_search_path

create type product_status as enum ('available', 'sold', 'reserved');

create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text,
  price       integer not null,
  description text,
  specs       jsonb default '{}'::jsonb,
  condition   text,
  status      product_status not null default 'available',
  images      text[] default '{}',
  video_urls  text[] default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index products_status_idx on products (status);
create index products_created_at_idx on products (created_at desc);

create or replace function set_updated_at() returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

alter table products enable row level security;

create policy "public read" on products
  for select using (true);

-- Chỉ có 1 admin → authenticated = admin. Nếu mở đăng ký sau này, phải siết bằng cột role/allowlist.
create policy "admin insert" on products
  for insert to authenticated with check (true);
create policy "admin update" on products
  for update to authenticated using (true);
create policy "admin delete" on products
  for delete to authenticated using (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "admin insert product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');
create policy "admin update product images" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');
create policy "admin delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');
