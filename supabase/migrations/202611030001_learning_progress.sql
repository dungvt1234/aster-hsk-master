create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{"version":1,"data":{}}'::jsonb,
  schema_version integer not null default 1 check (schema_version = 1),
  updated_at timestamptz not null default now(),
  constraint learning_progress_state_object check (jsonb_typeof(state) = 'object')
);

alter table public.learning_progress enable row level security;

revoke all on table public.learning_progress from anon, authenticated;
grant select, insert, update, delete on table public.learning_progress to authenticated;

drop policy if exists "Learners read own progress" on public.learning_progress;
create policy "Learners read own progress"
on public.learning_progress for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Learners create own progress" on public.learning_progress;
create policy "Learners create own progress"
on public.learning_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Learners update own progress" on public.learning_progress;
create policy "Learners update own progress"
on public.learning_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Learners delete own progress" on public.learning_progress;
create policy "Learners delete own progress"
on public.learning_progress for delete
to authenticated
using ((select auth.uid()) = user_id);
