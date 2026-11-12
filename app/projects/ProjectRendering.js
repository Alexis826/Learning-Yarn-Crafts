// Pictures of finished beginner projects, keyed by each project's `rendering`.
// Every picture uses a 120 x 120 canvas.

const range = (count) => Array.from({ length: count }, (_, i) => i);

function Shadow({ cx = 60, cy = 108, rx = 42 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="#3b2f2a" opacity="0.12" />;
}

// A square cloth of single crochet: rows of small stitch tops.
function CrochetDishcloth() {
  return (
    <>
      <Shadow />
      <rect x="16" y="14" width="88" height="88" rx="6" fill="#a8d5c2" />
      <g fill="none" stroke="#6fa992" strokeWidth="1.6">
        {range(13).map((row) =>
          range(13).map((col) => (
            <ellipse
              key={`${row}-${col}`}
              cx={22 + col * 6 + (row % 2) * 3}
              cy={20 + row * 6.6}
              rx="2.6"
              ry="1.7"
            />
          )),
        )}
      </g>
      <rect x="16" y="14" width="88" height="88" rx="6" fill="none" stroke="#6fa992" strokeWidth="3" />
    </>
  );
}

// Three double crochet side by side, as short posts with tops.
function Cluster({ x, y, color, angle = 0 }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`} stroke={color} strokeWidth="2.4" strokeLinecap="round">
      {[-5, 0, 5].map((dx) => (
        <line key={dx} x1={x + dx} y1={y - 5} x2={x + dx} y2={y + 5} />
      ))}
    </g>
  );
}

// A two-round granny square: gold center, pink outer round.
function GrannySquare() {
  const outer = "#d97a8c";
  const inner = "#e8b04a";
  return (
    <>
      <Shadow />
      <rect x="18" y="16" width="84" height="84" rx="8" fill={outer} />
      {/* Round 2: two clusters at each corner, one along each edge. Posts
          stand perpendicular to the edge they sit on. */}
      {[
        [40, 25, 0], [80, 25, 0], [40, 91, 0], [80, 91, 0],
        [27, 38, 90], [27, 78, 90], [93, 38, 90], [93, 78, 90],
      ].map(([x, y, a]) => (
        <Cluster key={`${x}-${y}`} x={x} y={y} angle={a} color="#f9d6dd" />
      ))}
      <rect x="38" y="36" width="44" height="44" rx="6" fill={inner} />
      {/* Round 1: one cluster per side. */}
      {[
        [60, 44, 0], [60, 72, 0], [46, 58, 90], [74, 58, 90],
      ].map(([x, y, a]) => (
        <Cluster key={`${x}-${y}`} x={x} y={y} angle={a} color="#fbe7b8" />
      ))}
      <circle cx="60" cy="58" r="4" fill="#fbf6f0" />
    </>
  );
}

// A knitted square in garter stitch: rows of bumpy ridges.
function KnitDishcloth() {
  const ridge = (y) => {
    let d = `M20 ${y}`;
    for (let x = 20; x < 100; x += 6) d += ` q3 -3.2 6 0`;
    return d;
  };
  return (
    <>
      <Shadow />
      <rect x="16" y="14" width="88" height="88" rx="4" fill="#c3b3e2" />
      <g fill="none" stroke="#8c76bf" strokeWidth="2" strokeLinecap="round">
        {range(14).map((row) => (
          <path key={row} d={ridge(21 + row * 6)} />
        ))}
      </g>
      <rect x="16" y="14" width="88" height="88" rx="4" fill="none" stroke="#8c76bf" strokeWidth="2.5" />
    </>
  );
}

// A chunky headband seen at an angle, with garter ridges across the band.
function Headband() {
  return (
    <>
      <Shadow rx={46} cy={104} />
      <ellipse cx="60" cy="62" rx="42" ry="28" fill="none" stroke="#c98a3a" strokeWidth="20" />
      <ellipse
        cx="60"
        cy="62"
        rx="42"
        ry="28"
        fill="none"
        stroke="#e8b04a"
        strokeWidth="16"
        strokeDasharray="3.5 3"
      />
      {/* The sewn seam, at the front. */}
      <line x1="60" y1="80" x2="60" y2="100" stroke="#a86f2a" strokeWidth="2.5" strokeDasharray="2 2.5" />
    </>
  );
}

const renderings = {
  "crochet-dishcloth": { label: "A finished square dishcloth in single crochet", Art: CrochetDishcloth },
  "granny-square": { label: "A finished two-color granny square coaster", Art: GrannySquare },
  "knit-dishcloth": { label: "A finished square dishcloth in garter stitch", Art: KnitDishcloth },
  headband: { label: "A finished chunky knitted headband", Art: Headband },
};

export function hasRendering(kind) {
  return Boolean(renderings[kind]);
}

export default function ProjectRendering({ kind, size = 64 }) {
  const rendering = renderings[kind];
  if (!rendering) return null;
  const { label, Art } = rendering;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={label} className="project-rendering">
      <Art />
    </svg>
  );
}
