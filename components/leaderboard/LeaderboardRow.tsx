'use client'

import TeamAvatar from '@/components/shared/TeamAvatar'
import { cn } from '@/lib/utils'
import type { Team } from '@/types'

interface Props {
  team: Team
  rank: number
  isMyTeam?: boolean
}

const medalColors = ['#EAB308', '#8A8F9E', '#C8902A'] // gold, silver, bronze

export default function LeaderboardRow({ team, rank, isMyTeam }: Props) {
  const medal = rank <= 3 ? medalColors[rank - 1] : null

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
        isMyTeam ? 'card-gold' : 'hover:bg-[rgba(255,255,255,0.03)]'
      )}
    >
      <span
        className="w-7 text-center font-semibold text-base shrink-0"
        style={{ color: medal ?? '#8A8F9E' }}
      >
        {rank}
      </span>

      <TeamAvatar name={team.name} photoUrl={team.photo_url} size={36} />

      <span className={cn('flex-1 font-medium text-sm truncate', isMyTeam ? 'text-[#F0EEE9]' : 'text-[#F0EEE9]')}>
        {team.name}
        {isMyTeam && <span className="ml-1.5 text-[10px] text-[#C8902A] font-medium">YOU</span>}
      </span>

      <span className="font-semibold text-sm text-[#C8902A]">
        {team.total_points.toLocaleString()}
      </span>
    </div>
  )
}
