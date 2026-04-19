interface Props {
  title: string
  count?: number
}

export default function SectionHeader({ title, count }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 mt-4 mb-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#8A8F9E]">
        {title}
      </span>
      {count !== undefined && (
        <span className="text-[11px] font-medium text-[#4A4F61]">
          {count}
        </span>
      )}
    </div>
  )
}
