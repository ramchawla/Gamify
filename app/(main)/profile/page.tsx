import { getServerSession } from '@/lib/session'
import { getTeam, getRankedTeams, getTeamMembers, getActiveSeason } from '@/lib/data'
import { DEMO_SUBMISSIONS, DEMO_MISSIONS, isDemoMode } from '@/lib/mock-data'
import { createAdminClient } from '@/lib/supabase/admin'
import ProgressBar from '@/components/profile/ProgressBar'
import MilestoneRow from '@/components/profile/MilestoneRow'
import { MILESTONE_THRESHOLDS } from '@/lib/constants'
import { ordinal } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getRecentSubmissions(teamId: string) {
  if (isDemoMode()) {
    return DEMO_SUBMISSIONS
      .filter(s => s.team_id === teamId)
      .map(s => ({
        ...s,
        mission_title: DEMO_MISSIONS.find(m => m.id === s.mission_id)?.title ?? 'Mission',
      }))
  }
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('submissions')
    .select('id,mission_id,points_awarded,submitted_at,missions(title)')
    .eq('team_id', teamId)
    .order('submitted_at', { ascending: false })
  return (data ?? []).map(s => ({
    ...s,
    mission_title: (s.missions as unknown as { title: string } | null)?.title ?? 'Mission',
  }))
}

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session) return null

  const [team, ranked, members, season, submissions] = await Promise.all([
    getTeam(session.team_id),
    getRankedTeams(session.season_id),
    getTeamMembers(session.team_id),
    getActiveSeason(),
    getRecentSubmissions(session.team_id),
  ])

  if (!team) return <div className="p-6 text-[#8A8473] text-sm">Team not found.</div>

  const rank = ranked.findIndex(t => t.id === session.team_id) + 1
  const totalMissions = season?.total_missions ?? 24
  const completedCount = submissions.length

  return (
    <div className="pb-10">
      {/* Editorial masthead */}
      <div className="px-6 pt-10 pb-6 text-center border-b border-[rgba(243,239,230,0.08)]">
        <p className="eyebrow">{ordinal(rank)} place</p>
        <h1 className="font-display text-[36px] text-[#F3EFE6] leading-tight mt-2" style={{ fontWeight: 400 }}>
          {team.name}
        </h1>
        <p className="font-display tabular text-[#C8902A] text-[40px] leading-none mt-4" style={{ fontWeight: 400 }}>
          {team.total_points.toLocaleString()}
        </p>
        <p className="eyebrow mt-2">points this season</p>
      </div>

      {/* Progress */}
      <div className="px-6 py-8">
        <p className="eyebrow mb-3">Season progress</p>
        <ProgressBar completed={completedCount} total={totalMissions} />
      </div>

      {/* Milestones */}
      <div className="px-6 py-4 border-t border-[rgba(243,239,230,0.08)]">
        <p className="eyebrow mb-3">Milestones</p>
        <div className="space-y-0">
          {MILESTONE_THRESHOLDS.map(t => (
            <MilestoneRow key={t} threshold={t} completedCount={completedCount} totalMissions={totalMissions} />
          ))}
        </div>
      </div>

      {/* Members */}
      {members.length > 0 && (
        <div className="px-6 py-6 border-t border-[rgba(243,239,230,0.08)]">
          <p className="eyebrow mb-3">The team</p>
          <div className="space-y-0">
            {members.map(m => (
              <div
                key={m.id}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: '0.5px solid rgba(243,239,230,0.08)' }}
              >
                <div>
                  <p className="text-[#F3EFE6] text-sm">
                    {m.display_name}
                    {m.id === session.member_id && (
                      <span className="ml-2 eyebrow text-[#C8902A]">You</span>
                    )}
                  </p>
                  {m.role === 'captain' && (
                    <p className="text-[11px] text-[#8A8473] italic mt-0.5">Captain</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent completions */}
      {submissions.length > 0 && (
        <div className="px-6 py-6 border-t border-[rgba(243,239,230,0.08)]">
          <p className="eyebrow mb-3">Completed missions</p>
          <div className="space-y-0">
            {submissions.slice(0, 10).map(s => (
              <div
                key={s.id}
                className="flex items-baseline justify-between py-3"
                style={{ borderBottom: '0.5px solid rgba(243,239,230,0.08)' }}
              >
                <p className="text-[#F3EFE6] text-sm truncate pr-3">{s.mission_title}</p>
                <span className="font-display tabular text-[#C8902A] text-[14px] shrink-0" style={{ fontWeight: 400 }}>
                  +{s.points_awarded.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wrapped link — editorial CTA */}
      <div className="px-6 pt-8">
        <Link
          href="/wrapped"
          className="group w-full flex items-center justify-between py-4 text-[#F3EFE6]"
          style={{ borderTop: '0.5px solid rgba(243,239,230,0.15)', borderBottom: '0.5px solid rgba(243,239,230,0.15)' }}
        >
          <div>
            <p className="eyebrow text-[#C8902A]">Season Recap</p>
            <p className="font-display text-[18px] mt-1" style={{ fontWeight: 400 }}>View your season</p>
          </div>
          <span className="text-[#C8902A] text-xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}
