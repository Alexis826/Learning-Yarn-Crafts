-- Loopy-made projects also store yarn, tool, time, size and skills, plus a tip.
alter table projects add column if not exists details jsonb;
alter table projects add column if not exists tip text;

-- One row per successful Ask Loopy request, for plan limits.
create table if not exists loopy_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references neon_auth."user" (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists loopy_requests_user_id_created_at_idx
  on loopy_requests (user_id, created_at);
