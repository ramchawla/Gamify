'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { FeedSubmission } from '@/types'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

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
    await fetch('/api/feed/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submission_id: submission.id }),
    })
  }

  return (
    <article className="card float-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="w-8 h-8 rounded-full bg-[#C8902A] flex items-center justify-center text-xs font-semibold text-[#0D0D0F]">
          {(submission.teams?.name ?? 'T')[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#F0EEE9] text-sm font-medium truncate">
            {submission.team_members?.display_name ?? 'Unknown'}
            <span className="text-[#8A8F9E] font-normal"> · {submission.teams?.name}</span>
          </p>
          <p className="text-[#8A8F9E] text-xs">{timeAgo(submission.submitted_at)}</p>
        </div>
        <span className="text-xs font-semibold text-[#C8902A] shrink-0">
          +{submission.points_awarded.toLocaleString()} pts
        </span>
      </div>

      {/* Mission label */}
      {submission.missions && (
        <p className="px-4 text-[11px] font-medium uppercase tracking-widest text-[#4A4F61] mb-2">
          {submission.missions.title}
        </p>
      )}

      {/* Photo */}
      {submission.media_url && (
        <div className="relative w-full aspect-square bg-[#1A1F2E]">
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
        <div className="mx-4 mb-3 px-4 py-3 rounded-xl bg-[rgba(74,124,89,0.10)] border border-[rgba(74,124,89,0.20)]">
          <p className="text-[#F0EEE9] text-sm leading-relaxed">{submission.text_response}</p>
        </div>
      )}

      {/* Caption + likes */}
      <div className="px-4 pb-4 pt-3 flex items-start justify-between gap-3">
        <p className="text-[#F0EEE9] text-sm leading-relaxed flex-1">
          {submission.caption}
        </p>
        <button
          onClick={toggleLike}
          className="flex items-center gap-1.5 shrink-0 text-sm transition-colors"
        >
          <Heart
            size={18}
            className={cn('transition-all', liked ? 'text-red-400 fill-red-400' : 'text-[#8A8F9E]')}
          />
          <span className={cn('text-xs', liked ? 'text-red-400' : 'text-[#8A8F9E]')}>
            {likeCount}
          </span>
        </button>
      </div>
    </article>
  )
}
