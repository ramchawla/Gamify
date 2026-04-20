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
      <div className="px-6 py-16 text-center">
        <p className="text-[#8A8473] text-sm italic">
          The field notes are empty. Be the first to write one.
        </p>
      </div>
    )
  }

  return (
    <div className="stagger">
      {items.map(item => (
        <FeedCard key={item.id} submission={item} myMemberId={myMemberId} />
      ))}
    </div>
  )
}
