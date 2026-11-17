-- Each user's progress on a project: which steps are checked off, plus the
-- row and stitch counters. project_key is a saved project's id or a
-- beginner project's id (e.g. "starter-granny-square").
create table if not exists project_progress (
  user_id uuid not null references neon_auth."user" (id) on delete cascade,
  project_key text not null,
  completed_steps integer[] not null default '{}',
  row_count integer not null default 0,
  stitch_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, project_key)
);
