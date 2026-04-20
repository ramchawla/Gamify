'use client'

import { useEffect, useState, useCallback } from 'react'
import { LEADERBOARD_POLL_INTERVAL } from '@/lib/constants'
import { isDemoMode } from '@/lib/mock-data'
import type { Team } from '@/types'

export function useLeaderboardPoll(initialTeams: Team[]) {
  const [teams, setTeams] = useState(initialTeams)

  const poll = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard', { cache: 'no-store' })
      if (!res.ok) return
      const json = await res.json()
      if (json.data) setTeams(json.data)
    } catch {
      // silently fail
    }
  }, [])

  useEffect(() => {
    if (isDemoMode()) return
    const id = setInterval(poll, LEADERBOARD_POLL_INTERVAL)
    return () => clearInterval(id)
  }, [poll])

  return teams
}
