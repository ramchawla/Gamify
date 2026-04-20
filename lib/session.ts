import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import type { NomaSess } from '@/types'
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/constants'
import { DEMO_SESSION, isDemoMode } from '@/lib/mock-data'

// Read session from request (API routes)
export function getSession(req: NextRequest): NomaSess | null {
  const raw = req.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!raw) return isDemoMode() ? DEMO_SESSION : null
  try {
    return JSON.parse(raw) as NomaSess
  } catch {
    return isDemoMode() ? DEMO_SESSION : null
  }
}

// Read session in server components / server actions
export async function getServerSession(): Promise<NomaSess | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!raw) return isDemoMode() ? DEMO_SESSION : null
  try {
    return JSON.parse(raw) as NomaSess
  } catch {
    return isDemoMode() ? DEMO_SESSION : null
  }
}

// Write session cookie in API route responses
export function sessionCookieHeader(session: NomaSess): string {
  const value = JSON.stringify(session)
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`
}
