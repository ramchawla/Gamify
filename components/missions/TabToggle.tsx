'use client'

import { cn } from '@/lib/utils'

interface Props {
  active: 'remaining' | 'completed'
  onToggle: (tab: 'remaining' | 'completed') => void
  remainingCount?: number
  completedCount?: number
}

export default function TabToggle({ active, onToggle, remainingCount, completedCount }: Props) {
  return (
    <div className="flex items-center gap-7 border-b border-[rgba(243,239,230,0.08)]">
      {(['remaining', 'completed'] as const).map((tab) => {
        const count = tab === 'remaining' ? remainingCount : completedCount
        const label = tab === 'remaining' ? 'Remaining' : 'Completed'
        return (
          <button
            key={tab}
            onClick={() => onToggle(tab)}
            className={cn(
              'relative pb-3 flex items-baseline gap-2 text-sm transition-colors',
              active === tab ? 'text-[#F3EFE6] font-medium' : 'text-[#8A8473] hover:text-[#C6C0B4]'
            )}
          >
            {label}
            {count !== undefined && (
              <span className="text-[11px] text-[#4A4540] tabular">{count}</span>
            )}
            <span
              className={cn(
                'absolute left-0 right-0 -bottom-px h-px bg-[#C8902A] transition-opacity',
                active === tab ? 'opacity-100' : 'opacity-0'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
