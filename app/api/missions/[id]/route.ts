import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const supabase = createAdminClient()

    const [{ data: mission }, { data: submission }] = await Promise.all([
      supabase.from('missions').select('*').eq('id', id).single(),
      supabase.from('submissions').select('*').eq('mission_id', id).eq('team_id', session.team_id).maybeSingle(),
    ])

    if (!mission) return NextResponse.json({ error: 'Mission not found' }, { status: 404 })

    return NextResponse.json({ data: { mission, existing_submission: submission } })
  } catch (err) {
    console.error('GET /api/missions/[id]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
