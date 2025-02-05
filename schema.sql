/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Plans table for Lemon Squeezy.
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name TEXT,
  variant_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  is_usage_based BOOLEAN DEFAULT FALSE,
  interval TEXT,
  interval_count INTEGER,
  trial_interval TEXT,
  trial_interval_count INTEGER,
  sort INTEGER
);
alter table plans enable row level security;
create policy "Allow public read-only access." on plans for select using (true);
for select using (true);

/**
* CUSTOMERS
* Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
*/
create table customers (
  id uuid default uuid_generate_v4() primary key,
  lemon_squeezy_id text unique not null,
  user_id uuid references auth.users(id) not null,
  name text,
  email text,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add trigger for updated_at
create trigger handle_updated_at before update on customers
  for each row execute procedure moddatetime (updated_at);

/**
* SUBSCRIPTIONS
*/
-- Creating an enum type for subscription status
CREATE TYPE subscription_status AS ENUM (
  'on_trial',
  'active',
  'paused', -- The subscription's payment collection has been paused.
  'past_due', -- A renewal payment has failed and will go through retries.
  'unpaid', -- Payment recovery failed after several attempts.
  'cancelled', -- The subscription has been cancelled but is in a grace period.
  'expired' -- The subscription has ended and access should be revoked.
);

-- Creating the subscriptions table with specified fields
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  lemon_squeezy_id TEXT UNIQUE NOT NULL,
  order_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status subscription_status NOT NULL,
  status_formatted TEXT NOT NULL,
  renews_at TEXT,
  ends_at TEXT,
  trial_ends_at TEXT,
  price TEXT NOT NULL,
  is_usage_based BOOLEAN DEFAULT false,
  is_paused BOOLEAN DEFAULT false,
  subscription_item_id SERIAL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  plan_id INTEGER NOT NULL REFERENCES plans(id)
);

-- Enabling row level security on the subscriptions table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Creating a security policy to ensure users can only access their own subscription data
CREATE POLICY "Can only view own subs data." ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

