import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const supabase = createAdminClient()

    // Return existing wrapped if generated
    const { data: existing } = await supabase
      .from('wrapped')
      .select('*')
      .eq('team_id', session.team_id)
      .eq('season_id', session.season_id)
      .maybeSingle()

    if (existing) return NextResponse.json({ data: existing })

    // Generate on demand
    const [{ data: team }, { data: ranked }, { data: submissions }] = await Promise.all([
      supabase.from('teams').select('*').eq('id', session.team_id).single(),
      supabase.from('teams').select('id,total_points').eq('season_id', session.season_id).order('total_points', { ascending: false }),
      supabase.from('submissions').select('*, missions(title, category, points)').eq('team_id', session.team_id),
    ])

    if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const rank = (ranked ?? []).findIndex(t => t.id === session.team_id) + 1
    const missionsCompleted = (submissions ?? []).length

    // Compute top category
    const catCounts: Record<string, number> = {}
    for (const s of (submissions ?? [])) {
      const cat = (s.missions as { category: string } | null)?.category
      if (cat) catCounts[cat] = (catCounts[cat] ?? 0) + 1
    }
    const topCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

    // Best submission by points
    const best = (submissions ?? []).sort((a, b) => b.points_awarded - a.points_awarded)[0]

    const cards_json = [
      { card_num: 1, type: 'intro',       data: { team_name: team.name, season_title: 'Noma Resorts $10K Challenge' } },
      { card_num: 2, type: 'stats',       data: { total_points: team.total_points, missions_completed: missionsCompleted, rank, total_teams: (ranked ?? []).length } },
      { card_num: 3, type: 'best_moment', data: { mission_title: (best?.missions as { title: string } | null)?.title, caption: best?.caption, media_url: best?.media_url, points: best?.points_awarded } },
      { card_num: 4, type: 'labels',      data: { top_category: topCategory, category_counts: catCounts } },
      { card_num: 5, type: 'share',       data: { team_name: team.name, total_points: team.total_points, rank } },
    ]

    const { data: wrapped, error } = await supabase
      .from('wrapped')
      .insert({
        season_id: session.season_id,
        team_id: session.team_id,
        final_rank: rank,
        total_points: team.total_points,
        missions_completed: missionsCompleted,
        top_category: topCategory,
        cards_json,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: wrapped })
  } catch (err) {
    console.error('GET /api/wrapped', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
