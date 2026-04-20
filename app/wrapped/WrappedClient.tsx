'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { WrappedRecord, WrappedCard, CategoryName } from '@/types'
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS } from '@/lib/constants'

interface Props {
  initialWrapped: WrappedRecord | null
}

export default function WrappedClient({ initialWrapped }: Props) {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true)
  const [cardIdx, setCardIdx] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-advance from intro after 3.5s; allow tap-to-skip
  useEffect(() => {
    if (!showIntro) return
    const t = setTimeout(() => setShowIntro(false), 3500)
    return () => clearTimeout(t)
  }, [showIntro])

  if (!initialWrapped) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center gap-4">
        <p className="eyebrow">Season Recap</p>
        <p className="text-[#8A8473] text-sm italic">Complete a mission first to unlock your season recap.</p>
        <button
          onClick={() => router.push('/missions')}
          className="mt-4 text-[#C8902A] text-sm underline underline-offset-4"
        >
          Go to missions →
        </button>
      </div>
    )
  }

  if (showIntro) {
    return (
      <button
        onClick={() => setShowIntro(false)}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0908] text-center px-6 cursor-pointer"
        aria-label="Start season recap"
      >
        <video
          ref={videoRef}
          src="/images/globe-rotation.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,9,8,0.60)] via-[rgba(10,9,8,0.30)] to-[rgba(10,9,8,0.85)]" aria-hidden />

        <div className="relative flex flex-col items-center gap-4 float-in">
          <p className="eyebrow text-[#C8902A]">Your Season</p>
          <h1 className="font-display text-[40px] text-[#F3EFE6] leading-tight max-w-sm" style={{ fontWeight: 400 }}>
            A season of quiet adventure
          </h1>
          <p className="text-[#C6C0B4] text-sm italic mt-2">Tap anywhere to begin</p>
        </div>
      </button>
    )
  }

  const cards = initialWrapped.cards_json
  const card = cards[cardIdx]

  return (
    <div className="min-h-svh flex flex-col">
      {/* Progress hairlines */}
      <div className="flex gap-1.5 px-6 pt-8 pb-6">
        {cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-px transition-colors',
              i <= cardIdx ? 'bg-[#C8902A]' : 'bg-[rgba(243,239,230,0.12)]'
            )}
          />
        ))}
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div key={cardIdx} className="float-in w-full">
          <WrappedCardDisplay card={card} wrapped={initialWrapped} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-12 pt-6">
        <button
          onClick={() => setCardIdx(i => Math.max(0, i - 1))}
          disabled={cardIdx === 0}
          className="w-11 h-11 rounded-full border border-[rgba(243,239,230,0.15)] flex items-center justify-center text-[#C6C0B4] disabled:opacity-25 transition-opacity"
          aria-label="Previous"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        <span className="eyebrow text-[#8A8473]">
          {cardIdx + 1} / {cards.length}
        </span>

        {cardIdx === cards.length - 1 ? (
          <button
            onClick={() => router.push('/home')}
            className="text-[#C8902A] font-display text-[16px] px-4"
            style={{ fontWeight: 400 }}
          >
            Done →
          </button>
        ) : (
          <button
            onClick={() => setCardIdx(i => Math.min(cards.length - 1, i + 1))}
            className="w-11 h-11 rounded-full border border-[rgba(200,144,42,0.40)] bg-[rgba(200,144,42,0.06)] flex items-center justify-center text-[#C8902A] transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}

type CardData = Record<string, unknown>

function WrappedCardDisplay({ card, wrapped: _wrapped }: { card: WrappedCard; wrapped: WrappedRecord }) {
  const d = card.data as CardData

  switch (card.type) {
    case 'intro':
      return (
        <div className="text-center space-y-5">
          <p className="eyebrow">Season Recap</p>
          <h1 className="font-display text-[36px] text-[#F3EFE6] leading-tight" style={{ fontWeight: 400 }}>
            {d.team_name as string}
          </h1>
          <p className="text-[#8A8473] text-sm italic">{d.season_title as string}</p>
          <div className="w-12 h-px bg-[#C8902A] mx-auto mt-4" />
          <p className="font-display text-[#C6C0B4] text-[18px] italic max-w-xs mx-auto" style={{ fontWeight: 400 }}>
            {d.tagline as string}
          </p>
        </div>
      )

    case 'stats':
      return (
        <div className="text-center space-y-8 w-full">
          <p className="eyebrow">The Season in Numbers</p>
          <div className="count-reveal">
            <p
              className="font-display tabular text-[#C8902A] leading-none"
              style={{ fontSize: 88, fontWeight: 400 }}
            >
              {(d.total_points as number).toLocaleString()}
            </p>
            <p className="eyebrow mt-3">points earned</p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <p className="font-display tabular text-[#F3EFE6] text-[32px]" style={{ fontWeight: 400 }}>
                #{d.rank as number}
              </p>
              <p className="eyebrow mt-1">of {d.total_teams as number} teams</p>
            </div>
            <div>
              <p className="font-display tabular text-[#F3EFE6] text-[32px]" style={{ fontWeight: 400 }}>
                {d.missions_completed as number}
              </p>
              <p className="eyebrow mt-1">missions done</p>
            </div>
          </div>
        </div>
      )

    case 'best_moment':
      return (
        <div className="space-y-5 w-full">
          <div className="text-center">
            <p className="eyebrow">Your Best Moment</p>
            <h2 className="font-display text-[#F3EFE6] text-[22px] leading-snug mt-2" style={{ fontWeight: 400 }}>
              {d.mission_title as string}
            </h2>
          </div>
          {Boolean(d.media_url) && (
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={d.media_url as string}
                alt={(d.mission_title as string) ?? 'Best moment'}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}
          {Boolean(d.caption) && (
            <p className="font-display text-[#C6C0B4] text-[16px] italic leading-relaxed text-center px-4" style={{ fontWeight: 400 }}>
              &ldquo;{d.caption as string}&rdquo;
            </p>
          )}
          <p className="text-center font-display tabular text-[#C8902A] text-[20px]" style={{ fontWeight: 400 }}>
            +{(d.points as number)?.toLocaleString()}
          </p>
        </div>
      )

    case 'labels':
      return (
        <div className="text-center space-y-5 w-full">
          <p className="eyebrow">Your Style</p>
          <p className="font-display text-[#C8902A] text-[40px] leading-tight" style={{ fontWeight: 400 }}>
            {(d.label_name as string) ?? CATEGORY_LABELS[d.top_category as CategoryName]}
          </p>
          <div className="w-12 h-px bg-[#C8902A] mx-auto" />
          <p className="font-display text-[#C6C0B4] text-[17px] italic leading-relaxed max-w-sm mx-auto" style={{ fontWeight: 400 }}>
            {(d.label_poetic as string) ?? 'You found your rhythm out there.'}
          </p>
          {Boolean(d.top_category) && (
            <p className="eyebrow mt-4">
              Strongest in {CATEGORY_LABELS[d.top_category as CategoryName]}
            </p>
          )}
        </div>
      )

    case 'share':
      return (
        <div className="w-full space-y-8">
          <div className="text-center">
            <p className="eyebrow">Share Your Season</p>
          </div>

          {/* Share card — editorial plaque */}
          <div
            className="px-8 py-10 text-center space-y-3"
            style={{
              borderTop: '0.5px solid rgba(200,144,42,0.40)',
              borderBottom: '0.5px solid rgba(200,144,42,0.40)',
              background: 'linear-gradient(180deg, rgba(200,144,42,0.04) 0%, rgba(10,9,8,0) 100%)',
            }}
          >
            <p className="eyebrow text-[#C8902A]">Noma Resorts · $10K Challenge</p>
            <h2 className="font-display text-[#F3EFE6] text-[24px] leading-tight pt-2" style={{ fontWeight: 400 }}>
              {d.team_name as string}
            </h2>
            <p className="font-display tabular text-[#C8902A] text-[52px] leading-none" style={{ fontWeight: 400 }}>
              {(d.total_points as number).toLocaleString()}
            </p>
            <p className="eyebrow">points</p>
            <p className="text-[#C6C0B4] text-sm italic mt-2">
              Finished #{d.rank as number} of 8 teams
            </p>
          </div>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator.share({
                  title: 'Our Noma Season',
                  text: `${d.team_name} — ${(d.total_points as number).toLocaleString()} points, ranked #${d.rank} · Noma $10K Challenge`,
                }).catch(() => {})
              }
            }}
            className="w-full flex items-center justify-between py-4 text-[#F3EFE6]"
            style={{ borderTop: '0.5px solid rgba(243,239,230,0.15)', borderBottom: '0.5px solid rgba(243,239,230,0.15)' }}
          >
            <span className="font-display text-[18px]" style={{ fontWeight: 400 }}>Share the season</span>
            <Share2 size={16} strokeWidth={1.5} className="text-[#C8902A]" />
          </button>
        </div>
      )

    default:
      return null
  }
}
