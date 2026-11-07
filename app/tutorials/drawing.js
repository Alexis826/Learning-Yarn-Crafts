// Shared pieces for the step-by-step tutorial diagrams. Every diagram uses a
// 240 x 150 canvas. "fresh" (gold) marks the yarn move made in that step.

export const colors = {
  wood: "#c9a27e",
  woodDark: "#a8835f",
  yarn: "#d97a8c",
  fresh: "#e0a43a",
  ink: "#3b2f2a",
  accent: "#a4475b",
  skin: "#f1d3c2",
};

const { wood, woodDark, yarn, fresh, ink, accent, skin } = colors;

export function Label({ x, y, children, anchor = "middle", size = 11 }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="Georgia, serif"
      fontSize={size}
      fill={ink}
    >
      {children}
    </text>
  );
}

function head(fromX, fromY, toX, toY, color) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const size = 7;
  const left = angle + Math.PI * 0.82;
  const right = angle - Math.PI * 0.82;
  const points = [
    [toX, toY],
    [toX + size * Math.cos(left), toY + size * Math.sin(left)],
    [toX + size * Math.cos(right), toY + size * Math.sin(right)],
  ];
  return <polygon points={points.map((p) => p.join(",")).join(" ")} fill={color} />;
}

// A straight arrow, or a curved one when a control point (cx, cy) is given.
export function Arrow({ from, to, curve, color = ink }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const d = curve
    ? `M${x1} ${y1} Q${curve[0]} ${curve[1]} ${x2} ${y2}`
    : `M${x1} ${y1} L${x2} ${y2}`;
  const [hx, hy] = curve || from;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="5 3"
      />
      {head(hx, hy, x2, y2, color)}
    </g>
  );
}

/* ---------- Crochet ---------- */

// The hook runs from the handle at H0 down to the tip at H1.
const H0 = [20, 35];
const H1 = [180, 95];
const len = Math.hypot(H1[0] - H0[0], H1[1] - H0[1]);
const U = [(H1[0] - H0[0]) / len, (H1[1] - H0[1]) / len];
const N = [-U[1], U[0]];
const hookAngle = (Math.atan2(U[1], U[0]) * 180) / Math.PI;

// A point along the hook (t = 0 at the handle, 1 at the tip), moved `off`
// units below (+) or above (-) the shaft.
export function onHook(t, off = 0) {
  return [
    H0[0] + (H1[0] - H0[0]) * t + N[0] * off,
    H0[1] + (H1[1] - H0[1]) * t + N[1] * off,
  ];
}

export function Hook() {
  const [g1x, g1y] = onHook(0.15);
  const [g2x, g2y] = onHook(0.35);
  return (
    <g strokeLinecap="round" fill="none">
      <line x1={H0[0]} y1={H0[1]} x2={H1[0]} y2={H1[1]} stroke={wood} strokeWidth="10" />
      <line x1={g1x} y1={g1y} x2={g2x} y2={g2y} stroke={woodDark} strokeWidth="14" />
      <path d="M180 95 L187.5 97.8 Q192 92 184 87" stroke={wood} strokeWidth="6" />
    </g>
  );
}

// A loop sitting on the hook at position t.
export function HookLoop({ t, color = yarn }) {
  const [x, y] = onHook(t);
  return (
    <ellipse
      cx={x}
      cy={y}
      rx="5"
      ry="14"
      transform={`rotate(${hookAngle} ${x} ${y})`}
      fill="none"
      stroke={color}
      strokeWidth="3.5"
    />
  );
}

// Yarn wrapped over the hook near the tip, from back to front, with the
// working yarn trailing off to the bottom right.
export function YarnOver({ color = fresh, label = true }) {
  return (
    <g>
      <path
        d="M228 140 C200 132 186 118 184 100 C183 86 176 79 170 80 C162 81 158 88 158 97"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {label && <Label x={198} y={72}>yarn over</Label>}
    </g>
  );
}

// An arrow above the shaft, from the tip back toward the handle, showing
// the hook being pulled through loops.
export function PullThrough({ to, label }) {
  const from = onHook(0.97, -24);
  const end = onHook(to, -24);
  const [lx, ly] = onHook((0.97 + to) / 2, -42);
  return (
    <g>
      <Arrow from={from} to={end} />
      <Label x={lx} y={ly}>{label}</Label>
    </g>
  );
}

// A foundation chain running right from the first loop on the hook, set up
// so chain number `target` (counted from the hook) sits on the hook's tip.
export function ChainRow({ target, count = target + 2, numbered = true }) {
  const x = (i) => 184 - (target - i) * 16;
  const ids = Array.from({ length: count }, (_, i) => i + 1);
  const [lx, ly] = onHook(0.55, 14);
  return (
    <g>
      <path
        d={`M${lx} ${ly} Q${lx} 104 ${x(1) - 8} 104`}
        fill="none"
        stroke={yarn}
        strokeWidth="3"
      />
      {ids.map((i) => (
        <ellipse
          key={i}
          cx={x(i)}
          cy="104"
          rx="8"
          ry="5"
          fill="none"
          stroke={i === target ? accent : yarn}
          strokeWidth={i === target ? 3.5 : 3}
        />
      ))}
      {numbered &&
        ids.map((i) => (
          <Label key={i} x={x(i)} y={124} size={9}>
            {i}
          </Label>
        ))}
    </g>
  );
}

