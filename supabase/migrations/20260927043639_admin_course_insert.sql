grant insert on table public.courses to authenticated;

drop policy if exists "Admin can insert courses" on public.courses;

create policy "Admin can insert courses"
on public.courses
for insert
to authenticated
with check (auth.uid() = 'fcd68eb9-4750-43fd-ad94-a6090849f9cb');
