import type { Season } from '@/types'

interface Props {
  season: Season
}

export default function PrizeCallout({ season }: Props) {
  return (
    <div className="mx-4 mt-4 px-5 py-4 rounded-xl relative overflow-hidden" style={{ background: 'rgba(200,144,42,0.06)', border: '0.5px solid rgba(200,144,42,0.22)' }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Grand Prize</p>
          <p className="font-display text-[22px] text-[#F3EFE6] leading-tight mt-0.5" style={{ fontWeight: 400 }}>
            {season.prize_description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#C6C0B4]">awarded to the leading team at season close</p>
        </div>
      </div>
    </div>
  )
}
