import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0', 10)

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('submissions')
      .select(`
        id, mission_id, team_id, member_id, status, media_url, text_response,
        caption, points_awarded, like_count, submitted_at,
        missions ( title ),
        teams ( name, photo_url ),
        team_members ( display_name )
      `)
      .order('submitted_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (error) throw error

    return NextResponse.json({ data: data ?? [] })
  } catch (err) {
    console.error('GET /api/feed', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
