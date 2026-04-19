import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const supabase = createAdminClient()

    const [
      { data: team },
      { data: members },
      { data: submissions },
      { data: ranked },
    ] = await Promise.all([
      supabase.from('teams').select('*').eq('id', session.team_id).single(),
      supabase.from('team_members').select('*').eq('team_id', session.team_id),
      supabase.from('submissions').select(`
        id, mission_id, media_url, text_response, caption,
        points_awarded, like_count, submitted_at,
        missions ( title, category, points )
      `).eq('team_id', session.team_id).order('submitted_at', { ascending: false }),
      supabase.from('teams').select('id,total_points').eq('season_id', session.season_id).order('total_points', { ascending: false }),
    ])

    const rank = (ranked ?? []).findIndex(t => t.id === session.team_id) + 1

    return NextResponse.json({
      data: {
        team,
        members: members ?? [],
        submissions: submissions ?? [],
        rank,
        total_teams: (ranked ?? []).length,
      },
    })
  } catch (err) {
    console.error('GET /api/profile', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
