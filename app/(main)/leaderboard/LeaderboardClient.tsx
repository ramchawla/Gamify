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
  const rest = teams.slice(3)

  return (
    <div>
      <LeaderboardPodium teams={teams} />
      {rest.length > 0 && (
        <>
          <div className="px-5 py-2">
            <p className="eyebrow">All Teams</p>
          </div>
          <div>
            {rest.map((team, i) => (
              <LeaderboardRow
                key={team.id}
                team={team}
                rank={i + 4}
                isMyTeam={team.id === myTeamId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
