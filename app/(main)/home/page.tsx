import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import SeasonHeroBanner from '@/components/home/SeasonHeroBanner'
import PrizeCallout from '@/components/home/PrizeCallout'
import QuickActionCard from '@/components/home/QuickActionCard'
import { Target, Rss, Trophy } from 'lucide-react'
import type { Season, Team } from '@/types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()

  const [{ data: season }, { data: team }, { data: ranked }, { count: completedCount }] = await Promise.all([
    supabase.from('seasons').select('*').eq('status', 'active').single(),
    supabase.from('teams').select('*').eq('id', session.team_id).single(),
    supabase.from('teams').select('id,total_points').order('total_points', { ascending: false }),
    supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('team_id', session.team_id),
  ])

  if (!season || !team) return <div className="p-4 text-[#8A8F9E]">No active season found.</div>

  const rank = (ranked ?? []).findIndex(t => t.id === session.team_id) + 1

  return (
    <div className="space-y-3 pb-4">
      <div className="px-4 pt-6 pb-1">
        <p className="text-[#8A8F9E] text-sm">Welcome back,</p>
        <h1 className="text-2xl font-bold text-[#F0EEE9]">{session.display_name} 👋</h1>
      </div>

      <SeasonHeroBanner
        team={team as Team}
        rank={rank}
        totalTeams={(ranked ?? []).length}
        missionsCompleted={completedCount ?? 0}
        totalMissions={season.total_missions}
      />

      <PrizeCallout season={season as Season} />

      <div className="px-4 mt-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-3">Quick Actions</p>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionCard href="/missions" label="Missions" sublabel="Earn points" Icon={Target} />
          <QuickActionCard href="/feed" label="Feed" sublabel="Team activity" Icon={Rss} />
          <QuickActionCard href="/leaderboard" label="Standings" sublabel="See rankings" Icon={Trophy} />
        </div>
      </div>

      <div className="px-4 mt-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-2">Your Join Code</p>
        <div className="flex items-center gap-3 px-4 py-3 card rounded-xl">
          <span className="font-mono text-xl font-bold text-[#C8902A] tracking-widest">{team.join_code}</span>
          <span className="text-[#4A4F61] text-xs">Share with teammates</span>
        </div>
      </div>
    </div>
  )
}
