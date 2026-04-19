import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const supabase = createAdminClient()

    const [{ data: season }, { data: team }, { data: ranked }, { count: completedCount }, { data: recentActivity }] =
      await Promise.all([
        supabase.from('seasons').select('id,title,organizer_name,prize_description,start_date,end_date,status,total_missions,background_image_url,accent_color').eq('status', 'active').single(),
        supabase.from('teams').select('id,name,photo_url,total_points,join_code').eq('id', session.team_id).single(),
        supabase.from('teams').select('id,total_points').order('total_points', { ascending: false }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('team_id', session.team_id),
        supabase.from('submissions').select('id,caption,points_awarded,submitted_at,media_url,missions(title),team_members(display_name)').eq('team_id', session.team_id).order('submitted_at', { ascending: false }).limit(2),
      ])

    if (!season || !team) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const rank = (ranked ?? []).findIndex(t => t.id === session.team_id) + 1

    return NextResponse.json({
      data: {
        season,
        team,
        rank,
        total_teams: (ranked ?? []).length,
        missions_completed: completedCount ?? 0,
        recent_activity: recentActivity ?? [],
      },
    })
  } catch (err) {
    console.error('GET /api/season/home', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
