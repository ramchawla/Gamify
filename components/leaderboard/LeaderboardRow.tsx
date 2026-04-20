'use client'

import { cn } from '@/lib/utils'
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
        'flex items-baseline gap-4 px-5 py-4 hairline transition-colors',
        isMyTeam ? 'bg-[rgba(200,144,42,0.06)]' : ''
      )}
    >
      <span
        className={cn(
          'font-display tabular w-8 text-right leading-none',
          isMyTeam ? 'text-[#C8902A]' : 'text-[#8A8473]'
        )}
        style={{ fontSize: 20, fontWeight: 400 }}
      >
        {rank}
      </span>

      <span className={cn('flex-1 text-[15px] leading-none', isMyTeam ? 'text-[#F3EFE6] font-medium' : 'text-[#F3EFE6]')}>
        {team.name}
        {isMyTeam && (
          <span className="ml-2 eyebrow !text-[9px] !tracking-[0.18em] text-[#C8902A]">You</span>
        )}
      </span>

      <span className="font-display tabular text-[#C6C0B4] leading-none" style={{ fontSize: 16, fontWeight: 400 }}>
        {team.total_points.toLocaleString()}
      </span>
    </div>
  )
}
