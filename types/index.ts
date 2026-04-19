export type CategoryName =
  | 'at_home'
  | 'in_community'
  | 'near_yosemite'
  | 'sierra_byway'
  | 'noma_property'

export type SubmissionType = 'photo' | 'text' | 'video' | 'location'
export type SeasonStatus   = 'upcoming' | 'active' | 'ended'
export type MemberRole     = 'captain' | 'member'
export type SubStatus      = 'submitted' | 'approved' | 'rejected'

export interface Season {
  id: string
  title: string
  organizer_name: string
  organizer_logo_url: string | null
  background_image_url: string | null
  accent_color: string
  prize_description: string
  rules_text: string | null
  start_date: string
  end_date: string
  status: SeasonStatus
  total_missions: number
}

export interface Team {
  id: string
  season_id: string
  name: string
  captain_email: string
  booking_number: string | null
  photo_url: string | null
  join_code: string
  total_points: number
  created_at: string
}

export interface TeamMember {
  id: string
  team_id: string
  display_name: string
  email: string | null
  role: MemberRole
  joined_at: string
}

export interface Mission {
  id: string
  season_id: string
  title: string
  description: string
  tips: string | null
  category: CategoryName
  location_tier: number
  difficulty: number
  points: number
  submission_type: SubmissionType
  has_bonus: boolean
  bonus_description: string | null
  display_order: number
  is_hidden_treasure: boolean
}

export interface Submission {
  id: string
  mission_id: string
  team_id: string
  member_id: string
  status: SubStatus
  media_url: string | null
  text_response: string | null
  caption: string | null
  points_awarded: number
  like_count: number
  submitted_at: string
}

export interface WrappedRecord {
  id: string
  season_id: string
  team_id: string
  generated_at: string
  final_rank: number
  total_points: number
  missions_completed: number
  top_category: CategoryName | null
  cards_json: WrappedCard[]
  narrative_copy: string | null
  share_image_url: string | null
}

export type WrappedCardType = 'intro' | 'stats' | 'best_moment' | 'labels' | 'share'

export interface WrappedCard {
  card_num: 1 | 2 | 3 | 4 | 5
  type: WrappedCardType
  data: Record<string, unknown>
}

export interface NomaSess {
  team_id: string
  member_id: string
  season_id: string
  display_name: string
}

export const CATEGORY_LABELS: Record<CategoryName, string> = {
  at_home:       'At Home',
  in_community:  'In Community',
  near_yosemite: 'Near Yosemite',
  sierra_byway:  'Sierra Byway',
  noma_property: 'Noma Property',
}

export const SUBMISSION_TYPE_COLORS: Record<SubmissionType, string> = {
  photo:    '#C8902A',
  text:     '#4A7C59',
  video:    '#7F77DD',
  location: '#60A5FA',
}

// Supabase join shapes
export interface FeedSubmission extends Submission {
  missions: { title: string } | null
  teams: { name: string; photo_url: string | null } | null
  team_members: { display_name: string } | null
}
