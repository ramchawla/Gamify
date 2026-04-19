import { Star } from 'lucide-react'

interface Props {
  description?: string | null
}

export default function BonusBadge({ description }: Props) {
  return (
    <div className="flex items-center gap-1 text-[#EAB308]">
      <Star size={12} fill="currentColor" strokeWidth={0} />
      <span className="text-[11px] font-medium uppercase tracking-wide">
        {description ?? 'Bonus'}
      </span>
    </div>
  )
}
