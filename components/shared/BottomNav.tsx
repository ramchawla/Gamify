'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Target, Rss, Trophy, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/home',        label: 'Home',        Icon: Home   },
  { href: '/missions',    label: 'Missions',    Icon: Target },
  { href: '/feed',        label: 'Feed',        Icon: Rss    },
  { href: '/leaderboard', label: 'Standings',   Icon: Trophy },
  { href: '/profile',     label: 'Profile',     Icon: User   },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 safe-bottom"
      style={{
        background: 'rgba(10, 9, 8, 0.82)',
        backdropFilter: 'blur(20px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.1)',
        borderTop: '0.5px solid rgba(243, 239, 230, 0.06)',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-3 pb-2.5">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="flex flex-col items-center gap-1.5 px-4 py-1 rounded-lg transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={1.5}
                className={cn(
                  'transition-colors',
                  active ? 'text-[#F3EFE6]' : 'text-[#4A4540]'
                )}
              />
              <span
                className={cn(
                  'block w-1 h-1 rounded-full transition-all',
                  active ? 'bg-[#C8902A] opacity-100' : 'bg-transparent opacity-0'
                )}
              />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
