import { getServerSession } from '@/lib/session'
import { getWrapped } from '@/lib/data'
import WrappedClient from './WrappedClient'

export const dynamic = 'force-dynamic'

export default async function WrappedPage() {
  const session = await getServerSession()
  if (!session) return null

  const wrapped = await getWrapped()

  return (
    <div className="min-h-svh bg-[#0A0908]">
      <WrappedClient initialWrapped={wrapped} />
    </div>
  )
}
