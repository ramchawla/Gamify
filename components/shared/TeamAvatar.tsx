import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  photoUrl?: string | null
  size?: number
  className?: string
}

export default function TeamAvatar({ name, photoUrl, size = 40, className }: Props) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  if (photoUrl) {
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

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-[#0D0D0F] bg-[#C8902A] shrink-0',
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}
