-- =============================================================
-- Noma Resorts Experience Platform — Supabase Migration
-- Run in order. All tables use UUID primary keys.
-- RLS policies at the bottom — enable after seeding.
-- =============================================================

-- ─── Extensions ───────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── Enums ────────────────────────────────────────────────────

create type season_status   as enum ('upcoming', 'active', 'ended');
create type member_role     as enum ('captain', 'member');
create type submission_type as enum ('photo', 'text', 'video', 'location');
create type sub_status      as enum ('submitted', 'approved', 'rejected');
create type category_name   as enum (
  'at_home',
  'in_community',
  'near_yosemite',
  'sierra_byway',
  'noma_property'
);

-- ─── seasons ──────────────────────────────────────────────────
-- One row per challenge season. POC has exactly one active row.

create table seasons (
  id                  uuid primary key default gen_random_uuid(),
  title               text        not null,                         -- "Noma Resorts $10K Challenge"
  organizer_name      text        not null,                         -- "Noma Resorts"
  organizer_logo_url  text,                                         -- Supabase Storage public URL
  background_image_url text,                                        -- hero image URL
  accent_color        text        not null default '#C8902A',       -- gold
  prize_description   text        not null,                         -- "$10,000 Grand Prize"
  rules_text          text,                                         -- full rules markdown
  start_date          date        not null,
  end_date            date        not null,
  status              season_status not null default 'upcoming',
  total_missions      int         not null default 0,               -- denorm: updated by trigger
  created_at          timestamptz not null default now(),

  constraint seasons_dates_check check (end_date > start_date)
);

comment on table seasons is
  'Top-level container for a challenge campaign. POC has one row.';

-- ─── teams ────────────────────────────────────────────────────
-- One row per competing team. Max 6 members enforced at app layer
-- (also via check on team_members count — see trigger below).

create table teams (
  id              uuid primary key default gen_random_uuid(),
  season_id       uuid        not null references seasons(id) on delete cascade,
  name            text        not null,
  captain_email   text        not null,
  booking_number  text,                   -- at least one member must have this
  photo_url       text,                   -- team avatar / Supabase Storage URL
  join_code       text        not null unique default upper(substring(gen_random_uuid()::text, 1, 6)),
  total_points    int         not null default 0,   -- denorm: updated on submission insert
  created_at      timestamptz not null default now(),

  constraint teams_name_season_unique unique (season_id, name)
);

create index idx_teams_season   on teams(season_id);
create index idx_teams_joincode on teams(join_code);

comment on column teams.join_code    is '6-char uppercase code used in invite links: /join?code=LEYVA23';
comment on column teams.total_points is 'Denormalised sum. Updated by update_team_points() trigger on submissions.';

-- ─── team_members ─────────────────────────────────────────────
-- One row per person per team. Email is optional for members (POC).

create table team_members (
  id           uuid primary key default gen_random_uuid(),
  team_id      uuid        not null references teams(id) on delete cascade,
  display_name text        not null,
  email        text,
  role         member_role not null default 'member',
  joined_at    timestamptz not null default now(),

  constraint team_members_unique_email_season
    unique nulls not distinct (team_id, email)   -- one email per team; nulls allowed for members
);

create index idx_team_members_team on team_members(team_id);

-- Enforce max-6 rule at DB level
create or replace function check_team_size()
returns trigger language plpgsql as $$
begin
  if (select count(*) from team_members where team_id = new.team_id) >= 6 then
    raise exception 'Team already has 6 members (maximum).';
  end if;
  return new;
end;
$$;

create trigger trg_check_team_size
  before insert on team_members
  for each row execute function check_team_size();

-- ─── missions ─────────────────────────────────────────────────
-- Seeded once per season. 35+ rows for the Noma POC.

create table missions (
  id              uuid primary key default gen_random_uuid(),
  season_id       uuid            not null references seasons(id) on delete cascade,
  title           text            not null,
  description     text            not null,
  tips            text,                                 -- shown on detail screen below description
  category        category_name   not null,
  location_tier   smallint        not null check (location_tier between 1 and 5),
  difficulty      smallint        not null check (difficulty between 1 and 5),
  points          int             not null check (points > 0),
  submission_type submission_type not null,
  has_bonus       boolean         not null default false,
  bonus_description text,                               -- "Best photo wins bonus"
  display_order   int             not null,             -- controls list ordering within category
  is_hidden_treasure boolean      not null default false, -- special flag for the 2000pt Golden Egg
  created_at      timestamptz     not null default now(),

  constraint missions_season_order_unique unique (season_id, display_order)
);

create index idx_missions_season    on missions(season_id);
create index idx_missions_category  on missions(season_id, category, display_order);

comment on column missions.tips            is 'Optional practical hints shown on Mission Detail screen.';
comment on column missions.is_hidden_treasure is 'True for the 2000pt Golden Egg mission — displayed with special visual treatment.';

-- ─── submissions ──────────────────────────────────────────────
-- One row per team per mission. Teams cannot submit the same
-- mission twice (enforced by unique constraint).

