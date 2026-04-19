'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { WrappedRecord, WrappedCard } from '@/types'
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS } from '@/lib/constants'
import type { CategoryName } from '@/types'

interface Props {
  initialWrapped: WrappedRecord | null
}

export default function WrappedClient({ initialWrapped }: Props) {
  const router = useRouter()
  const [wrapped, setWrapped] = useState<WrappedRecord | null>(initialWrapped)
  const [cardIdx, setCardIdx] = useState(0)
  const [loading, setLoading] = useState(!initialWrapped)

  useEffect(() => {
    if (initialWrapped) return
    fetch('/api/wrapped')
      .then(r => r.json())
      .then(json => { if (json.data) setWrapped(json.data) })
      .finally(() => setLoading(false))
  }, [initialWrapped])

  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <p className="text-[#8A8F9E]">Generating your Season Recap…</p>
      </div>
    )
  }

  if (!wrapped) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-[#F0EEE9] font-semibold">Season Recap</p>
        <p className="text-[#8A8F9E] text-sm">Complete some missions first to unlock your season recap!</p>
        <button onClick={() => router.push('/missions')} className="px-6 py-2.5 rounded-full bg-[#C8902A] text-[#0D0D0F] font-semibold text-sm">
          Go to Missions
        </button>
      </div>
    )
  }

  const cards = wrapped.cards_json
  const card = cards[cardIdx]

  return (
    <div className="min-h-svh flex flex-col">
      {/* Progress dots */}
      <div className="flex gap-1.5 px-6 pt-8 pb-4">
        {cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-0.5 rounded-full transition-colors',
              i <= cardIdx ? 'bg-[#C8902A]' : 'bg-[rgba(255,255,255,0.15)]'
            )}
          />
        ))}
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <WrappedCardDisplay card={card} wrapped={wrapped} />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-10 pt-4">
        <button
          onClick={() => setCardIdx(i => Math.max(0, i - 1))}
          disabled={cardIdx === 0}
          className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[#8A8F9E] disabled:opacity-30 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        {cardIdx === cards.length - 1 ? (
          <button
            onClick={() => router.push('/home')}
            className="px-6 py-2.5 rounded-full bg-[#C8902A] text-[#0D0D0F] font-semibold text-sm"
          >
            Back to Home
          </button>
        ) : (
          <button
            onClick={() => setCardIdx(i => Math.min(cards.length - 1, i + 1))}
            className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#F0EEE9] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CardData = Record<string, any>

function WrappedCardDisplay({ card, wrapped }: { card: WrappedCard; wrapped: WrappedRecord }) {
  const d = card.data as CardData

  switch (card.type) {
    case 'intro':
      return (
        <div className="text-center space-y-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Season Recap</p>
          <h1 className="text-4xl font-bold text-[#F0EEE9]">{d.team_name as string}</h1>
          <p className="text-[#8A8F9E]">{d.season_title as string}</p>
          <div className="w-16 h-0.5 bg-[#C8902A] mx-auto rounded-full" />
          <p className="text-[#8A8F9E] text-sm">Swipe to see your season →</p>
        </div>
      )

    case 'stats':
      return (
        <div className="text-center space-y-6 w-full">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Your Season in Numbers</p>
          <div className="text-7xl font-bold text-[#C8902A]">{(d.total_points as number).toLocaleString()}</div>
          <p className="text-[#8A8F9E]">total points</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="card p-4 text-center">
              <div className="text-3xl font-bold text-[#F0EEE9]">#{d.rank as number}</div>
              <div className="text-xs text-[#8A8F9E] mt-1">of {d.total_teams as number} teams</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-3xl font-bold text-[#F0EEE9]">{d.missions_completed as number}</div>
              <div className="text-xs text-[#8A8F9E] mt-1">missions done</div>
            </div>
          </div>
        </div>
      )

    case 'best_moment':
      return (
        <div className="text-center space-y-4 w-full">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Best Moment</p>
          <h2 className="text-2xl font-bold text-[#F0EEE9]">{(d.mission_title as string) ?? 'Your top mission'}</h2>
          {d.media_url && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.media_url as string} alt="Best moment" className="w-full h-full object-cover" />
            </div>
          )}
          {d.caption && <p className="text-[#F0EEE9] text-sm italic">"{d.caption as string}"</p>}
          <p className="text-[#C8902A] font-semibold">+{(d.points as number)?.toLocaleString()} pts</p>
        </div>
      )

    case 'labels':
      return (
        <div className="text-center space-y-4 w-full">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Your Style</p>
          {d.top_category && (
            <>
              <p className="text-[#8A8F9E] text-sm">You excelled at</p>
              <div className="inline-block px-6 py-3 rounded-full bg-[rgba(200,144,42,0.12)] border border-[rgba(200,144,42,0.40)]">
                <span className="text-[#C8902A] font-semibold text-lg">
                  {CATEGORY_LABELS[d.top_category as CategoryName] ?? d.top_category as string}
                </span>
              </div>
            </>
          )}
          <p className="text-[#8A8F9E] text-sm mt-4">missions</p>
        </div>
      )

    case 'share':
      return (
        <div className="text-center space-y-6 w-full">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Share Your Season</p>
          <div className="card p-6 space-y-3">
            <h2 className="text-2xl font-bold text-[#F0EEE9]">{wrapped.team_id && d.team_name as string}</h2>
            <p className="text-5xl font-bold text-[#C8902A]">{(d.total_points as number).toLocaleString()} pts</p>
            <p className="text-[#8A8F9E]">Ranked #{d.rank as number} · Noma Resorts $10K Challenge</p>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'My Noma Season Recap', text: `${d.team_name} scored ${(d.total_points as number).toLocaleString()} points and ranked #${d.rank}!` })
              }
            }}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full border border-[rgba(255,255,255,0.20)] text-[#F0EEE9] font-medium text-sm"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      )
  }
}
