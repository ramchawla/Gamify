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
        'font-semibold text-[#C8902A] rounded-full border border-[rgba(200,144,42,0.30)] bg-[rgba(200,144,42,0.10)]',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1',
        className
      )}
    >
      {points.toLocaleString()} pts
    </span>
  )
}
