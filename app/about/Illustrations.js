const ink = "#a4475b";
const yarn = "#d97a8c";
const wood = "#c9a27e";

// A crochet hook with a chain of loops coming off its tip.
export function CrochetHook() {
  const chain = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 200 200" role="img" aria-labelledby="hook-title">
      <title id="hook-title">A crochet hook with a chain of yarn loops</title>
      <g transform="rotate(35 100 100)">
        <rect x="94" y="40" width="12" height="150" rx="6" fill={wood} />
        <rect x="90" y="110" width="20" height="36" rx="5" fill={ink} />
        <path
          d="M94 46 V30 a8 8 0 0 1 16 0 v4 h-6 v-4 a2 2 0 0 0 -4 0 V46 z"
          fill={wood}
        />
      </g>
      <g fill="none" stroke={yarn} strokeWidth="5">
        {chain.map((i) => (
          <ellipse
            key={i}
            cx={92 - i * 16}
            cy={40 + i * 26}
            rx="9"
            ry="14"
            transform={`rotate(30 ${92 - i * 16} ${40 + i * 26})`}
          />
        ))}
      </g>
    </svg>
  );
}

// Two crossed knitting needles holding a small knitted swatch.
export function KnittingNeedles() {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5];

  return (
    <svg viewBox="0 0 200 200" role="img" aria-labelledby="needles-title">
      <title id="needles-title">Two knitting needles with knitted stitches</title>
      <g strokeLinecap="round">
        <line x1="20" y1="70" x2="180" y2="50" stroke={wood} strokeWidth="7" />
        <line x1="30" y1="40" x2="185" y2="85" stroke={wood} strokeWidth="7" />
      </g>
      <circle cx="20" cy="70" r="8" fill={ink} />
      <circle cx="30" cy="40" r="8" fill={ink} />
      <rect x="50" y="68" width="100" height="100" rx="6" fill={yarn} />
      <g fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round">
        {rows.map((r) =>
          cols.map((c) => (
            <path
              key={`${r}-${c}`}
              d={`M${58 + c * 15} ${78 + r * 22} l7 14 l7 -14`}
            />
          ))
        )}
      </g>
    </svg>
  );
}

// Side-by-side swatches: knit "V" columns next to crochet posts.
export function StitchComparison() {
  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 320 170" role="img" aria-labelledby="compare-title">
      <title id="compare-title">
        A knitted swatch of V-shaped stitches next to a crochet swatch of
        stacked posts
      </title>

      <rect x="10" y="10" width="140" height="130" rx="8" fill={yarn} />
      <g fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round">
        {rows.map((r) =>
          cols.map((c) => (
            <path
              key={`k-${r}-${c}`}
              d={`M${24 + c * 24} ${20 + r * 24} l10 18 l10 -18`}
            />
          ))
        )}
      </g>

      <rect x="170" y="10" width="140" height="130" rx="8" fill={yarn} />
      <g fill="none" stroke={ink} strokeWidth="3">
        {rows.map((r) =>
          cols.map((c) => (
            <g key={`c-${r}-${c}`}>
              <ellipse
                cx={186 + c * 27}
                cy={20 + r * 24}
                rx="9"
                ry="4"
              />
              <line
                x1={186 + c * 27}
                y1={24 + r * 24}
                x2={186 + c * 27}
                y2={38 + r * 24}
              />
            </g>
          ))
        )}
      </g>

      <g fontFamily="Georgia, serif" fontSize="15" fill="#3b2f2a" textAnchor="middle">
        <text x="80" y="162">Knit</text>
        <text x="240" y="162">Crochet</text>
      </g>
    </svg>
  );
}
