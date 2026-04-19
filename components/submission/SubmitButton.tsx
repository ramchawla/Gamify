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
        'w-full h-12 rounded-full font-semibold text-base transition-all',
        'bg-[#C8902A] text-[#0D0D0F]',
        'hover:bg-[#EAB308] active:scale-95',
        (disabled || loading) && 'opacity-50 cursor-not-allowed active:scale-100'
      )}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 size={18} className="animate-spin" />
          Submitting…
        </span>
      ) : label}
    </button>
  )
}
