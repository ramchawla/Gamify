'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface Props {
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  label?: string
}

export default function SubmitButton({ loading, disabled, onClick, label = 'Submit Mission' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'group w-full flex items-center justify-between py-4 text-[#F3EFE6] transition-opacity',
        (disabled || loading) && 'opacity-50 cursor-not-allowed'
      )}
      style={{ borderTop: '0.5px solid rgba(243,239,230,0.15)', borderBottom: '0.5px solid rgba(243,239,230,0.15)' }}
    >
      <span className="font-display text-[20px]" style={{ fontWeight: 400 }}>
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#C8902A]" />
            Submitting…
          </span>
        ) : label}
      </span>
      {!loading && (
        <span className="text-[#C8902A] text-xl transition-transform group-hover:translate-x-1">→</span>
      )}
    </button>
  )
}
