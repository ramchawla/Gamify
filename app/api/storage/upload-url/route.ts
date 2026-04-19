import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { fileName, contentType } = await req.json()
    if (!fileName || !contentType) return NextResponse.json({ error: 'Missing fileName or contentType' }, { status: 400 })

    const supabase = createAdminClient()
    const ext = fileName.split('.').pop() ?? 'jpg'
    const path = `submissions/${session.team_id}/${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from('noma-submissions')
      .createSignedUploadUrl(path)

    if (error) throw error

    return NextResponse.json({ data: { signedUrl: data.signedUrl, path } })
  } catch (err) {
    console.error('POST /api/storage/upload-url', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
