import { Camera, MessageSquare, Video, MapPin } from 'lucide-react'
import type { SubmissionType } from '@/types'
import { cn } from '@/lib/utils'

const config: Record<SubmissionType, { Icon: React.ElementType; color: string; bg: string }> = {
  photo:    { Icon: Camera,        color: '#C8902A', bg: 'rgba(200,144,42,0.15)' },
  text:     { Icon: MessageSquare, color: '#4A7C59', bg: 'rgba(74,124,89,0.15)' },
  video:    { Icon: Video,         color: '#7F77DD', bg: 'rgba(127,119,221,0.15)' },
  location: { Icon: MapPin,        color: '#60A5FA', bg: 'rgba(96,165,250,0.15)' },
}

interface Props {
  type: SubmissionType
  size?: number
  className?: string
}

export default function SubmissionTypeIcon({ type, size = 32, className }: Props) {
  const { Icon, color, bg } = config[type]
  return (
    <div
      className={cn('rounded-lg flex items-center justify-center shrink-0', className)}
      style={{ width: size, height: size, background: bg }}
    >
      <Icon size={size * 0.5} color={color} strokeWidth={1.5} />
    </div>
  )
}
