// A ball of yarn with a loose strand trailing off the bottom right.
// Each ball on a page needs its own clipId.
export default function YarnBall({ size = 48, clipId }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="yarn-ball"
    >
      <clipPath id={clipId}>
        <circle cx="28" cy="28" r="24" />
      </clipPath>
      <circle cx="28" cy="28" r="24" fill="#d97a8c" />
      <g
        clipPath={`url(#${clipId})`}
        fill="none"
        stroke="#a4475b"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M2 18c14 6 34 4 52-12" />
        <path d="M2 30c16 4 36 0 52-18" />
        <path d="M4 44c18 2 38-6 50-22" />
        <path d="M12 2c6 16 6 36-2 56" />
        <path d="M26 2c6 18 6 38-2 56" />
        <path d="M40 4c4 18 2 36-6 54" />
      </g>
      <circle cx="28" cy="28" r="24" fill="none" stroke="#a4475b" strokeWidth="2" />
      <path
        d="M45 45c5 6 10 9 17 11"
        fill="none"
        stroke="#a4475b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
