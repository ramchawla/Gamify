import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { mission_id, media_path, text_response, caption } = await req.json()
    if (!mission_id) return NextResponse.json({ error: 'Missing mission_id' }, { status: 400 })

    const supabase = createAdminClient()

    // Get mission points
    const { data: mission } = await supabase.from('missions').select('points').eq('id', mission_id).single()
    if (!mission) return NextResponse.json({ error: 'Mission not found' }, { status: 404 })

    // Resolve public URL from storage path
    let media_url: string | null = null
    if (media_path) {
      const { data } = supabase.storage.from('noma-submissions').getPublicUrl(media_path)
      media_url = data.publicUrl
    }

    const { data: submission, error } = await supabase
      .from('submissions')
      .insert({
        mission_id,
        team_id: session.team_id,
        member_id: session.member_id,
        media_url,
        text_response: text_response ?? null,
        caption: caption ?? null,
        points_awarded: mission.points,
        status: 'submitted',
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Mission already submitted' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json({ data: submission }, { status: 201 })
  } catch (err) {
    console.error('POST /api/submissions', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
