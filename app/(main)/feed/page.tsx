import { getServerSession } from '@/lib/session'
import { getFeed } from '@/lib/data'
import FeedClient from './FeedClient'

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
  const session = await getServerSession()
  if (!session) return null

  const feed = await getFeed()

  return (
    <div className="pb-8">
      <div className="px-4 pt-8 pb-5 border-b border-[rgba(243,239,230,0.08)]">
        <p className="eyebrow">The Field Notes</p>
        <h1 className="font-display text-[28px] text-[#F3EFE6] leading-tight mt-1.5" style={{ fontWeight: 400 }}>
          What teams discovered
        </h1>
      </div>
      <FeedClient initialItems={feed} myMemberId={session.member_id} />
    </div>
  )
}
