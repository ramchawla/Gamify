import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  photoUrl?: string | null
  size?: number
  className?: string
}

function teamColor(photoUrl: string | null | undefined): string {
  if (photoUrl?.startsWith('color:')) return photoUrl.slice(6)
  return '#C8902A'
}

function isColorAlias(photoUrl: string | null | undefined): boolean {
  return !!photoUrl?.startsWith('color:')
}

export default function TeamAvatar({ name, photoUrl, size = 40, className }: Props) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  if (photoUrl && !isColorAlias(photoUrl)) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        width={size}
        height={size}
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const bg = teamColor(photoUrl)

  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-semibold shrink-0', className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: bg,
        color: '#0A0908',
      }}
    >
      {initials}
    </div>
  )
}
