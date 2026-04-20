import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from '@/lib/session'
import { getActiveSeason, getTeam, getRankedTeams, getCompletedCount, getMissions } from '@/lib/data'
import SeasonHeroBanner from '@/components/home/SeasonHeroBanner'
import PrizeCallout from '@/components/home/PrizeCallout'
import GlobeHero from '@/components/home/GlobeHero'
import NomaMark from '@/components/shared/NomaMark'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getServerSession()
  if (!session) return null

  const [season, team, ranked, completedCount, missionsData] = await Promise.all([
    getActiveSeason(),
    getTeam(session.team_id),
    getRankedTeams(session.season_id),
    getCompletedCount(session.team_id),
    getMissions('remaining'),
  ])

  if (!season || !team) return <div className="p-4 text-[#8A8473]">No active season found.</div>

  const rank = ranked.findIndex(t => t.id === session.team_id) + 1
  const nextMission = missionsData.missions[0] ?? null

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="pb-6">
      {/* Globe hero */}
      <GlobeHero />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <NomaMark size={14} />
        <p className="eyebrow">Autumn · 2026</p>
      </div>

      {/* Greeting */}
      <div className="px-4 pt-2 pb-1 float-in">
        <p className="text-[#8A8473] text-sm">{greeting},</p>
        <h1 className="font-display text-[26px] text-[#F3EFE6] leading-tight mt-0.5" style={{ fontWeight: 400 }}>
          {session.display_name}.
        </h1>
      </div>

      {/* Today's Quest — editorial */}
      {nextMission && (
        <Link
          href={`/missions/${nextMission.id}`}
          className="block mx-4 mt-5 relative rounded-2xl overflow-hidden float-in group"
          style={{ aspectRatio: '4 / 5' }}
        >
          <Image
            src="/images/hero-adventure.jpg"
            alt=""
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,9,8,0.25) 0%, rgba(10,9,8,0.25) 40%, rgba(10,9,8,0.92) 100%)',
            }}
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <p className="eyebrow text-[#C8902A]">Today&apos;s Quest</p>
            <h2 className="font-display text-[28px] text-[#F3EFE6] leading-[1.15] mt-2 max-w-[85%]" style={{ fontWeight: 400 }}>
              {nextMission.title}
            </h2>
            <p className="text-[#C6C0B4] text-sm mt-3 leading-relaxed max-w-[85%] line-clamp-2">
              {nextMission.description}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <p className="font-display text-[#C8902A] tabular" style={{ fontWeight: 400, fontSize: 18 }}>
                +{nextMission.points.toLocaleString()} pts
              </p>
              <span className="text-[#F3EFE6] text-sm flex items-center gap-2 transition-transform group-hover:translate-x-1">
                Begin <span className="text-[#C8902A]">→</span>
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Team standing */}
      <SeasonHeroBanner
        team={team}
        rank={rank}
        totalTeams={ranked.length}
        missionsCompleted={completedCount}
        totalMissions={season.total_missions}
      />

      <PrizeCallout season={season} />
    </div>
  )
}
