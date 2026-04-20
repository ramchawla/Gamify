import TeamAvatar from '@/components/shared/TeamAvatar'
import Laurel from '@/components/shared/Laurel'
import type { Team } from '@/types'

interface Props {
  teams: Team[]
}

const order = [1, 0, 2] // visual: 2nd left, 1st center, 3rd right

export default function LeaderboardPodium({ teams }: Props) {
  const top3 = teams.slice(0, 3)
  if (top3.length < 1) return null

  return (
    <div className="flex items-end justify-center gap-4 px-4 pt-10 pb-8">
      {order.map((dataIdx, visIdx) => {
        const team = top3[dataIdx]
        if (!team) return <div key={visIdx} className="w-24" />
        const rank = dataIdx + 1
        const isFirst = rank === 1
        const avatarSize = isFirst ? 68 : 50

        return (
          <div key={team.id} className="flex flex-col items-center gap-2.5 w-28">
            <div
              className="relative flex items-center justify-center"
              style={{ width: isFirst ? 130 : 90, height: isFirst ? 120 : 90 }}
            >
              {isFirst && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Laurel size={130} />
                </div>
              )}
              <TeamAvatar name={team.name} photoUrl={team.photo_url} size={avatarSize} />
            </div>

            <p
              className="font-display tabular leading-none"
              style={{
                fontSize: isFirst ? 38 : 24,
                fontWeight: 400,
                color: isFirst ? '#C8902A' : '#4A4540',
              }}
            >
              {rank}
            </p>

            <p
              className="text-center leading-tight max-w-[110px]"
              style={{
                fontSize: isFirst ? 14 : 12,
                color: isFirst ? '#F3EFE6' : '#8A8473',
                fontWeight: isFirst ? 500 : 400,
              }}
            >
              {team.name}
            </p>

            <p
              className="font-display tabular"
              style={{
                fontSize: isFirst ? 15 : 12,
                fontWeight: 400,
                color: isFirst ? '#C8902A' : '#4A4540',
              }}
            >
              {team.total_points.toLocaleString()}
            </p>
          </div>
        )
      })}
    </div>
  )
}
