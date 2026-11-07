import {
  Arrow,
  ChainRow,
  colors,
  CrochetFabric,
  Finger,
  HangingEnds,
  Hook,
  HookLoop,
  KnitFabric,
  Label,
  leftStitches,
  LeftNeedle,
  NeedleWrap,
  onHook,
  PullThrough,
  RightNeedleIn,
  RightNeedleLevel,
  slipKnotLoop,
  Stitch,
  YarnBall,
  YarnOver,
} from "./drawing";

const { yarn, fresh, accent, ink, wood } = colors;

/* ---------- Pieces reused across several steps ---------- */

function SlipKnotStart() {
  return (
    <>
      <YarnBall x={24} y={120} />
      <path d={slipKnotLoop} fill="none" stroke={yarn} strokeWidth="3.5" />
      <Label x={60} y={142} anchor="start">to ball</Label>
      <Label x={210} y={116}>tail</Label>
    </>
  );
}

// An arrow from the chain on the tip up to the newest loop on the hook.
function PullUpLoop({ t }) {
  return (
    <>
      <Arrow from={[200, 112]} to={onHook(t + 0.04, 18)} curve={[204, 86]} />
      <Label x={222} y={96}>pull up</Label>
    </>
  );
}

function LoopCount({ children }) {
  return (
    <Label x={14} y={130} anchor="start">
      {children}
    </Label>
  );
}

function LeftWithStitches({ xs = leftStitches }) {
  return (
    <>
      <LeftNeedle />
      {xs.map((x) => (
        <Stitch key={x} x={x} />
      ))}
      <KnitFabric xs={xs} />
    </>
  );
}

function SlideOff() {
  const remaining = leftStitches.slice(0, -1);
  return (
    <>
      <LeftWithStitches xs={remaining} />
      <RightNeedleLevel />
      <Stitch x={165} color={fresh} />
      <Arrow from={[104, 34]} to={[160, 34]} />
      <Label x={132} y={22}>old stitch slides off</Label>
    </>
  );
}

const castOnNeedle = (
  <g>
    <line x1="30" y1="40" x2="180" y2="40" stroke={wood} strokeWidth="7" />
    <polygon points="180,36.5 193,40 180,43.5" fill={wood} />
    <circle cx="30" cy="40" r="6" fill={accent} />
  </g>
);

function Slingshot() {
  return (
    <>
      <Finger x={70} y={112} label="thumb (tail)" labelX={44} labelY={146} />
      <Finger x={162} y={106} label="index (ball yarn)" labelX={196} labelY={140} />
      <g fill="none" stroke={yarn} strokeWidth="3">
        <path d="M107 56 L78 101 Q52 106 62 124 Q74 134 84 118 L114 142" />
        <path d="M113 56 L152 96 Q178 92 174 112 Q168 126 154 116 L118 142" />
      </g>
      {castOnNeedle}
      <ellipse cx="110" cy="46" rx="6" ry="11" fill="none" stroke={yarn} strokeWidth="3.5" />
    </>
  );
}

function RightWithTwo({ firstColor = fresh }) {
  return (
    <>
      <LeftWithStitches xs={leftStitches.slice(0, -2)} />
      <RightNeedleLevel />
      <Stitch x={165} color={fresh} />
      <Stitch x={190} color={firstColor} />
    </>
  );
}

function BoundOffEdge({ from }) {
  const xs = [0, 1, 2, 3].map((i) => from + i * 16);
  return (
    <g fill="none" stroke={yarn} strokeWidth="3">
      {xs.map((x) => (
        <ellipse key={x} cx={x} cy="86" rx="8" ry="4" />
      ))}
    </g>
  );
}

/* ---------- Step images for each lesson ---------- */

