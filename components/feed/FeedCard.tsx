'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { FeedSubmission } from '@/types'
import { timeAgo, cn } from '@/lib/utils'
import { isDemoMode } from '@/lib/mock-data'

interface Props {
  submission: FeedSubmission
  myMemberId?: string
}

function teamColor(photoUrl: string | null | undefined): string {
  if (photoUrl?.startsWith('color:')) return photoUrl.slice(6)
  return '#C8902A'
}

export default function FeedCard({ submission, myMemberId: _myMemberId }: Props) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(submission.like_count)

  async function toggleLike() {
    const next = !liked
    setLiked(next)
    setLikeCount(c => c + (next ? 1 : -1))
    if (isDemoMode()) return
    await fetch('/api/feed/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submission_id: submission.id }),
    })
  }

  const color = teamColor(submission.teams?.photo_url)

  return (
    <article
      className="float-in"
      style={{ borderBottom: '0.5px solid rgba(243,239,230,0.09)' }}
    >
      {/* Photo — full bleed, fixed 4:3 aspect, no distortion */}
      {submission.media_url && (
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={submission.media_url}
            alt={submission.caption ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      )}

      {/* Content block */}
      <div className="px-5 pt-4 pb-5 space-y-3">
        {/* Mission title — the story headline */}
        {submission.missions && (
          <h3
            className="font-display text-[#F3EFE6] leading-snug"
            style={{ fontSize: 20, fontWeight: 400 }}
          >
            {submission.missions.title}
          </h3>
        )}

        {/* Caption — italic, secondary */}
        {submission.caption && (
          <p className="text-[#8A8473] text-[14px] leading-relaxed italic">
            &ldquo;{submission.caption}&rdquo;
          </p>
        )}

        {/* Text-only response */}
        {submission.text_response && !submission.media_url && (
          <p
            className="font-display text-[#C6C0B4] leading-relaxed italic"
            style={{ fontSize: 17, fontWeight: 400 }}
          >
            &ldquo;{submission.text_response}&rdquo;
          </p>
        )}

        {/* Byline row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color }}
            />
            <div>
              <p className="text-[#C6C0B4] text-[12px] leading-none">
                {submission.teams?.name ?? 'Team'}
                <span className="text-[#4A4540] mx-1.5">·</span>
                {submission.team_members?.display_name ?? 'Guest'}
              </p>
              <p className="text-[#4A4540] text-[11px] mt-0.5">
                {timeAgo(submission.submitted_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="font-display tabular text-[#C8902A]"
              style={{ fontSize: 13, fontWeight: 400 }}
            >
              +{submission.points_awarded.toLocaleString()}
            </span>

            <button
              onClick={toggleLike}
              className="flex items-center gap-1 cursor-pointer"
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <Heart
                size={13}
                strokeWidth={1.5}
                className={cn('transition-all duration-150', liked ? 'text-[#C8902A] fill-[#C8902A]' : 'text-[#4A4540]')}
              />
              <span className={cn('text-[11px] tabular', liked ? 'text-[#C8902A]' : 'text-[#4A4540]')}>
                {likeCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
