// Hardcoded POC dataset. Powers the investor demo without any backend.
// All images under /public/images are local — no network required.
import type {
  Season, Team, TeamMember, Mission, Submission,
  FeedSubmission, WrappedRecord, NomaSess, CategoryName,
} from '@/types'

export const DEMO_SESSION: NomaSess = {
  team_id: 'team-1',
  member_id: 'member-1',
  season_id: 'season-1',
  display_name: 'Alex',
}

export const DEMO_SEASON: Season = {
  id: 'season-1',
  title: 'Autumn Season · 2026',
  organizer_name: 'Noma Resorts',
  organizer_logo_url: null,
  background_image_url: '/images/hero-domes.jpg',
  accent_color: '#C8902A',
  prize_description: '$10,000 Grand Prize',
  rules_text: null,
  start_date: '2026-03-01',
  end_date: '2026-05-31',
  status: 'active',
  total_missions: 24,
}

export const DEMO_TEAMS: Team[] = [
  { id: 'team-3', season_id: 'season-1', name: 'The Wildhearts',    captain_email: '', booking_number: null, photo_url: 'color:#B85C38', join_code: 'WILD26', total_points: 4820, created_at: '2026-03-01' },
  { id: 'team-1', season_id: 'season-1', name: 'The Explorers',     captain_email: '', booking_number: null, photo_url: 'color:#C8902A', join_code: 'EXPL26', total_points: 4150, created_at: '2026-03-01' },
  { id: 'team-4', season_id: 'season-1', name: 'Summit Collective',  captain_email: '', booking_number: null, photo_url: 'color:#6B8CAE', join_code: 'SMTC26', total_points: 3740, created_at: '2026-03-01' },
  { id: 'team-2', season_id: 'season-1', name: 'Pine & Stone',      captain_email: '', booking_number: null, photo_url: 'color:#7A9E7E', join_code: 'PSTN26', total_points: 3210, created_at: '2026-03-02' },
  { id: 'team-5', season_id: 'season-1', name: 'Northern Lights',   captain_email: '', booking_number: null, photo_url: 'color:#4A8C8C', join_code: 'NLGT26', total_points: 2890, created_at: '2026-03-02' },
  { id: 'team-6', season_id: 'season-1', name: 'Trail Blazers',     captain_email: '', booking_number: null, photo_url: 'color:#C87429', join_code: 'TBLZ26', total_points: 2440, created_at: '2026-03-03' },
  { id: 'team-7', season_id: 'season-1', name: 'The Quiet Ones',    captain_email: '', booking_number: null, photo_url: 'color:#9E6B7A', join_code: 'QUIT26', total_points: 1980, created_at: '2026-03-03' },
  { id: 'team-8', season_id: 'season-1', name: 'Riverbend',         captain_email: '', booking_number: null, photo_url: 'color:#8A7C6E', join_code: 'RIVR26', total_points: 1420, created_at: '2026-03-05' },
]

export const DEMO_MEMBERS: TeamMember[] = [
  { id: 'member-1', team_id: 'team-1', display_name: 'Alex',   email: null, role: 'captain', joined_at: '2026-03-01' },
  { id: 'member-2', team_id: 'team-1', display_name: 'Sarah',  email: null, role: 'member',  joined_at: '2026-03-01' },
  { id: 'member-3', team_id: 'team-1', display_name: 'James',  email: null, role: 'member',  joined_at: '2026-03-02' },
  { id: 'member-4', team_id: 'team-1', display_name: 'Maya',   email: null, role: 'member',  joined_at: '2026-03-02' },
]

export const DEMO_MISSIONS: Mission[] = [
  { id: 'm-1',  season_id: 'season-1', title: 'Capture first light at Glacier Point', description: 'Watch the sun crest Half Dome and capture the moment your team felt the day begin.', tips: 'Arrive 20 minutes before sunrise. The valley light softens everything.', category: 'near_yosemite', location_tier: 1, difficulty: 3, points: 500, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 1, is_hidden_treasure: false },
  { id: 'm-2',  season_id: 'season-1', title: 'A feast under the sequoias',           description: 'Share a meal in the ancient grove. Document what the quiet taught you.', tips: 'The Mariposa Grove opens at dawn — earlier is better.', category: 'near_yosemite', location_tier: 1, difficulty: 2, points: 350, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 2, is_hidden_treasure: false },
  { id: 'm-3',  season_id: 'season-1', title: 'Trace the Sierra Byway',                description: 'Follow the old gold-rush road from Mariposa to Oakhurst. Stop somewhere unplanned.', tips: 'Highway 49 rewards the slow traveler.', category: 'sierra_byway', location_tier: 2, difficulty: 3, points: 450, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 3, is_hidden_treasure: false },
  { id: 'm-4',  season_id: 'season-1', title: 'The fireside conversation',             description: 'Gather your team at the lodge fire. Record the best story told.', tips: 'Lanterns out, phones down.', category: 'noma_property', location_tier: 1, difficulty: 1, points: 200, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 4, is_hidden_treasure: false },
  { id: 'm-5',  season_id: 'season-1', title: 'Morning on the meadow boardwalk',       description: 'Walk the Cook\u2019s Meadow loop at first light. Find something your team wants to remember.', tips: '1.25 mile easy loop. Go barefoot for part of it.', category: 'near_yosemite', location_tier: 1, difficulty: 2, points: 300, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 5, is_hidden_treasure: false },
  { id: 'm-6',  season_id: 'season-1', title: 'The village ritual',                    description: 'Find the oldest business in Mariposa and learn why they\u2019re still there.', tips: 'The hardware store on 5th has been there since 1864.', category: 'in_community', location_tier: 2, difficulty: 2, points: 250, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 6, is_hidden_treasure: false },
  { id: 'm-7',  season_id: 'season-1', title: 'A note to your future self',             description: 'Write a letter to the person you will be when you return home. Leave it at the front desk.', tips: 'Concierge will mail it to you in six months.', category: 'noma_property', location_tier: 1, difficulty: 1, points: 150, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 7, is_hidden_treasure: false },
  { id: 'm-8',  season_id: 'season-1', title: 'Stargaze from the dome deck',           description: 'After 10pm the lights dim across the property. Find the constellations you can name.', tips: 'Best visibility on new-moon nights.', category: 'noma_property', location_tier: 1, difficulty: 1, points: 200, submission_type: 'photo', has_bonus: false, bonus_description: null, display_order: 8, is_hidden_treasure: false },
]

