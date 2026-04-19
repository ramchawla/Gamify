'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Trophy } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  points: number
  newRank?: number
  prevRank?: number
  missionTitle: string
}

export default function ConfirmationScreen({ points, newRank, prevRank, missionTitle }: Props) {
  const [show, setShow] = useState(false)
  const rankImproved = prevRank && newRank && newRank < prevRank

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0F] px-6 transition-opacity duration-500',
      show ? 'opacity-100' : 'opacity-0'
    )}>
      <div className="flex flex-col items-center gap-6 text-center">
        <CheckCircle2 size={64} className="text-[#4A7C59]" strokeWidth={1.5} />

        <div>
          <p className="text-[#8A8F9E] text-sm uppercase tracking-widest mb-1">Mission Complete</p>
          <h1 className="text-2xl font-bold text-[#F0EEE9]">{missionTitle}</h1>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-5xl font-bold text-[#C8902A]">+{points.toLocaleString()}</span>
          <span className="text-[#8A8F9E] text-sm">points earned</span>
        </div>

        {rankImproved && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,144,42,0.12)] border border-[rgba(200,144,42,0.40)]">
            <Trophy size={16} className="text-[#C8902A]" />
            <span className="text-sm font-medium text-[#C8902A]">
              Moved up to #{newRank}!
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full mt-4">
          <Link
            href="/missions"
            className="w-full h-12 rounded-full bg-[#C8902A] text-[#0D0D0F] font-semibold flex items-center justify-center hover:bg-[#EAB308] transition-colors"
          >
            Next Mission
          </Link>
          <Link
            href="/feed"
            className="w-full h-12 rounded-full border border-[rgba(255,255,255,0.12)] text-[#F0EEE9] font-medium flex items-center justify-center hover:border-[rgba(255,255,255,0.25)] transition-colors"
          >
            View Feed
          </Link>
        </div>
      </div>
    </div>
  )
}
