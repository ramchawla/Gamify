interface Props {
  title: string
  count?: number
}

export default function SectionHeader({ title, count }: Props) {
  return (
    <div className="flex items-baseline justify-between px-5 py-3 pt-7">
      <p className="eyebrow">{title}</p>
      {count !== undefined && (
        <span className="text-[11px] tabular text-[#4A4540]">{count}</span>
      )}
    </div>
  )
}
