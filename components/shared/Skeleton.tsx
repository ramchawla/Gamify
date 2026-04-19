import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function Skeleton({ className }: Props) {
  return (
    <div className={cn('rounded-lg bg-[rgba(255,255,255,0.06)] shimmer', className)} />
  )
}

export function SkeletonCard({ className }: Props) {
  return (
    <div className={cn('card p-4 space-y-3', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}
