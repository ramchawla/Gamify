import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/session'
import BottomNav from '@/components/shared/BottomNav'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) {
    redirect('/join')
  }

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
