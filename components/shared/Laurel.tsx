interface Props {
  size?: number
  color?: string
  className?: string
}

// Hand-drawn thin laurel, wraps podium 1st place avatar.
export default function Laurel({ size = 120, color = '#C8902A', className }: Props) {
  return (
    <svg
      width={size}
      height={size * 0.95}
      viewBox="0 0 120 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Left half */}
      <g stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M48 100 C 30 90, 18 70, 16 46 C 15 32, 20 22, 26 18" />
        <path d="M30 80 C 22 80, 16 76, 14 72" />
        <path d="M25 66 C 17 64, 12 58, 11 54" />
        <path d="M23 54 C 16 50, 13 44, 13 40" />
        <path d="M23 42 C 17 37, 15 31, 16 26" />
        <path d="M26 32 C 22 26, 21 21, 23 17" />
      </g>
      {/* Right half */}
      <g stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M72 100 C 90 90, 102 70, 104 46 C 105 32, 100 22, 94 18" />
        <path d="M90 80 C 98 80, 104 76, 106 72" />
        <path d="M95 66 C 103 64, 108 58, 109 54" />
        <path d="M97 54 C 104 50, 107 44, 107 40" />
        <path d="M97 42 C 103 37, 105 31, 104 26" />
        <path d="M94 32 C 98 26, 99 21, 97 17" />
      </g>
      {/* Top knot */}
      <circle cx="60" cy="14" r="1.5" fill={color} />
    </svg>
  )
}
