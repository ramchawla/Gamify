'use client'

import { useEffect, useState } from 'react'
import type { NomaSess } from '@/types'
import { SESSION_COOKIE_NAME } from '@/lib/constants'

export function useSession(): NomaSess | null {
  const [session, setSession] = useState<NomaSess | null>(null)

  useEffect(() => {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${SESSION_COOKIE_NAME}=`))
    if (!match) return
    try {
      const raw = decodeURIComponent(match.split('=')[1])
      setSession(JSON.parse(raw))
    } catch {
      setSession(null)
    }
  }, [])

  return session
}
