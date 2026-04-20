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
    <div
      className="flex items-baseline gap-3 py-3"
      style={{ borderBottom: '0.5px solid rgba(243,239,230,0.08)' }}
    >
      <span
        className={cn(
          'w-1 h-1 rounded-full shrink-0',
          reached ? 'bg-[#C8902A]' : 'bg-[rgba(243,239,230,0.18)]'
        )}
      />
      <span className={cn('text-sm flex-1', reached ? 'text-[#F3EFE6]' : 'text-[#8A8473]')}>
        {threshold}% complete
      </span>
      <span className={cn('font-display tabular text-[13px]', reached ? 'text-[#C8902A]' : 'text-[#8A8473]')} style={{ fontWeight: 400 }}>
        {targetCount} missions
      </span>
    </div>
  )
}
