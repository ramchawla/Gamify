import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const supabase = createAdminClient()

    const { data: teams, error } = await supabase
      .from('teams')
      .select('id,season_id,name,photo_url,total_points,join_code,created_at')
      .eq('season_id', session.season_id)
      .order('total_points', { ascending: false })

    if (error) throw error

    return NextResponse.json(
      { data: teams ?? [] },
      { headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' } }
    )
  } catch (err) {
    console.error('GET /api/leaderboard', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
