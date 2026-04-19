import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  threshold: number
  completedCount: number
  totalMissions: number
}

export default function MilestoneRow({ threshold, completedCount, totalMissions }: Props) {
  const targetCount = Math.ceil((threshold / 100) * totalMissions)
  const reached = completedCount >= targetCount

  return (
    <div className={cn(
      'flex items-center gap-3 py-2.5',
      reached ? 'opacity-100' : 'opacity-50'
    )}>
      {reached
        ? <CheckCircle2 size={20} className="text-[#4A7C59] shrink-0" />
        : <Circle size={20} className="text-[#4A4F61] shrink-0" />
      }
      <span className="text-sm text-[#F0EEE9]">
        {threshold}% Complete — {targetCount} missions
      </span>
      {reached && (
        <span className="ml-auto text-[11px] text-[#4A7C59] font-medium uppercase tracking-wide">Reached</span>
      )}
    </div>
  )
}
