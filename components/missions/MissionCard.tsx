import Link from 'next/link'
import type { Mission } from '@/types'
import SubmissionTypeIcon from './SubmissionTypeIcon'
import PointsBadge from './PointsBadge'
import BonusBadge from './BonusBadge'
import { cn } from '@/lib/utils'
import { CheckCircle2, Gem } from 'lucide-react'

interface Props {
  mission: Mission
  completed?: boolean
  className?: string
}

export default function MissionCard({ mission, completed, className }: Props) {
  return (
    <Link
      href={`/missions/${mission.id}`}
      className={cn(
        'flex items-start gap-3 p-4 card card-hover float-in',
        mission.is_hidden_treasure && 'border-[rgba(200,144,42,0.40)] bg-[rgba(200,144,42,0.06)]',
        completed && 'opacity-60',
        className
      )}
    >
      <SubmissionTypeIcon type={mission.submission_type} size={40} />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {mission.is_hidden_treasure && (
              <Gem size={14} className="text-[#C8902A] shrink-0" />
            )}
            <p className="text-[#F0EEE9] font-medium text-[15px] leading-snug truncate">
              {mission.title}
            </p>
          </div>
          {completed && (
            <CheckCircle2 size={18} className="text-[#4A7C59] shrink-0" />
          )}
        </div>

        <p className="text-[#8A8F9E] text-sm leading-snug mt-0.5 line-clamp-2">
          {mission.description}
        </p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <PointsBadge points={mission.points} size="sm" />
          {mission.has_bonus && <BonusBadge description={mission.bonus_description} />}
        </div>
      </div>
    </Link>
  )
}
