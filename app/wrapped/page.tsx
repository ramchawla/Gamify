import { getServerSession } from '@/lib/session'
import { createAdminClient } from '@/lib/supabase/admin'
import WrappedClient from './WrappedClient'
import type { WrappedRecord } from '@/types'

export const dynamic = 'force-dynamic'

export default async function WrappedPage() {
  const session = await getServerSession()
  if (!session) return null

  const supabase = createAdminClient()
  const { data: existing } = await supabase
    .from('wrapped')
    .select('*')
    .eq('team_id', session.team_id)
    .eq('season_id', session.season_id)
    .maybeSingle()

  return (
    <div className="min-h-svh bg-[#0D0D0F]">
      <WrappedClient initialWrapped={existing as WrappedRecord | null} />
    </div>
  )
}
