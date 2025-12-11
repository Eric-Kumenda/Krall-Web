-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  avatar_url text,
  phone text,
  role text check (role in ('Admin', 'IT')) default 'Admin',
  
  constraint first_name_length check (char_length(first_name) >= 2),
  constraint last_name_length check (char_length(last_name) >= 2)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for events
create table events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  date timestamp with time zone not null,
  location text,
  image_url text,
  price numeric,
  tickets_available integer default 0,
  tickets_sold integer default 0,
  is_published boolean default false,
  created_by uuid references profiles(id)
);

alter table events enable row level security;

create policy "Events are viewable by everyone."
  on events for select
  using ( true );

create policy "Admins and IT can insert events."
  on events for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

create policy "Admins and IT can update events."
  on events for update
  using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

create policy "Admins and IT can delete events."
  on events for delete
  using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

-- Create a table for merchandise
create table merch (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  category text,
  stock_quantity integer default 0,
  is_active boolean default true
);

alter table merch enable row level security;

create policy "Merch is viewable by everyone."
  on merch for select
  using ( true );

create policy "Admins and IT can manage merch."
  on merch for all
  using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

-- Create a table for orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users, -- Can be null for guest checkout if needed, but for now linking to users
  customer_name text,
  customer_email text,
  total_amount numeric not null,
  status text default 'pending', -- pending, paid, shipped, delivered, cancelled
  items jsonb -- Store order items as JSONB for simplicity
);

alter table orders enable row level security;

create policy "Admins and IT can view all orders."
  on orders for select
  using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

create policy "Users can view their own orders."
  on orders for select
  using ( auth.uid() = user_id );

-- Storage buckets setup (You need to create these buckets in Supabase Storage manually or via script if possible, but SQL usually handles policies)
-- Bucket: avatars
-- Bucket: event-images
-- Bucket: merch-images

-- Policy for avatars bucket
-- insert: authenticated users
-- select: public
-- update: user owns the file (name file with user id for simplicity or check folder)

-- Policy for event-images and merch-images
-- insert/update/delete: Admin/IT roles
-- select: public
