-- What each Ask Loopy request was about, and the follow-up questions Loopy
-- suggested, used for the suggested prompts on the Ask Loopy page.
alter table loopy_requests add column if not exists prompt text;
alter table loopy_requests add column if not exists project_name text;
alter table loopy_requests add column if not exists suggestions jsonb not null default '[]';
