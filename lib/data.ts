// Data abstraction — branches between mock (POC) and Supabase (production).
// All server components should read through this layer.
import 'server-only'
import type { Mission, Team, TeamMember, FeedSubmission, Season, WrappedRecord } from '@/types'
import {
  DEMO_SEASON, DEMO_TEAMS, DEMO_MEMBERS, DEMO_MISSIONS,
  DEMO_COMPLETED_MISSION_IDS, DEMO_FEED, DEMO_WRAPPED, isDemoMode,
} from './mock-data'

export async function getActiveSeason(): Promise<Season | null> {
  if (isDemoMode()) return DEMO_SEASON
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient().from('seasons').select('*').eq('status', 'active').single()
  return (data as Season) ?? null
}

export async function getTeam(teamId: string): Promise<Team | null> {
  if (isDemoMode()) return DEMO_TEAMS.find(t => t.id === teamId) ?? DEMO_TEAMS[1]
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient().from('teams').select('*').eq('id', teamId).single()
  return (data as Team) ?? null
}

export async function getRankedTeams(seasonId: string): Promise<Team[]> {
  if (isDemoMode()) return [...DEMO_TEAMS].sort((a, b) => b.total_points - a.total_points)
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient()
    .from('teams')
    .select('id,season_id,name,photo_url,total_points,join_code,created_at,captain_email,booking_number')
    .eq('season_id', seasonId)
    .order('total_points', { ascending: false })
  return (data ?? []) as Team[]
}

export async function getCompletedCount(teamId: string): Promise<number> {
  if (isDemoMode()) return DEMO_COMPLETED_MISSION_IDS.size + 7
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { count } = await createAdminClient()
    .from('submissions').select('id', { count: 'exact', head: true }).eq('team_id', teamId)
  return count ?? 0
}

export async function getMissions(tab: 'remaining' | 'completed'): Promise<{
  missions: Mission[], completedIds: string[],
}> {
  if (isDemoMode()) {
    const completedIds = Array.from(DEMO_COMPLETED_MISSION_IDS)
    const filtered = tab === 'completed'
      ? DEMO_MISSIONS.filter(m => DEMO_COMPLETED_MISSION_IDS.has(m.id))
      : DEMO_MISSIONS.filter(m => !DEMO_COMPLETED_MISSION_IDS.has(m.id))
    return { missions: filtered, completedIds }
  }
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { data: all } = await supabase.from('missions').select('*').order('display_order')
  return { missions: (all ?? []) as Mission[], completedIds: [] }
}

export async function getMission(id: string): Promise<{ mission: Mission | null, completed: boolean }> {
  if (isDemoMode()) {
    const mission = DEMO_MISSIONS.find(m => m.id === id) ?? null
    return { mission, completed: mission ? DEMO_COMPLETED_MISSION_IDS.has(mission.id) : false }
  }
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { data: mission } = await supabase.from('missions').select('*').eq('id', id).single()
  return { mission: (mission as Mission) ?? null, completed: false }
}

export async function getFeed(): Promise<FeedSubmission[]> {
  if (isDemoMode()) return DEMO_FEED
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient()
    .from('submissions')
    .select(`
      id, mission_id, team_id, member_id, status, media_url, text_response,
      caption, points_awarded, like_count, submitted_at,
      missions ( title ),
      teams ( name, photo_url ),
      team_members ( display_name )
    `)
    .order('submitted_at', { ascending: false })
    .limit(20)
  return (data ?? []) as unknown as FeedSubmission[]
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  if (isDemoMode()) return DEMO_MEMBERS.filter(m => m.team_id === teamId)
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient().from('team_members').select('*').eq('team_id', teamId)
  return (data ?? []) as TeamMember[]
}

export async function getWrapped(): Promise<WrappedRecord> {
  if (isDemoMode()) return DEMO_WRAPPED
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const { data } = await createAdminClient().from('wrapped').select('*').maybeSingle()
  return (data as WrappedRecord) ?? DEMO_WRAPPED
}
