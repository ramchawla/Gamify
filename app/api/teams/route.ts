import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sessionCookieHeader } from '@/lib/session'
import { SEASON_ID } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const { team_name, captain_name, captain_email, booking_number } = await req.json()

    if (!team_name || !captain_name || !captain_email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const seasonId = SEASON_ID || (await getActiveSeasonId(supabase))

    // Create team
    const { data: team, error: teamErr } = await supabase
      .from('teams')
      .insert({ season_id: seasonId, name: team_name, captain_email, booking_number })
      .select()
      .single()

    if (teamErr) {
      if (teamErr.code === '23505') {
        return NextResponse.json({ error: 'Team name already taken' }, { status: 409 })
      }
      throw teamErr
    }

    // Add captain as member
    const { data: member, error: memberErr } = await supabase
      .from('team_members')
      .insert({ team_id: team.id, display_name: captain_name, email: captain_email, role: 'captain' })
      .select()
      .single()

    if (memberErr) throw memberErr

    const session = { team_id: team.id, member_id: member.id, season_id: seasonId, display_name: captain_name }
    const res = NextResponse.json({ data: { team, member } }, { status: 201 })
    res.headers.set('Set-Cookie', sessionCookieHeader(session))
    return res
  } catch (err) {
    console.error('POST /api/teams', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function getActiveSeasonId(supabase: ReturnType<typeof createAdminClient>) {
  const { data } = await supabase.from('seasons').select('id').eq('status', 'active').single()
  return data?.id ?? ''
}
