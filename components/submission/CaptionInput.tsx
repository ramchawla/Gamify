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
    <div className="space-y-1.5">
      <p className="eyebrow">Caption</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value.slice(0, MAX))}
        placeholder={placeholder ?? 'Add a caption…'}
        disabled={disabled}
        rows={3}
        className={cn('w-full resize-none input-editorial leading-relaxed py-3', disabled && 'opacity-50')}
      />
      <div className="flex justify-end">
        <span className={cn('text-[11px] tabular', warn ? 'text-[#C87461]' : 'text-[#4A4540]')}>
          {remaining}
        </span>
      </div>
    </div>
  )
}
