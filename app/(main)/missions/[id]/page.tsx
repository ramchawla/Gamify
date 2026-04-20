import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/session'
import { getMission } from '@/lib/data'
import PointsBadge from '@/components/missions/PointsBadge'
import MissionSubmitForm from './MissionSubmitForm'
import { CheckCircle2, ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession()
  if (!session) return null

  const { mission, completed } = await getMission(id)
  if (!mission) notFound()

  return (
    <div className="pb-12">
      {/* Hero imagery */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src="/images/hero-adventure.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.30) 0%, rgba(10,9,8,0.15) 40%, rgba(10,9,8,0.98) 100%)',
          }}
        />
        <Link
          href="/missions"
          aria-label="Back"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[rgba(10,9,8,0.45)] backdrop-blur-md flex items-center justify-center text-[#F3EFE6] border border-[rgba(243,239,230,0.1)]"
        >
          <ChevronLeft size={18} />
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow text-[#C8902A]">Mission</p>
          <h1 className="font-display text-[30px] text-[#F3EFE6] leading-[1.1] mt-2 max-w-[92%]" style={{ fontWeight: 400 }}>
            {mission.title}
          </h1>
          <div className="mt-3">
            <PointsBadge points={mission.points} />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6 max-w-lg mx-auto float-in">
        <p className="text-[#F3EFE6] text-[15px] leading-relaxed">
          {mission.description}
        </p>

        {mission.tips && (
          <div className="pt-5" style={{ borderTop: '0.5px solid rgba(243,239,230,0.08)' }}>
            <p className="eyebrow mb-2">A tip</p>
            <p className="text-[#C6C0B4] text-[14px] leading-relaxed italic">
              {mission.tips}
            </p>
          </div>
        )}

        <div className="pt-3">
          {completed ? (
            <div className="flex items-center gap-3 p-5 rounded-xl bg-[rgba(74,124,89,0.08)] border border-[rgba(74,124,89,0.25)]">
              <CheckCircle2 size={22} className="text-[#8A9B70]" strokeWidth={1.5} />
              <div>
                <p className="text-[#F3EFE6] font-medium">Mission complete</p>
                <p className="text-[#8A8473] text-sm">
                  +{mission.points.toLocaleString()} points earned
                </p>
              </div>
            </div>
          ) : (
            <MissionSubmitForm
              missionId={mission.id}
              submissionType={mission.submission_type}
              missionTitle={mission.title}
              missionPoints={mission.points}
            />
          )}
        </div>
      </div>
    </div>
  )
}