// Strands hanging down from the loop on the hook.
export function HangingEnds({ arrows }) {
  const [x, y] = onHook(0.55, 14);
  return (
    <g>
      <path d={`M${x} ${y} Q${x - 8} ${y + 30} ${x - 18} 140`} fill="none" stroke={yarn} strokeWidth="3" />
      <path d={`M${x} ${y} Q${x + 8} ${y + 30} ${x + 18} 140`} fill="none" stroke={yarn} strokeWidth="3" />
      {arrows && (
        <>
          <Arrow from={[x - 22, y + 26]} to={[x - 32, y + 52]} />
          <Arrow from={[x + 22, y + 26]} to={[x + 32, y + 52]} />
        </>
      )}
    </g>
  );
}

// Rows of crochet stitches (posts with oval tops).
export function CrochetFabric({ x = 40, y = 40, cols = 7, rows = 3 }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * 22;
      const cy = y + r * 26;
      cells.push(
        <g key={`${r}-${c}`}>
          <ellipse cx={cx} cy={cy} rx="8" ry="4" />
          <line x1={cx} y1={cy + 4} x2={cx} y2={cy + 20} />
        </g>
      );
    }
  }
  return (
    <g fill="none" stroke={yarn} strokeWidth="3">
      {cells}
    </g>
  );
}

/* ---------- Slip knot (both crafts) ---------- */

export function YarnBall({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="14" fill={yarn} />
      <g fill="none" stroke={accent} strokeWidth="1.5">
        <path d={`M${x - 12} ${y - 5} q12 6 24 -2`} />
        <path d={`M${x - 13} ${y + 3} q13 6 26 -2`} />
        <path d={`M${x - 4} ${y - 13} q6 13 2 26`} />
      </g>
    </g>
  );
}

export const slipKnotLoop =
  "M38 120 C80 120 100 112 116 96 C134 74 138 44 114 42 C90 40 92 72 120 100 C138 116 170 124 210 128";

/* ---------- Knitting ---------- */

export function LeftNeedle() {
  return (
    <g>
      <line x1="12" y1="60" x2="120" y2="60" stroke={wood} strokeWidth="7" />
      <polygon points="120,56.5 133,60 120,63.5" fill={wood} />
      <circle cx="12" cy="60" r="6" fill={accent} />
    </g>
  );
}

// The right needle held level, tip pointing left toward the left needle.
export function RightNeedleLevel() {
  return (
    <g>
      <line x1="148" y1="60" x2="234" y2="60" stroke={wood} strokeWidth="7" />
      <polygon points="148,56.5 135,60 148,63.5" fill={wood} />
      <circle cx="234" cy="60" r="6" fill={accent} />
    </g>
  );
}

// The right needle pushed through the first stitch: behind the left needle
// for a knit stitch, in front of it for a purl stitch.
export function RightNeedleIn({ purl = false }) {
  const start = purl ? [232, 122] : [232, 12];
  const tip = purl ? "92.5,61.2 95.5,54.8 83.1,52.9" : "95.4,75.2 92.6,68.8 83,76.8";
  const end = purl ? [94, 58] : [94, 72];
  return (
    <g>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke={wood} strokeWidth="7" />
      <polygon points={tip} fill={wood} />
      <circle cx={start[0]} cy={start[1]} r="6" fill={accent} />
    </g>
  );
}

export function Stitch({ x, color = yarn, dashed = false }) {
  return (
    <ellipse
      cx={x}
      cy="65"
      rx="6"
      ry="13"
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeDasharray={dashed ? "4 3" : undefined}
    />
  );
}

// Stitches on the left needle, from the knob toward the tip.
export const leftStitches = [30, 48, 66, 84, 102];

// Knitted fabric hanging below a set of stitches.
export function KnitFabric({ xs }) {
  return (
    <g fill="none" stroke={yarn} strokeWidth="2.5" strokeLinejoin="round">
      {xs.map((x) => (
        <g key={x}>
          <path d={`M${x - 6} 82 l6 10 l6 -10`} />
          <path d={`M${x - 6} 96 l6 10 l6 -10`} />
        </g>
      ))}
    </g>
  );
}

// Yarn wrapped around the right needle where it crosses the left needle.
export function NeedleWrap({ purl = false }) {
  const [x, y, rot] = purl ? [116, 68, 24.9] : [116, 62, -23.5];
  const tail = purl ? `M${x + 4} ${y + 12} Q150 110 190 140` : `M${x + 4} ${y + 12} Q160 100 200 140`;
  return (
    <g fill="none" stroke={fresh} strokeWidth="3.5" strokeLinecap="round">
      <ellipse cx={x} cy={y} rx="5" ry="12" transform={`rotate(${rot} ${x} ${y})`} />
      <path d={tail} />
    </g>
  );
}

// A hand position marker (a fingertip) for the long-tail cast on.
export function Finger({ x, y, label, labelX, labelY }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill={skin} />
      <Label x={labelX} y={labelY} size={10}>
        {label}
      </Label>
    </g>
  );
}
