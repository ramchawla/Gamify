import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import SubmissionTypeIcon from '@/components/missions/SubmissionTypeIcon'
import PointsBadge from '@/components/missions/PointsBadge'
import BonusBadge from '@/components/missions/BonusBadge'
import MissionSubmitForm from './MissionSubmitForm'
import { CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()
  const [{ data: mission }, { data: submission }] = await Promise.all([
    supabase.from('missions').select('*').eq('id', id).single(),
    supabase.from('submissions').select('*').eq('mission_id', id).eq('team_id', session.team_id).maybeSingle(),
  ])

  if (!mission) notFound()

  return (
    <div className="px-4 pt-6 pb-8 space-y-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-start gap-3">
        <SubmissionTypeIcon type={mission.submission_type} size={48} />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[#F0EEE9] leading-snug">{mission.title}</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <PointsBadge points={mission.points} />
            {mission.has_bonus && <BonusBadge description={mission.bonus_description} />}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="text-[#F0EEE9] leading-relaxed">{mission.description}</p>
        {mission.tips && (
          <div className="px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E] mb-1">Tips</p>
            <p className="text-[#F0EEE9] text-sm leading-relaxed">{mission.tips}</p>
          </div>
        )}
      </div>

      {/* Submission */}
      {submission ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(74,124,89,0.10)] border border-[rgba(74,124,89,0.25)]">
          <CheckCircle2 size={24} className="text-[#4A7C59]" />
          <div>
            <p className="text-[#F0EEE9] font-semibold">Mission Complete!</p>
            <p className="text-[#8A8F9E] text-sm">+{submission.points_awarded.toLocaleString()} points earned</p>
          </div>
        </div>
      ) : (
        <MissionSubmitForm missionId={mission.id} submissionType={mission.submission_type} missionTitle={mission.title} />
      )}
    </div>
  )
}
