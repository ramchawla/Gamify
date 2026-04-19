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
    <div className="flex gap-1 p-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]">
      {(['remaining', 'completed'] as const).map((tab) => {
        const count = tab === 'remaining' ? remainingCount : completedCount
        return (
          <button
            key={tab}
            onClick={() => onToggle(tab)}
            className={cn(
              'flex-1 py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-150',
              active === tab
                ? 'bg-[#C8902A] text-[#0D0D0F]'
                : 'text-[#8A8F9E] hover:text-[#F0EEE9]'
            )}
          >
            {tab === 'remaining' ? 'Remaining' : 'Completed'}
            {count !== undefined && (
              <span className={cn(
                'ml-1.5 text-xs',
                active === tab ? 'text-[rgba(13,13,15,0.7)]' : 'text-[#4A4F61]'
              )}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
