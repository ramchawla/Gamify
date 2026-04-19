'use client'

import LeaderboardPodium from '@/components/leaderboard/LeaderboardPodium'
import LeaderboardRow from '@/components/leaderboard/LeaderboardRow'
import { useLeaderboardPoll } from '@/hooks/useLeaderboardPoll'
import type { Team } from '@/types'

interface Props {
  initialTeams: Team[]
  myTeamId: string
}

export default function LeaderboardClient({ initialTeams, myTeamId }: Props) {
  const teams = useLeaderboardPoll(initialTeams)

  return (
    <div>
      <LeaderboardPodium teams={teams} />
      <div className="px-4 space-y-1">
        {teams.map((team, i) => (
          <LeaderboardRow key={team.id} team={team} rank={i + 1} isMyTeam={team.id === myTeamId} />
        ))}
      </div>
    </div>
  )
}
