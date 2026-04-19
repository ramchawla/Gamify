interface Props {
  completed: number
  total: number
}

export default function ProgressBar({ completed, total }: Props) {
  const pct = total > 0 ? Math.min(100, (completed / total) * 100) : 0
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-[#8A8F9E]">
        <span>{completed} of {total} missions</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#C8902A] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
