-- Create buckets if they don't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('merch-images', 'merch-images', true)
on conflict (id) do nothing;

-- Enable RLS on objects (if not already enabled)
alter table storage.objects enable row level security;

-- Policies for event-images
create policy "Public Access to Event Images"
on storage.objects for select
using ( bucket_id = 'event-images' );

create policy "Admins can upload event images"
on storage.objects for insert
with check (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can update event images"
on storage.objects for update
using (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can delete event images"
on storage.objects for delete
using (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

-- Policies for merch-images
create policy "Public Access to Merch Images"
on storage.objects for select
using ( bucket_id = 'merch-images' );

create policy "Admins can upload merch images"
on storage.objects for insert
with check (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can update merch images"
on storage.objects for update
using (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can delete merch images"
on storage.objects for delete
using (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

-- Policies for avatars
create policy "Public Access to Avatars"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Allow users to upload their own avatar. 
-- We assume the filename starts with the user ID, e.g., "userid-timestamp.ext"
-- OR we can just allow authenticated users to upload to the bucket generally if we don't enforce folder structure strictly.
-- For strictness: (storage.foldername(name))[1] = auth.uid()::text
-- But simpler for now: just authenticated users can upload.
create policy "Users can upload avatars"
on storage.objects for insert
with check (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
);

create policy "Users can update own avatars"
on storage.objects for update
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  -- Optional: Add ownership check if filenames contain user ID
);

-- ////////////////////////////////////////////
-- Create buckets if they don't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('merch-images', 'merch-images', true)
on conflict (id) do nothing;

-- Enable RLS on objects (if not already enabled)
alter table storage.objects enable row level security;

-- Policies for event-images
create policy "Public Access to Event Images"
on storage.objects for select
using ( bucket_id = 'event-images' );

create policy "Admins can upload event images"
on storage.objects for insert
with check (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can update event images"
on storage.objects for update
using (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can delete event images"
on storage.objects for delete
using (
  bucket_id = 'event-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

-- Policies for merch-images
create policy "Public Access to Merch Images"
on storage.objects for select
using ( bucket_id = 'merch-images' );

create policy "Admins can upload merch images"
on storage.objects for insert
with check (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can update merch images"
on storage.objects for update
using (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

create policy "Admins can delete merch images"
on storage.objects for delete
using (
  bucket_id = 'merch-images'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('Admin', 'IT')
  )
);

-- Policies for avatars
create policy "Public Access to Avatars"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Allow users to upload their own avatar. 
-- We assume the filename starts with the user ID, e.g., "userid-timestamp.ext"
-- OR we can just allow authenticated users to upload to the bucket generally if we don't enforce folder structure strictly.
-- For strictness: (storage.foldername(name))[1] = auth.uid()::text
-- But simpler for now: just authenticated users can upload.
create policy "Users can upload avatars"
on storage.objects for insert
with check (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
);

create policy "Users can update own avatars"
on storage.objects for update
using (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
  -- Optional: Add ownership check if filenames contain user ID
);
