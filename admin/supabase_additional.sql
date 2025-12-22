-- Add new columns to events table
alter table events 
add column if not exists category text,
add column if not exists venue text,
add column if not exists phone text,
add column if not exists email text,
add column if not exists what_to_expect jsonb default '[]'::jsonb;

-- Create event_speakers table
create table if not exists event_speakers (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  name text not null,
  role text,
  avatar_url text,
  socials jsonb default '{}'::jsonb, -- { linkedin: "url", instagram: "url" }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event_sponsors table
create table if not exists event_sponsors (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  name text not null,
  logo_url text,
  website_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event_tickets table
create table if not exists event_tickets (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  type text not null, -- e.g., 'Regular', 'VIP'
  price numeric not null default 0,
  quantity_available integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for new tables

-- Speakers
alter table event_speakers enable row level security;
create policy "Public can view speakers" on event_speakers for select using (true);
create policy "Admins can manage speakers" on event_speakers for all 
using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

-- Sponsors
alter table event_sponsors enable row level security;
create policy "Public can view sponsors" on event_sponsors for select using (true);
create policy "Admins can manage sponsors" on event_sponsors for all 
using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );

-- Tickets
alter table event_tickets enable row level security;
create policy "Public can view tickets" on event_tickets for select using (true);
create policy "Admins can manage tickets" on event_tickets for all 
using ( exists ( select 1 from profiles where id = auth.uid() and role in ('Admin', 'IT') ) );
