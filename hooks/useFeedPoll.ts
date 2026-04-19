'use client'

import { useEffect, useState, useCallback } from 'react'
import { FEED_POLL_INTERVAL } from '@/lib/constants'
import type { FeedSubmission } from '@/types'

export function useFeedPoll(initialItems: FeedSubmission[]) {
  const [items, setItems] = useState(initialItems)

  const poll = useCallback(async () => {
    try {
      const res = await fetch('/api/feed?page=0', { cache: 'no-store' })
      if (!res.ok) return
      const json = await res.json()
      if (json.data) setItems(json.data as FeedSubmission[])
    } catch {
      // silently fail — stale data is fine
    }
  }, [])

  useEffect(() => {
    const id = setInterval(poll, FEED_POLL_INTERVAL)
    return () => clearInterval(id)
  }, [poll])

  return items
}
