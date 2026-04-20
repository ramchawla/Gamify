interface Props {
  size?: number
  className?: string
}

// Subtle typographic wordmark — Fraunces display, thin separator, serif "N".
export default function NomaMark({ size = 18, className }: Props) {
  return (
    <span
      className={`font-display inline-flex items-center gap-2.5 ${className ?? ''}`}
      style={{ fontSize: size, letterSpacing: '0.04em' }}
    >
      <span className="font-normal text-[#F3EFE6]">Noma</span>
      <span className="w-5 h-px bg-[#C8902A]" aria-hidden />
      <span className="eyebrow !text-[10px] !tracking-[0.22em] text-[#8A8473]">Resorts</span>
    </span>
  )
}