export const stepDiagrams = {
  "crochet-getting-started": [
    {
      caption: "Cross the tail over the working yarn to make a loop.",
      art: <SlipKnotStart />,
    },
    {
      caption: "Reach through the loop and pull the working yarn up through it.",
      art: (
        <>
          <SlipKnotStart />
          <ellipse cx="116" cy="70" rx="6" ry="18" fill="none" stroke={fresh} strokeWidth="3.5" />
          <Arrow from={[150, 100]} to={[150, 46]} />
          <Label x={156} y={40} anchor="start">pull through</Label>
        </>
      ),
    },
    {
      caption: "Slide the new loop onto the hook and pull both ends to snug it.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HangingEnds arrows />
          <Label x={160} y={140}>snug, not tight</Label>
        </>
      ),
    },
  ],

  "crochet-chain": [
    {
      caption: "Yarn over: wrap the yarn over the hook from back to front.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <YarnOver />
        </>
      ),
    },
    {
      caption: "Pull the yarn through the loop on your hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <YarnOver label={false} />
          <PullThrough to={0.6} label="through 1 loop" />
        </>
      ),
    },
    {
      caption: "Each pull makes one chain. Count the V's, not the loop on the hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <g fill="none" stroke={yarn} strokeWidth="3">
            <ellipse cx="99" cy="96" rx="5" ry="8" />
            <ellipse cx="95" cy="112" rx="5" ry="8" />
            <ellipse cx="91" cy="128" rx="5" ry="8" />
          </g>
          <Label x={78} y={100} size={10}>1</Label>
          <Label x={74} y={116} size={10}>2</Label>
          <Label x={70} y={132} size={10}>3</Label>
          <Label x={150} y={30}>don&apos;t count</Label>
          <Label x={150} y={43}>the loop on the hook</Label>
        </>
      ),
    },
  ],

  "crochet-slip-stitch": [
    {
      caption: "Insert the hook into the next stitch.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <ChainRow target={2} numbered={false} />
        </>
      ),
    },
    {
      caption: "Yarn over.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <ChainRow target={2} numbered={false} />
          <YarnOver />
        </>
      ),
    },
    {
      caption: "Pull through the stitch and the loop on your hook in one motion.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <ChainRow target={2} numbered={false} />
          <YarnOver label={false} />
          <PullThrough to={0.5} label="through stitch + loop" />
        </>
      ),
    },
  ],

  "crochet-single": [
    {
      caption: "Insert the hook into the 2nd chain from the hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <ChainRow target={2} />
        </>
      ),
    },
    {
      caption: "Yarn over and pull up a loop. Now there are 2 loops on your hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.72} color={fresh} />
          <ChainRow target={2} />
          <PullUpLoop t={0.72} />
          <LoopCount>2 loops</LoopCount>
        </>
      ),
    },
    {
      caption: "Yarn over and pull through both loops.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.72} />
          <ChainRow target={2} />
          <YarnOver label={false} />
          <PullThrough to={0.5} label="through 2" />
        </>
      ),
    },
  ],

  "crochet-half-double": [
    {
      caption: "Yarn over first, then insert the hook into the 3rd chain.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} color={fresh} />
          <ChainRow target={3} />
          <Label x={150} y={30}>yarn over first</Label>
        </>
      ),
    },
    {
      caption: "Yarn over and pull up a loop. Now there are 3 loops on your hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} />
          <HookLoop t={0.8} color={fresh} />
          <ChainRow target={3} />
          <PullUpLoop t={0.8} />
          <LoopCount>3 loops</LoopCount>
        </>
      ),
    },
    {
      caption: "Yarn over and pull through all 3 loops at once.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} />
          <HookLoop t={0.8} />
          <ChainRow target={3} />
          <YarnOver label={false} />
          <PullThrough to={0.5} label="through all 3" />
        </>
      ),
    },
  ],

  "crochet-double": [
    {
      caption: "Yarn over first, then insert the hook into the 4th chain.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} color={fresh} />
          <ChainRow target={4} />
          <Label x={150} y={30}>yarn over first</Label>
        </>
      ),
    },
    {
      caption: "Yarn over and pull up a loop. Now there are 3 loops on your hook.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} />
          <HookLoop t={0.8} color={fresh} />
          <ChainRow target={4} />
          <PullUpLoop t={0.8} />
          <LoopCount>3 loops</LoopCount>
        </>
      ),
    },
    {
      caption: "Yarn over and pull through the first 2 loops. 2 loops are left.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.68} />
          <HookLoop t={0.8} />
          <ChainRow target={4} />
          <YarnOver label={false} />
          <PullThrough to={0.64} label="through 2" />
        </>
      ),
    },
    {
      caption: "Yarn over and pull through the last 2 loops.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <HookLoop t={0.7} />
          <ChainRow target={4} />
          <YarnOver label={false} />
          <PullThrough to={0.5} label="through last 2" />
        </>
      ),
    },
  ],

  "crochet-fasten-off": [
    {
      caption: "Cut the yarn, leaving a tail about 6 inches long.",
      art: (
        <>
          <Hook />
          <HookLoop t={0.55} />
          <path d="M103 81 Q110 110 132 142" fill="none" stroke={yarn} strokeWidth="3" />
          <Label x={128} y={116} size={16}>✂</Label>
          <Label x={142} y={136} anchor="start">6 in. tail</Label>
        </>
      ),
    },
    {
      caption: "Yarn over with the tail and pull it all the way through the loop.",
      art: (
        <>
          <CrochetFabric x={50} y={100} cols={7} rows={1} />
          <ellipse cx="116" cy="80" rx="7" ry="12" fill="none" stroke={yarn} strokeWidth="3.5" />
          <path d="M116 86 Q118 50 150 26" fill="none" stroke={fresh} strokeWidth="3.5" strokeLinecap="round" />
          <Arrow from={[150, 70]} to={[170, 30]} />
          <Label x={176} y={58} anchor="start">pull the</Label>
          <Label x={176} y={71} anchor="start">tail through</Label>
        </>
      ),
    },
    {
      caption: "Weave the tail through the back of your stitches with a yarn needle, then trim.",
      art: (
        <>
          <CrochetFabric x={40} y={28} cols={8} rows={3} />
          <path
            d="M214 130 Q206 100 188 96 Q172 92 160 100 Q146 108 132 98 Q118 88 104 96"
            fill="none"
            stroke={fresh}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line x1="104" y1="96" x2="72" y2="110" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <Label x={52} y={138}>yarn needle</Label>
        </>
      ),
    },
  ],

  "knitting-getting-started": [
    {
      caption: "Make a slip knot and slide it onto one needle. It counts as your first stitch.",
      art: (
        <>
          <LeftNeedle />
          <Stitch x={102} />
          <g fill="none" stroke={yarn} strokeWidth="3">
            <path d="M102 78 Q96 110 86 142" />
            <path d="M102 78 Q110 110 122 142" />
          </g>
          <Label x={70} y={30}>slip knot = stitch 1</Label>
        </>
      ),
    },
    {
      caption: "Hold the needle with stitches in your left hand and the empty needle in your right.",
      art: (
        <>
          <LeftWithStitches />
          <RightNeedleLevel />
          <path d="M102 78 Q120 120 150 142" fill="none" stroke={yarn} strokeWidth="3" />
          <Label x={66} y={30}>left hand: stitches</Label>
          <Label x={190} y={30}>right hand: empty</Label>
        </>
      ),
    },
  ],

  "knitting-cast-on": [
    {
      caption: "Make the slingshot: tail over your thumb, ball yarn over your index finger.",
      art: <Slingshot />,
    },
    {
      caption: "Bring the needle tip up through the loop on your thumb.",
      art: (
        <>
          <Slingshot />
          <Arrow from={[82, 146]} to={[78, 70]} curve={[56, 110]} />
        </>
      ),
    },
    {
      caption: "Reach over and catch the yarn on your index finger.",
      art: (
        <>
          <Slingshot />
          <Arrow from={[88, 70]} to={[150, 90]} curve={[140, 50]} />
        </>
      ),
    },
    {
      caption: "Bring it back through the thumb loop, drop the loop, and snug the new stitch.",
      art: (
        <>
          <Slingshot />
          <ellipse cx="126" cy="46" rx="6" ry="11" fill="none" stroke={fresh} strokeWidth="3.5" />
          <Label x={150} y={22}>new stitch</Label>
        </>
      ),
    },
  ],

  "knitting-knit": [
    {
      caption: "Keep the yarn in back. Push the right needle into the first stitch, front to back, behind the left needle.",
      art: (
        <>
          <RightNeedleIn />
          <LeftWithStitches />
          <path d="M150 50 Q190 90 196 142" fill="none" stroke={yarn} strokeWidth="3" strokeDasharray="5 4" />
          <Label x={200} y={110} anchor="start">yarn</Label>
          <Label x={200} y={123} anchor="start">in back</Label>
        </>
      ),
    },
    {
      caption: "Wrap the yarn around the right needle counterclockwise, between the needles.",
      art: (
        <>
          <RightNeedleIn />
          <LeftWithStitches />
          <NeedleWrap />
          <Label x={176} y={84} anchor="start">wrap</Label>
        </>
      ),
    },
    {
      caption: "Pull the new loop down through the stitch, toward you.",
      art: (
        <>
          <RightNeedleIn />
          <LeftWithStitches />
          <NeedleWrap />
          <Arrow from={[112, 76]} to={[78, 118]} curve={[108, 108]} />
          <Label x={64} y={136}>toward you</Label>
        </>
      ),
    },
    {
      caption: "Slide the old stitch off the left needle. The new stitch stays on the right.",
      art: <SlideOff />,
    },
  ],

  "knitting-purl": [
    {
      caption: "Bring the yarn to the front. Push the right needle into the first stitch, right to left, in front of the left needle.",
      art: (
        <>
          <LeftWithStitches />
          <RightNeedleIn purl />
          <path d="M140 76 Q170 110 188 142" fill="none" stroke={yarn} strokeWidth="3" />
          <Label x={140} y={142} anchor="end">yarn in front</Label>
        </>
      ),
    },
    {
      caption: "Wrap the yarn around the right needle counterclockwise.",
      art: (
        <>
          <LeftWithStitches />
          <RightNeedleIn purl />
          <NeedleWrap purl />
          <Label x={170} y={84} anchor="start">wrap</Label>
        </>
      ),
    },
    {
      caption: "Push the new loop back through the stitch, away from you.",
      art: (
        <>
          <LeftWithStitches />
          <RightNeedleIn purl />
          <NeedleWrap purl />
          <Arrow from={[110, 54]} to={[74, 22]} curve={[104, 26]} />
          <Label x={140} y={22}>away from you</Label>
        </>
      ),
    },
    {
      caption: "Slide the old stitch off the left needle. The new stitch stays on the right.",
      art: <SlideOff />,
    },
  ],

  "knitting-bind-off": [
    {
      caption: "Knit the first 2 stitches onto the right needle.",
      art: (
        <>
          <RightWithTwo />
          <Label x={190} y={30}>2 stitches</Label>
        </>
      ),
    },
    {
      caption: "Use the left needle to lift the first stitch over the second and off the needle.",
      art: (
        <>
          <RightWithTwo firstColor={accent} />
          <Arrow from={[194, 46]} to={[150, 42]} curve={[178, 6]} />
          <Label x={212} y={22}>lift over</Label>
        </>
      ),
    },
    {
      caption: "One stitch is left. Knit 1 more and repeat until 1 stitch remains.",
      art: (
        <>
          <LeftWithStitches xs={leftStitches.slice(0, -3)} />
          <RightNeedleLevel />
          <Stitch x={165} color={fresh} />
          <BoundOffEdge from={178} />
          <Label x={196} y={110}>bound-off edge</Label>
        </>
      ),
    },
    {
      caption: "Cut the yarn and pull the tail through the last stitch to close it.",
      art: (
        <>
          <ellipse cx="120" cy="80" rx="7" ry="12" fill="none" stroke={yarn} strokeWidth="3.5" />
          <BoundOffEdge from={136} />
          <path d="M120 86 Q122 50 150 26" fill="none" stroke={fresh} strokeWidth="3.5" strokeLinecap="round" />
          <Arrow from={[96, 70]} to={[112, 30]} />
          <Label x={70} y={50}>pull tail</Label>
          <Label x={70} y={63}>through</Label>
        </>
      ),
    },
  ],
};
