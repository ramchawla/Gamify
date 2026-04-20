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

  return (
    <article className="float-in border-b border-[rgba(243,239,230,0.08)] py-7 px-6">
      {/* Byline */}
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="eyebrow truncate">
            {submission.teams?.name ?? 'Team'}
          </p>
          <p className="text-[#8A8473] text-[11px] mt-1">
            {submission.team_members?.display_name ?? 'A guest'} · {timeAgo(submission.submitted_at)}
          </p>
        </div>
        <span className="font-display tabular text-[#C8902A] text-[14px] shrink-0" style={{ fontWeight: 400 }}>
          +{submission.points_awarded.toLocaleString()}
        </span>
      </div>

      {/* Mission title — serif, the headline of the note */}
      {submission.missions && (
        <h3 className="font-display text-[#F3EFE6] text-[20px] leading-snug mb-4" style={{ fontWeight: 400 }}>
          {submission.missions.title}
        </h3>
      )}

      {/* Photo */}
      {submission.media_url && (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-4">
          <Image
            src={submission.media_url}
            alt={submission.caption ?? 'Submission photo'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      )}

      {/* Text response */}
      {submission.text_response && !submission.media_url && (
        <p className="text-[#C6C0B4] text-[15px] leading-relaxed italic font-display mb-4" style={{ fontWeight: 400 }}>
          &ldquo;{submission.text_response}&rdquo;
        </p>
      )}

      {/* Caption */}
      {submission.caption && (
        <p className="text-[#C6C0B4] text-[14px] leading-relaxed italic">
          &ldquo;{submission.caption}&rdquo;
        </p>
      )}

      {/* Like row — minimal, right-aligned */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1.5 text-xs text-[#8A8473] transition-colors"
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={cn('transition-all', liked ? 'text-[#C8902A] fill-[#C8902A]' : '')}
          />
          <span className={cn('tabular', liked && 'text-[#C8902A]')}>{likeCount}</span>
        </button>
      </div>
    </article>
  )
}
