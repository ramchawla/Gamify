import { cn } from '@/lib/utils'

interface Props {
  value: string | number
  label: string
  className?: string
  gold?: boolean
}

export default function StatChip({ value, label, className, gold }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-full',
        gold ? 'bg-[rgba(200,144,42,0.12)] border border-[rgba(200,144,42,0.40)]'
              : 'bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]',
        className
      )}
    >
      <span className={cn('text-lg font-semibold leading-none', gold ? 'text-[#C8902A]' : 'text-[#F0EEE9]')}>
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-widest text-[#8A8F9E]">
        {label}
      </span>
    </div>
  )
}
