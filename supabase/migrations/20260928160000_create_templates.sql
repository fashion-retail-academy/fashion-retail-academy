create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  price numeric(12,2) not null default 0,
  file_path text,
  file_name text,
  published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.templates enable row level security;

drop policy if exists "templates_public_read" on public.templates;
create policy "templates_public_read"
on public.templates
for select
using (published = true or auth.uid() = created_by);

drop policy if exists "templates_admin_insert" on public.templates;
create policy "templates_admin_insert"
on public.templates
for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "templates_admin_update" on public.templates;
create policy "templates_admin_update"
on public.templates
for update
to authenticated
using (auth.uid() = created_by)
with check (auth.uid() = created_by);

drop policy if exists "templates_admin_delete" on public.templates;
create policy "templates_admin_delete"
on public.templates
for delete
to authenticated
using (auth.uid() = created_by);

insert into storage.buckets (id, name, public)
values ('templates', 'templates', false)
on conflict (id) do nothing;

drop policy if exists "template_storage_admin_insert" on storage.objects;
create policy "template_storage_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'templates'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "template_storage_admin_select" on storage.objects;
create policy "template_storage_admin_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'templates'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "template_storage_admin_update" on storage.objects;
create policy "template_storage_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'templates'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'templates'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "template_storage_admin_delete" on storage.objects;
create policy "template_storage_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'templates'
  and (storage.foldername(name))[1] = auth.uid()::text
);