'use client'

import FeedCard from '@/components/feed/FeedCard'
import { useFeedPoll } from '@/hooks/useFeedPoll'
import type { FeedSubmission } from '@/types'

interface Props {
  initialItems: FeedSubmission[]
  myMemberId: string
}

export default function FeedClient({ initialItems, myMemberId }: Props) {
  const items = useFeedPoll(initialItems)

  if (!items.length) {
    return (
      <div className="px-4 py-12 text-center text-[#8A8F9E]">
        No submissions yet. Complete a mission to be the first!
      </div>
    )
  }

  return (
    <div className="px-4 space-y-4 stagger">
      {items.map(item => (
        <FeedCard key={item.id} submission={item} myMemberId={myMemberId} />
      ))}
    </div>
  )
}
