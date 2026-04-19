import type { CategoryName } from '@/types'

export const CATEGORY_LABELS: Record<CategoryName, string> = {
  at_home:       'At Home',
  in_community:  'In Community',
  near_yosemite: 'Near Yosemite',
  sierra_byway:  'Sierra Byway',
  noma_property: 'Noma Property',
}

export const CATEGORY_ORDER: CategoryName[] = [
  'at_home',
  'in_community',
  'near_yosemite',
  'sierra_byway',
  'noma_property',
]

export const MILESTONE_THRESHOLDS = [25, 50, 75, 100] as const

export const FEED_POLL_INTERVAL        = 60_000  // 60s
export const LEADERBOARD_POLL_INTERVAL = 30_000  // 30s

export const SESSION_COOKIE_NAME = 'noma_session'
export const SESSION_MAX_AGE     = 60 * 60 * 24 * 90 // 90 days in seconds

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
export const SEASON_ID = process.env.NEXT_PUBLIC_SEASON_ID ?? ''
