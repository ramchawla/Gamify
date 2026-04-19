import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import LeaderboardClient from './LeaderboardClient'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()
  const { data: teams } = await supabase
    .from('teams')
    .select('id,season_id,name,photo_url,total_points,join_code,created_at,captain_email,booking_number')
    .eq('season_id', session.season_id)
    .order('total_points', { ascending: false })

  return (
    <div className="pb-4">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-[#F0EEE9]">Leaderboard</h1>
        <p className="text-[#8A8F9E] text-sm mt-1">Updated every 30 seconds</p>
      </div>
      <LeaderboardClient initialTeams={teams ?? []} myTeamId={session.team_id} />
    </div>
  )
}
