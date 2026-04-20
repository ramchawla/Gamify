import { getServerSession } from '@/lib/session'
import { getRankedTeams } from '@/lib/data'
import LeaderboardClient from './LeaderboardClient'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const session = await getServerSession()
  if (!session) return null

  const teams = await getRankedTeams(session.season_id)

  return (
    <div className="pb-4">
      <div className="px-5 pt-8 pb-2">
        <p className="eyebrow">The Season</p>
        <h1 className="font-display text-[28px] text-[#F3EFE6] mt-1 leading-tight" style={{ fontWeight: 400 }}>
          Standings
        </h1>
      </div>
      <LeaderboardClient initialTeams={teams} myTeamId={session.team_id} />
    </div>
  )
}
