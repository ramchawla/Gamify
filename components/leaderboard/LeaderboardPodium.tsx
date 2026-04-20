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
    <div className="flex items-end justify-center gap-6 px-4 pt-8 pb-10">
      {order.map((dataIdx, visIdx) => {
        const team = top3[dataIdx]
        if (!team) return <div key={visIdx} className="w-20" />
        const rank = dataIdx + 1
        const isFirst = rank === 1
        const avatarSize = isFirst ? 64 : 48

        return (
          <div key={team.id} className="flex flex-col items-center gap-2 w-24">
            <div className="relative flex items-center justify-center" style={{ width: 120, height: 110 }}>
              {isFirst && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Laurel size={118} />
                </div>
              )}
              <TeamAvatar name={team.name} size={avatarSize} />
            </div>
            <p
              className="font-display tabular leading-none"
              style={{
                fontSize: isFirst ? 36 : 26,
                fontWeight: 400,
                color: isFirst ? '#C8902A' : '#8A8473',
              }}
            >
              {rank}
            </p>
            <p className="text-[#F3EFE6] text-xs font-medium text-center leading-tight line-clamp-2 max-w-[110px]">
              {team.name}
            </p>
            <p className="text-[11px] text-[#8A8473] tabular">
              {team.total_points.toLocaleString()}
            </p>
          </div>
        )
      })}
    </div>
  )
}