export const DEMO_SUBMISSIONS: Submission[] = [
  { id: 's-1', mission_id: 'm-2', team_id: 'team-1', member_id: 'member-2', status: 'approved', media_url: '/images/hero-sequoia.jpg', text_response: null, caption: 'The trees taught us to speak more softly.', points_awarded: 350, like_count: 12, submitted_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { id: 's-2', mission_id: 'm-5', team_id: 'team-3', member_id: 'member-5', status: 'approved', media_url: '/images/hero-meadow.jpg', text_response: null, caption: 'Liam led the whole way.', points_awarded: 300, like_count: 18, submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: 's-3', mission_id: 'm-1', team_id: 'team-4', member_id: 'member-6', status: 'approved', media_url: '/images/hero-adventure.jpg', text_response: null, caption: 'First light. Worth every minute of the drive up.', points_awarded: 500, like_count: 27, submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: 's-4', mission_id: 'm-4', team_id: 'team-1', member_id: 'member-3', status: 'approved', media_url: '/images/hero-campfire.png', text_response: null, caption: 'James told a ghost story none of us will admit to being scared of.', points_awarded: 200, like_count: 9, submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() },
]

export const DEMO_COMPLETED_MISSION_IDS = new Set(['m-2', 'm-4'])

export const DEMO_FEED: FeedSubmission[] = DEMO_SUBMISSIONS.map(sub => {
  const mission = DEMO_MISSIONS.find(m => m.id === sub.mission_id) ?? null
  const team = DEMO_TEAMS.find(t => t.id === sub.team_id) ?? null
  const member = DEMO_MEMBERS.find(m => m.id === sub.member_id)
  return {
    ...sub,
    missions: mission ? { title: mission.title } : null,
    teams: team ? { name: team.name, photo_url: team.photo_url } : null,
    team_members: member ? { display_name: member.display_name } : { display_name: 'A guest' },
  }
})

export const DEMO_TOP_CATEGORY: CategoryName = 'near_yosemite'

export const DEMO_WRAPPED: WrappedRecord = {
  id: 'wrapped-1',
  season_id: 'season-1',
  team_id: 'team-1',
  generated_at: new Date().toISOString(),
  final_rank: 2,
  total_points: 4150,
  missions_completed: 9,
  top_category: DEMO_TOP_CATEGORY,
  cards_json: [
    {
      card_num: 1,
      type: 'intro',
      data: {
        team_name: 'The Explorers',
        season_title: 'Autumn Season · 2026',
        tagline: 'Your season, remembered.',
      },
    },
    {
      card_num: 2,
      type: 'stats',
      data: {
        total_points: 4150,
        rank: 2,
        total_teams: 8,
        missions_completed: 9,
      },
    },
    {
      card_num: 3,
      type: 'best_moment',
      data: {
        mission_title: 'A feast under the sequoias',
        media_url: '/images/hero-sequoia.jpg',
        caption: 'The trees taught us to speak more softly.',
        points: 350,
      },
    },
    {
      card_num: 4,
      type: 'labels',
      data: {
        top_category: DEMO_TOP_CATEGORY,
        label_name: 'Pathfinders',
        label_poetic: 'You went where the map ended — and made your own.',
      },
    },
    {
      card_num: 5,
      type: 'share',
      data: {
        team_name: 'The Explorers',
        total_points: 4150,
        rank: 2,
      },
    },
  ],
  narrative_copy: null,
  share_image_url: null,
}

// Demo-mode detection. Defaults to ON if the flag isn't set to 'false'.
// Accessible on both server and client because NEXT_PUBLIC_ prefix.
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
}
