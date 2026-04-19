'use client'

import { cn } from '@/lib/utils'

const MAX = 140

interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function CaptionInput({ value, onChange, placeholder, disabled }: Props) {
  const remaining = MAX - value.length
  const warn = remaining < 20

  return (
    <div className="space-y-1">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value.slice(0, MAX))}
        placeholder={placeholder ?? 'Add a caption…'}
        disabled={disabled}
        rows={3}
        className={cn(
          'w-full resize-none rounded-xl px-4 py-3 text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-[#F0EEE9] placeholder:text-[#4A4F61] focus:outline-none focus:border-[rgba(200,144,42,0.50)] transition-colors',
          disabled && 'opacity-50'
        )}
      />
      <div className="flex justify-end">
        <span className={cn('text-xs', warn ? 'text-[#F87171]' : 'text-[#4A4F61]')}>
          {remaining}
        </span>
      </div>
    </div>
  )
}
