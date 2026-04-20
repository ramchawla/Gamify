'use client'

import { cn } from '@/lib/utils'
import TeamAvatar from '@/components/shared/TeamAvatar'
import type { Team } from '@/types'

interface Props {
  team: Team
  rank: number
  isMyTeam?: boolean
}

export default function LeaderboardRow({ team, rank, isMyTeam }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-5 py-4 hairline transition-colors',
        isMyTeam ? 'bg-[rgba(200,144,42,0.06)]' : ''
      )}
    >
      <span
        className={cn(
          'font-display tabular w-7 text-right leading-none shrink-0',
          isMyTeam ? 'text-[#C8902A]' : 'text-[#4A4540]'
        )}
        style={{ fontSize: 18, fontWeight: 400 }}
      >
        {rank}
      </span>

      <TeamAvatar name={team.name} photoUrl={team.photo_url} size={30} />

      <span className={cn('flex-1 text-[15px] leading-none', isMyTeam ? 'text-[#F3EFE6] font-medium' : 'text-[#C6C0B4]')}>
        {team.name}
        {isMyTeam && (
          <span className="ml-2 eyebrow !text-[9px] !tracking-[0.18em] text-[#C8902A]">You</span>
        )}
      </span>

      <span className="font-display tabular leading-none shrink-0" style={{ fontSize: 15, fontWeight: 400, color: isMyTeam ? '#C8902A' : '#8A8473' }}>
        {team.total_points.toLocaleString()}
      </span>
    </div>
  )
}
