import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface Props {
  href: string
  label: string
  sublabel: string
  Icon: LucideIcon
  className?: string
}

export default function QuickActionCard({ href, label, sublabel, Icon, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col gap-2 p-4 card card-hover rounded-xl float-in',
        className
      )}
    >
      <Icon size={24} className="text-[#C8902A]" strokeWidth={1.5} />
      <div>
        <p className="text-[#F0EEE9] font-semibold text-sm">{label}</p>
        <p className="text-[#8A8F9E] text-xs mt-0.5">{sublabel}</p>
      </div>
    </Link>
  )
}
