import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tab = req.nextUrl.searchParams.get('tab') ?? 'remaining'

  try {
    const supabase = createAdminClient()

    const [{ data: missions }, { data: submissions }] = await Promise.all([
      supabase.from('missions').select('*').eq('season_id', session.season_id).order('category').order('display_order'),
      supabase.from('submissions').select('mission_id').eq('team_id', session.team_id),
    ])

    const completedIds = new Set((submissions ?? []).map(s => s.mission_id))

    const filtered = (missions ?? []).filter(m =>
      tab === 'completed' ? completedIds.has(m.id) : !completedIds.has(m.id)
    )

    return NextResponse.json({ data: filtered, completed_ids: [...completedIds] })
  } catch (err) {
    console.error('GET /api/missions', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
