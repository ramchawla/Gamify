'use client'

import { useEffect, useState } from 'react'
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
    const t = setTimeout(() => setShow(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0908] px-6 transition-opacity',
      show ? 'opacity-100 duration-700' : 'opacity-0 duration-0'
    )}>
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none glow-gold" aria-hidden />

      <div className="relative flex flex-col items-center gap-6 text-center max-w-sm">
        <p className="eyebrow text-[#C8902A]">Mission Complete</p>
        <h1 className="font-display text-[24px] text-[#F3EFE6] leading-tight px-4" style={{ fontWeight: 400 }}>
          {missionTitle}
        </h1>

        <div className="count-reveal my-4">
          <p className="font-display tabular text-[#C8902A] leading-none" style={{ fontSize: 72, fontWeight: 400 }}>
            +{points.toLocaleString()}
          </p>
          <p className="eyebrow mt-3">points earned</p>
        </div>

        {rankImproved && (
          <p className="text-[#C6C0B4] text-sm italic">
            You&apos;ve moved up to <span className="text-[#C8902A] not-italic font-medium">#{newRank}</span>.
          </p>
        )}

        <p className="text-[#8A8473] text-sm px-8 leading-relaxed">
          Well done, {' '}
          <span className="text-[#F3EFE6]">The Explorers</span>.
        </p>

        <div className="flex flex-col gap-3 w-full mt-6">
          <Link
            href="/missions"
            className="group w-full flex items-center justify-between py-4 text-[#F3EFE6]"
            style={{ borderTop: '0.5px solid rgba(243,239,230,0.15)', borderBottom: '0.5px solid rgba(243,239,230,0.15)' }}
          >
            <span className="font-display text-[18px]" style={{ fontWeight: 400 }}>Next mission</span>
            <span className="text-[#C8902A] text-xl transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/feed"
            className="w-full text-center py-3 text-[#8A8473] text-sm hover:text-[#C6C0B4] transition-colors"
          >
            View the feed
          </Link>
        </div>
      </div>
    </div>
  )
}
