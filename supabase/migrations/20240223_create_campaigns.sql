create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  status text not null default 'draft',
  platforms text[] not null default '{}',
  schedule_type text not null default 'now',
  scheduled_time timestamp with time zone,
  content text not null,
  media_urls text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.campaigns enable row level security;

-- Create policies
create policy "Users can view own campaigns"
  on public.campaigns for select
  using ( auth.uid() = user_id );

create policy "Users can insert own campaigns"
  on public.campaigns for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own campaigns"
  on public.campaigns for update
  using ( auth.uid() = user_id );

create policy "Users can delete own campaigns"
  on public.campaigns for delete
  using ( auth.uid() = user_id );
