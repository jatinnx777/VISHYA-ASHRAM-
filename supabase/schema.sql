-- ══════════════════════════════════════════════════════════════════
-- Vidya Ashram Classes  ·  Supabase schema  (run once in SQL Editor)
-- Idempotent: safe to run again. Powers the CMS + Admin portal.
-- Image columns store the Storage PATH inside the public 'media' bucket.
-- ══════════════════════════════════════════════════════════════════

-- Clean slate: drop old/previous tables so columns match the current app.
-- (No real content yet, so this is safe. Storage files are NOT touched.)
drop table if exists site_settings cascade;
drop table if exists homepage cascade;
drop table if exists stats cascade;
drop table if exists courses cascade;
drop table if exists faculty cascade;
drop table if exists results cascade;
drop table if exists gallery cascade;
drop table if exists announcements cascade;
drop table if exists testimonials cascade;
drop table if exists posts cascade;
drop table if exists admissions cascade;

-- ── Homepage / hero / featured banner / contact (singleton) ──
create table if not exists homepage (
  id int primary key default 1,
  brand_logo text, tagline text,
  hero_line1 text, hero_line2 text, hero_line3 text, hero_sub text,
  hero_photo text, primary_cta text, secondary_cta text,
  featured_title text, featured_badge text, featured_headline text,
  highlight1_value text, highlight1_label text,
  highlight2_value text, highlight2_label text,
  founder_photo text, founder_name text, founder_role text, founder_headline text,
  founder_message text, founder_mission text, founder_vision text,
  phone text, whatsapp text, email text, address text, map_embed text,
  updated_at timestamptz default now(),
  constraint homepage_singleton check (id = 1)
);

create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  value int default 0, suffix text default '', label text, sort int default 0
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text, category text, class_level text, duration text, description text,
  tag1 text, tag2 text, tag3 text, photo text,
  published bool default true, sort int default 0, created_at timestamptz default now()
);

create table if not exists faculty (
  id uuid primary key default gen_random_uuid(),
  name text, subject text, qualification text, experience text, photo text,
  published bool default true, sort int default 0, created_at timestamptz default now()
);

create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  name text, exam text, category text, rank text, detail text, year text, photo text,
  published bool default true, sort int default 0, created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  label text, ratio text default 'square', media text,
  sort int default 0, created_at timestamptz default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text, date date default now(), is_new bool default true,
  published bool default true, sort int default 0, created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text, name text, role text, rating int default 5,
  published bool default true, sort int default 0, created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique, title text, excerpt text, body text, category text,
  featured_image text, published bool default false, created_at timestamptz default now()
);

create table if not exists admissions (
  id uuid primary key default gen_random_uuid(),
  name text, parent_name text, phone text, email text,
  class text, course text, message text,
  status text default 'new', created_at timestamptz default now()
);

-- ── Row Level Security ──
do $$
declare t text;
begin
  foreach t in array array['homepage','stats','courses','faculty','results','gallery','announcements','testimonials','posts','admissions']
  loop
    execute format('alter table %I enable row level security;', t);
  end loop;
end $$;

-- Public read (drop-then-create so re-runs are clean)
do $$
declare t text;
begin
  foreach t in array array['homepage','stats','courses','faculty','results','gallery','announcements','testimonials','posts']
  loop
    execute format('drop policy if exists "public_read_%1$s" on %1$I;', t);
    execute format('create policy "public_read_%1$s" on %1$I for select using (true);', t);
    execute format('drop policy if exists "admin_all_%1$s" on %1$I;', t);
    execute format('create policy "admin_all_%1$s" on %1$I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'');', t);
  end loop;
end $$;

-- Admissions: anyone can submit, only admins can read/update/delete
drop policy if exists "public_insert_admissions" on admissions;
create policy "public_insert_admissions" on admissions for insert with check (true);
drop policy if exists "admin_read_admissions" on admissions;
create policy "admin_read_admissions" on admissions for select using (auth.role() = 'authenticated');
drop policy if exists "admin_manage_admissions" on admissions;
create policy "admin_manage_admissions" on admissions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── Storage bucket + policies ──
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read" on storage.objects for select using (bucket_id = 'media');
-- Authenticated admins can upload / replace / delete media (fixes RLS on upload)
drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'media');
drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update" on storage.objects for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'media');

-- singleton row
insert into homepage (id) values (1) on conflict (id) do nothing;
