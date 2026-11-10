-- Each signed-up user's chosen plan. Users themselves live in neon_auth.user.
create table if not exists profiles (
  user_id uuid primary key references neon_auth."user" (id) on delete cascade,
  plan text not null default 'Free' check (plan in ('Free', 'Pro', 'Ultimate')),
  created_at timestamptz not null default now()
);

-- Instructions saved to a user's Projects page.
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references neon_auth."user" (id) on delete cascade,
  name text not null,
  craft text check (craft in ('Crochet', 'Knitting')),
  materials jsonb not null default '[]',
  steps jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create index if not exists projects_user_id_created_at_idx
  on projects (user_id, created_at);
