import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sessionCookieHeader } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { join_code, display_name, email } = await req.json()

    if (!join_code || !display_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: team, error: teamErr } = await supabase
      .from('teams')
      .select('id, season_id, name')
      .eq('join_code', join_code.toUpperCase())
      .single()

    if (teamErr || !team) {
      return NextResponse.json({ error: 'Invalid join code' }, { status: 404 })
    }

    const { data: member, error: memberErr } = await supabase
      .from('team_members')
      .insert({ team_id: team.id, display_name, email: email ?? null, role: 'member' })
      .select()
      .single()

    if (memberErr) {
      if (memberErr.message.includes('maximum')) {
        return NextResponse.json({ error: 'Team is full (max 6 members)' }, { status: 409 })
      }
      throw memberErr
    }

    const session = { team_id: team.id, member_id: member.id, season_id: team.season_id, display_name }
    const res = NextResponse.json({ data: { team, member } }, { status: 201 })
    res.headers.set('Set-Cookie', sessionCookieHeader(session))
    return res
  } catch (err) {
    console.error('POST /api/teams/join', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
