import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import FeedClient from './FeedClient'
import type { FeedSubmission } from '@/types'

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('submissions')
    .select(`
      id, mission_id, team_id, member_id, status, media_url, text_response,
      caption, points_awarded, like_count, submitted_at,
      missions ( title ),
      teams ( name, photo_url ),
      team_members ( display_name )
    `)
    .order('submitted_at', { ascending: false })
    .limit(20)

  return (
    <div className="pb-4">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#F0EEE9]">Activity Feed</h1>
        <p className="text-[#8A8F9E] text-sm mt-1">All team submissions</p>
      </div>
      <FeedClient initialItems={(data ?? []) as unknown as FeedSubmission[]} myMemberId={session.member_id} />
    </div>
  )
}
