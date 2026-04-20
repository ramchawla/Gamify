interface Props {
  completed: number
  total: number
}

export default function ProgressBar({ completed, total }: Props) {
  const pct = total > 0 ? Math.min(100, (completed / total) * 100) : 0
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-display tabular text-[#F3EFE6] text-[14px]" style={{ fontWeight: 400 }}>
          {completed} <span className="text-[#8A8473]">of {total}</span>
        </span>
        <span className="font-display tabular text-[#C8902A] text-[14px]" style={{ fontWeight: 400 }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-px bg-[rgba(243,239,230,0.10)] overflow-hidden">
        <div
          className="h-full bg-[#C8902A] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
