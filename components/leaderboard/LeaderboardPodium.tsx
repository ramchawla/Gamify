import TeamAvatar from '@/components/shared/TeamAvatar'
import type { Team } from '@/types'

interface Props {
  teams: Team[]  // top 3, in order 1st, 2nd, 3rd
}

const podiumOrder = [1, 0, 2] // visual: 2nd left, 1st center, 3rd right
const heights = ['h-20', 'h-28', 'h-14']
const medals  = ['🥈', '🥇', '🥉']
const labelColors = ['#8A8F9E', '#EAB308', '#C8902A']

export default function LeaderboardPodium({ teams }: Props) {
  const top3 = teams.slice(0, 3)
  if (top3.length < 1) return null

  return (
    <div className="flex items-end justify-center gap-2 px-4 py-6">
      {podiumOrder.map((dataIdx, visIdx) => {
        const team = top3[dataIdx]
        if (!team) return <div key={visIdx} className="w-24" />
        const rank = dataIdx + 1

        return (
          <div key={team.id} className="flex flex-col items-center gap-2 w-24">
            <span className="text-xl">{medals[visIdx]}</span>
            <TeamAvatar name={team.name} photoUrl={team.photo_url} size={48} />
            <p className="text-[#F0EEE9] text-xs font-medium text-center leading-tight line-clamp-2">
              {team.name}
            </p>
            <p className="text-[10px] text-[#C8902A] font-semibold">{team.total_points.toLocaleString()} pts</p>
            <div
              className={`${heights[visIdx]} w-full rounded-t-xl flex items-center justify-center`}
              style={{ background: rank === 1 ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.05)', borderTop: `1px solid ${labelColors[visIdx]}33` }}
            >
              <span className="text-lg font-bold" style={{ color: labelColors[visIdx] }}>
                {rank}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
