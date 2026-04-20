import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function Skeleton({ className }: Props) {
  return (
    <div className={cn('rounded-md bg-[rgba(243,239,230,0.04)] pulse-soft', className)} />
  )
}

export function SkeletonCard({ className }: Props) {
  return (
    <div className={cn('px-5 py-5 space-y-3 hairline', className)}>
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  )
}
