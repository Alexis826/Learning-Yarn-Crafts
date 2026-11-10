// Loopy: a cheerful ball of yarn with a face and a waving strand.
// Each Loopy on a page needs its own clipId.
export default function LoopyMascot({ size = 120, clipId = "loopy-clip" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Loopy, a smiling ball of yarn"
    >
      <clipPath id={clipId}>
        <circle cx="56" cy="62" r="44" />
      </clipPath>
      <circle cx="56" cy="62" r="44" fill="#d97a8c" />
      <g
        clipPath={`url(#${clipId})`}
        fill="none"
        stroke="#a4475b"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M8 40c24 10 60 8 96-18" />
        <path d="M6 88c30 6 66-4 98-34" />
        <path d="M30 16c10 28 10 64-4 100" />
        <path d="M84 20c6 30 2 62-14 96" />
      </g>
      <circle cx="56" cy="62" r="44" fill="none" stroke="#a4475b" strokeWidth="3" />
      <circle cx="42" cy="58" r="8" fill="#fff" />
      <circle cx="70" cy="58" r="8" fill="#fff" />
      <circle cx="44" cy="60" r="4" fill="#3b2f2a" />
      <circle cx="72" cy="60" r="4" fill="#3b2f2a" />
      <circle cx="34" cy="74" r="5" fill="#f6b8c4" />
      <circle cx="78" cy="74" r="5" fill="#f6b8c4" />
      <path
        d="M46 76q10 10 20 0"
        fill="none"
        stroke="#3b2f2a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M96 84q14 8 12 -12q-2 -16 10 -24"
        fill="none"
        stroke="#a4475b"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
