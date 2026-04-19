import { Gift } from 'lucide-react'
import type { Season } from '@/types'

interface Props {
  season: Season
}

export default function PrizeCallout({ season }: Props) {
  return (
    <div className="mx-4 mt-3 px-4 py-3 rounded-xl flex items-center gap-3 bg-[rgba(200,144,42,0.08)] border border-[rgba(200,144,42,0.25)]">
      <Gift size={20} className="text-[#C8902A] shrink-0" />
      <div>
        <p className="text-[#F0EEE9] font-semibold text-sm">{season.prize_description}</p>
        <p className="text-[#8A8F9E] text-xs">Highest points team wins at season end</p>
      </div>
    </div>
  )
}