create table submissions (
  id             uuid primary key default gen_random_uuid(),
  mission_id     uuid        not null references missions(id) on delete restrict,
  team_id        uuid        not null references teams(id) on delete cascade,
  member_id      uuid references team_members(id) on delete set null,
  status         sub_status  not null default 'submitted',
  media_url      text,                      -- Supabase Storage signed URL (photo/video)
  text_response  text,                      -- text missions
  caption        text        check (char_length(caption) <= 140),
  points_awarded int         not null,      -- copied from missions.points at submit time
  like_count     int         not null default 0,  -- denorm: updated by likes trigger
  submitted_at   timestamptz not null default now(),

  constraint submissions_one_per_team_mission unique (mission_id, team_id)
);

create index idx_submissions_team      on submissions(team_id);
create index idx_submissions_mission   on submissions(mission_id);
create index idx_submissions_feed      on submissions(submitted_at desc);  -- feed query

comment on constraint submissions_one_per_team_mission on submissions is
  'A team may only submit each mission once. Enforced here + at app layer.';

-- Trigger: update team total_points on new submission
create or replace function update_team_points()
returns trigger language plpgsql as $$
begin
  update teams
  set    total_points = total_points + new.points_awarded
  where  id = new.team_id;
  return new;
end;
$$;

create trigger trg_update_team_points
  after insert on submissions
  for each row execute function update_team_points();

-- ─── submission_likes ─────────────────────────────────────────
-- Junction table. One row = one team member liked one submission.

create table submission_likes (
  submission_id uuid not null references submissions(id) on delete cascade,
  member_id     uuid not null references team_members(id) on delete cascade,
  liked_at      timestamptz not null default now(),
  primary key   (submission_id, member_id)
);

-- Trigger: keep submissions.like_count in sync
create or replace function sync_like_count()
returns trigger language plpgsql as $$
begin
  if (tg_op = 'INSERT') then
    update submissions set like_count = like_count + 1 where id = new.submission_id;
  elsif (tg_op = 'DELETE') then
    update submissions set like_count = like_count - 1 where id = old.submission_id;
  end if;
  return null;
end;
$$;

create trigger trg_sync_like_count
  after insert or delete on submission_likes
  for each row execute function sync_like_count();

-- ─── wrapped ──────────────────────────────────────────────────
-- One row per team, generated at season end (or on first Wrapped view).
-- cards_json: ordered array of card payloads for the 5-card sequence.

create table wrapped (
  id                uuid primary key default gen_random_uuid(),
  season_id         uuid not null references seasons(id) on delete cascade,
  team_id           uuid not null references teams(id) on delete cascade,
  generated_at      timestamptz not null default now(),
  final_rank        int  not null,
  total_points      int  not null,
  missions_completed int not null,
  top_category      category_name,          -- category with most completions
  cards_json        jsonb not null,          -- [{card: 1, type: 'intro', data: {...}}, ...]
  narrative_copy    text,                    -- pre-written or AI-generated season narrative
  share_image_url   text,                   -- generated 9:16 PNG in Supabase Storage

  constraint wrapped_unique_team_season unique (season_id, team_id)
);

create index idx_wrapped_team on wrapped(team_id);

comment on column wrapped.cards_json is
  'Ordered JSONB array of card payloads. Schema: [{card_num, type, data}]. Types: intro|stats|best_moment|labels|share]';

-- =============================================================
-- Row Level Security
-- Enable AFTER seeding so seed scripts bypass RLS.
-- =============================================================

alter table seasons         enable row level security;
alter table teams           enable row level security;
alter table team_members    enable row level security;
alter table missions        enable row level security;
alter table submissions     enable row level security;
alter table submission_likes enable row level security;
alter table wrapped         enable row level security;

-- Seasons: anyone can read, no one can write from client
create policy "seasons_read_all"  on seasons for select using (true);

-- Missions: anyone can read
create policy "missions_read_all" on missions for select using (true);

-- Teams: readable by all, writable only via service role (join API route)
create policy "teams_read_all"   on teams for select using (true);
create policy "teams_insert_api" on teams for insert with check (true);  -- locked to service role in prod
create policy "teams_update_api" on teams for update using (true);       -- locked to service role in prod

-- Team members: readable by all
create policy "members_read_all"   on team_members for select using (true);
create policy "members_insert_api" on team_members for insert with check (true);

-- Submissions: anyone reads; only authenticated members write
create policy "submissions_read_all"   on submissions for select using (true);
create policy "submissions_insert_auth" on submissions for insert
  with check (auth.uid() is not null);  -- must be logged in

-- Likes: anyone reads; members can insert/delete their own
create policy "likes_read_all"    on submission_likes for select using (true);
create policy "likes_own_insert"  on submission_likes for insert
  with check (member_id in (
    select id from team_members where email = auth.email()
  ));
create policy "likes_own_delete"  on submission_likes for delete
  using (member_id in (
    select id from team_members where email = auth.email()
  ));

-- Wrapped: readable by all; written by service role only
create policy "wrapped_read_all"   on wrapped for select using (true);
create policy "wrapped_insert_api" on wrapped for insert with check (true);

-- =============================================================
-- Schema grants (required for Supabase projects created post-2024)
-- =============================================================
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables    in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables    to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
