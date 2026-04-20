import { cn } from '@/lib/utils'

interface Props {
  points: number
  className?: string
  size?: 'sm' | 'md'
}

export default function PointsBadge({ points, className, size = 'md' }: Props) {
  return (
    <span
      className={cn(
        'font-display tabular text-[#C8902A] leading-none',
        size === 'sm' ? 'text-[13px]' : 'text-[15px]',
        className
      )}
      style={{ fontWeight: 400 }}
    >
      +{points.toLocaleString()} <span className="eyebrow !text-[9px] !ml-0.5 !tracking-[0.18em] text-[#8A8473] font-normal">pts</span>
    </span>
  )
}
