import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import TeamAvatar from '@/components/shared/TeamAvatar'
import StatChip from '@/components/shared/StatChip'
import ProgressBar from '@/components/profile/ProgressBar'
import MilestoneRow from '@/components/profile/MilestoneRow'
import { MILESTONE_THRESHOLDS } from '@/lib/constants'
import { ordinal } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()

  const [{ data: team }, { data: members }, { data: submissions }, { data: ranked }, { data: season }] =
    await Promise.all([
      supabase.from('teams').select('*').eq('id', session.team_id).single(),
      supabase.from('team_members').select('*').eq('team_id', session.team_id),
      supabase.from('submissions').select('id,mission_id,media_url,points_awarded,submitted_at,caption,missions(title,category)').eq('team_id', session.team_id).order('submitted_at', { ascending: false }),
      supabase.from('teams').select('id,total_points').eq('season_id', session.season_id).order('total_points', { ascending: false }),
      supabase.from('seasons').select('total_missions').eq('status', 'active').single(),
    ])

  if (!team) return <div className="p-4 text-[#8A8F9E]">Team not found.</div>

  const rank = (ranked ?? []).findIndex(t => t.id === session.team_id) + 1
  const totalMissions = season?.total_missions ?? 35
  const completedCount = (submissions ?? []).length

  return (
    <div className="pb-4 space-y-5">
      {/* Team header */}
      <div className="px-4 pt-6">
        <div className="flex items-center gap-4">
          <TeamAvatar name={team.name} photoUrl={team.photo_url} size={56} />
          <div>
            <h1 className="text-2xl font-bold text-[#F0EEE9]">{team.name}</h1>
            <p className="text-[#8A8F9E] text-sm">{ordinal(rank)} place</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 flex gap-3">
        <StatChip value={team.total_points.toLocaleString()} label="Points" gold className="flex-1" />
        <StatChip value={ordinal(rank)} label="Rank" className="flex-1" />
        <StatChip value={completedCount} label="Done" className="flex-1" />
      </div>

      {/* Progress */}
      <div className="px-4">
        <ProgressBar completed={completedCount} total={totalMissions} />
      </div>

      {/* Milestones */}
      <div className="px-4 card py-2">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-1 px-0 pt-2">Milestones</p>
        {MILESTONE_THRESHOLDS.map(t => (
          <MilestoneRow key={t} threshold={t} completedCount={completedCount} totalMissions={totalMissions} />
        ))}
      </div>

      {/* Members */}
      {members && members.length > 0 && (
        <div className="px-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-2">Team Members</p>
          <div className="card divide-y divide-[rgba(255,255,255,0.05)]">
            {members.map(m => (
              <div key={m.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-[#F0EEE9] text-sm font-medium">
                    {m.display_name}
                    {m.id === session.member_id && <span className="ml-1.5 text-[10px] text-[#C8902A]">YOU</span>}
                  </p>
                  {m.role === 'captain' && <p className="text-[10px] text-[#8A8F9E] uppercase tracking-wide">Captain</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent submissions */}
      {submissions && submissions.length > 0 && (
        <div className="px-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-2">Completed Missions</p>
          <div className="space-y-2">
            {submissions.slice(0, 10).map(s => (
              <div key={s.id} className="flex items-center justify-between card px-4 py-3">
                <p className="text-[#F0EEE9] text-sm truncate flex-1">
                  {(s.missions as unknown as { title: string } | null)?.title ?? 'Mission'}
                </p>
                <span className="text-[#C8902A] font-semibold text-sm ml-2">+{s.points_awarded.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wrapped link */}
      <div className="px-4">
        <Link
          href="/wrapped"
          className="block w-full py-3 text-center rounded-full border border-[rgba(200,144,42,0.40)] text-[#C8902A] font-semibold text-sm hover:bg-[rgba(200,144,42,0.08)] transition-colors"
        >
          View Season Recap →
        </Link>
      </div>
    </div>
  )
}
