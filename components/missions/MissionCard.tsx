import Link from 'next/link'
import type { Mission } from '@/types'
import PointsBadge from './PointsBadge'
import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

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
        'group block px-5 py-5 hairline transition-colors hover:bg-[rgba(243,239,230,0.02)]',
        completed && 'opacity-55',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[#F3EFE6] text-[17px] leading-tight">
              {mission.title}
            </h3>
            {completed && (
              <CheckCircle2 size={15} className="text-[#8A9B70] shrink-0" strokeWidth={1.5} />
            )}
          </div>
          <p className="text-[#8A8473] text-[13px] leading-relaxed mt-1.5 line-clamp-1">
            {mission.description}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <PointsBadge points={mission.points} size="sm" />
          </div>
        </div>
        <span className="text-[#4A4540] transition-colors group-hover:text-[#C8902A] mt-1">→</span>
      </div>
    </Link>
  )
}
