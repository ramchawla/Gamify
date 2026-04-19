import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { submission_id } = await req.json()
    if (!submission_id) return NextResponse.json({ error: 'Missing submission_id' }, { status: 400 })

    const supabase = createAdminClient()

    // Check existing like
    const { data: existing } = await supabase
      .from('submission_likes')
      .select('submission_id')
      .eq('submission_id', submission_id)
      .eq('member_id', session.member_id)
      .maybeSingle()

    if (existing) {
      await supabase.from('submission_likes').delete()
        .eq('submission_id', submission_id)
        .eq('member_id', session.member_id)
      return NextResponse.json({ data: { liked: false } })
    } else {
      await supabase.from('submission_likes').insert({ submission_id, member_id: session.member_id })
      return NextResponse.json({ data: { liked: true } })
    }
  } catch (err) {
    console.error('POST /api/feed/like', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
