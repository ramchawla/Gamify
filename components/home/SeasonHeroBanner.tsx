import { Trophy } from 'lucide-react'
import type { Team } from '@/types'
import { ordinal } from '@/lib/utils'

interface Props {
  team: Team
  rank: number
  totalTeams: number
  missionsCompleted: number
  totalMissions: number
}

export default function SeasonHeroBanner({ team, rank, totalTeams, missionsCompleted, totalMissions }: Props) {
  const progress = totalMissions > 0 ? (missionsCompleted / totalMissions) * 100 : 0

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 mx-4 mt-4 bg-[#1A1F2E] border border-[rgba(255,255,255,0.08)]"
         style={{ background: 'linear-gradient(135deg, #1A1F2E 0%, #0D1225 100%)' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Your Team</p>
          <h2 className="text-xl font-bold text-[#F0EEE9] mt-0.5">{team.name}</h2>
          <p className="text-[#C8902A] font-semibold text-2xl mt-1">{team.total_points.toLocaleString()} pts</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(200,144,42,0.12)] border border-[rgba(200,144,42,0.40)]">
            <Trophy size={14} className="text-[#C8902A]" />
            <span className="text-[#C8902A] font-semibold text-sm">{ordinal(rank)}</span>
          </div>
          <span className="text-[11px] text-[#4A4F61]">of {totalTeams} teams</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#8A8F9E]">
          <span>{missionsCompleted} missions done</span>
          <span>{totalMissions - missionsCompleted} remaining</span>
        </div>
        <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#C8902A] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
