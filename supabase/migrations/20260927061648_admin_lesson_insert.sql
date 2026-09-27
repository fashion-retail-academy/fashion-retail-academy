grant insert on table public.lessons to authenticated;
drop policy if exists "Admin can insert lessons" on public.lessons;
create policy "Admin can insert lessons" on public.lessons for insert to authenticated with check (auth.uid() = 'fcd68eb9-4750-43fd-ad94-a6090849f9cb');