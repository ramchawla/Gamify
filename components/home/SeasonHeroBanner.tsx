import Image from 'next/image'
import type { Team } from '@/types'
import { ordinal } from '@/lib/utils'

interface Props {
  team: Team
  rank: number
  totalTeams: number
  missionsCompleted: number
  totalMissions: number
}

export default function SeasonHeroBanner({
  team, rank, totalTeams, missionsCompleted, totalMissions,
}: Props) {
  const progress = totalMissions > 0 ? (missionsCompleted / totalMissions) * 100 : 0

  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-2xl">
      {/* Imagery */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-domes.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.30) 0%, rgba(10,9,8,0.55) 45%, rgba(10,9,8,0.88) 100%)',
          }}
        />
      </div>

      <div className="relative p-6 min-h-[220px] flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Your Team</p>
            <h2 className="font-display text-[28px] leading-tight text-[#F3EFE6] mt-1" style={{ fontWeight: 400 }}>
              {team.name}
            </h2>
          </div>
          <div className="text-right">
            <p className="eyebrow">Rank</p>
            <p className="font-display text-[22px] text-[#C8902A] tabular mt-1" style={{ fontWeight: 400 }}>
              {ordinal(rank)}
            </p>
            <p className="text-[11px] text-[#8A8473] tabular">of {totalTeams}</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-display text-[44px] text-[#F3EFE6] tabular leading-none" style={{ fontWeight: 400 }}>
              {team.total_points.toLocaleString()}
            </p>
            <p className="eyebrow">points</p>
          </div>
          <div className="h-px bg-[rgba(243,239,230,0.15)] relative">
            <div
              className="absolute left-0 top-0 h-px bg-[#C8902A] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[11px] text-[#C6C0B4] tabular">{missionsCompleted} of {totalMissions} missions</p>
            <p className="text-[11px] text-[#8A8473] tabular">{Math.round(progress)}%</p>
          </div>
        </div>
      </div>
    </section>
  )
}
