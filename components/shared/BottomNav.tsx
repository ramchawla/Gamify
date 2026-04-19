'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Target, Rss, Trophy, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/home',        label: 'Home',        Icon: Home   },
  { href: '/missions',    label: 'Missions',     Icon: Target },
  { href: '/feed',        label: 'Feed',         Icon: Rss    },
  { href: '/leaderboard', label: 'Leaderboard',  Icon: Trophy },
  { href: '/profile',     label: 'Profile',      Icon: User   },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 safe-bottom"
         style={{ background: 'rgba(13,13,15,0.92)', backdropFilter: 'blur(16px)', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors',
                active ? 'text-[#C8902A]' : 'text-[#8A8F9E]'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
