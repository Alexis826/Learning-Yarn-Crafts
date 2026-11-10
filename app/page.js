import Link from "next/link";
import { bethEllen } from "./fonts";
import LoopyMascot from "./LoopyMascot";
import { plans } from "./plans";

const features = [
  {
    title: "Knitting & Crochet",
    text: "Learn basic terms and stitches that will work up to the cozy items you've dreamed of: blankets, sweaters, knick-knacks and more!",
  },
  {
    title: "Tutorials",
    text: "Use basic tutorials that help you build beginner skills a couple stitches at a time.",
  },
  {
    title: "Ask Loopy",
    text: "Have a pattern that's hard to read or don't know what materials to use? Ask Loopy to help.",
  },
];

const loopyPowers = [
  {
    title: "Patterns, untangled",
    text: "Share a pattern you found online, and Loopy turns the alphabet soup of abbreviations into plain, friendly steps, each with a picture showing exactly where your yarn goes.",
  },
  {
    title: "Videos, written out",
    text: "Following a video tutorial and can't keep up? Import the video, and Loopy writes out the directions step by step with pictures, so you can work at your own pace. No more pausing and rewinding!",
  },
  {
    title: "Yarn, matchmade",
    text: "Staring at a wall of yarn? Loopy helps you pick the right weight, fiber, and color, tells you which hook or needles to grab, and estimates how many skeins you'll need.",
  },
  {
    title: "Patterns, reimagined",
    text: "Love a stitch but not the project? Loopy suggests what else a pattern can become (a blanket, a scarf, a cozy pillow) and how to adjust it to fit.",
  },
];

// A small drawing of a granny-square corner: 3 double crochet, a chain-2
// space, and 3 more double crochet.
function CornerSketch() {
  const post = (x) => (
    <g key={x}>
      <ellipse cx={x} cy="22" rx="6" ry="3" />
      <line x1={x} y1="25" x2={x} y2="48" />
      <line x1={x - 3} y1="34" x2={x + 3} y2="31" />
    </g>
  );
  return (
    <svg viewBox="0 0 150 60" aria-hidden="true" className="corner-sketch">
      <g fill="none" stroke="#d97a8c" strokeWidth="3" strokeLinecap="round">
        {[16, 32, 48].map(post)}
        {[102, 118, 134].map(post)}
      </g>
      <path
        d="M58 30 q8 -16 17 0 q9 -16 17 0"
        fill="none"
        stroke="#e0a43a"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1 className={bethEllen.className}>
          Get crafty, make the project of your dreams
        </h1>
        <p>
          Cozy Loops helps beginners learn knitting and crochet. Find
          step-by-step guides, simple starter projects, and tips for choosing
          the right yarn, needles, and hooks.
        </p>
      </section>

      <section className="features" aria-label="What you'll find">
        {features.map((feature) => (
          <div key={feature.title} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="meet-loopy" aria-labelledby="meet-loopy-heading">
        <div className="loopy-intro">
          <LoopyMascot size={120} clipId="loopy-intro" />
          <div>
            <h2 id="meet-loopy-heading" className={bethEllen.className}>
              Meet Loopy, your pattern pal
            </h2>
            <p>
              Ever found a gorgeous pattern online, only to discover it&apos;s
              written in secret code? Or watched a tutorial video that moved
              way too fast? Loopy is a friendly AI helper that turns patterns
              and videos into clear, illustrated directions, so you can get
              back to the fun part: making something cozy.
            </p>
          </div>
        </div>

        <div className="before-after">
          <figure className="pattern-card cryptic">
            <figcaption>The pattern says…</figcaption>
            <code>
              Rnd 3: ch 3, 2 dc in same sp, *ch 1, (3 dc, ch 2, 3 dc) in next
              ch-2 sp* rep from * around, sl st to join.
            </code>
          </figure>
          <div className="before-after-arrow" aria-hidden="true">
            <LoopyMascot size={44} clipId="loopy-arrow" />
            <span className="arrow-across">→</span>
            <span className="arrow-down">↓</span>
          </div>
          <figure className="pattern-card friendly">
            <figcaption>Loopy says…</figcaption>
            <CornerSketch />
            <p>
              At each corner, make <strong>3 double crochet</strong>,{" "}
              <strong className="gold">chain 2</strong>, then{" "}
              <strong>3 more double crochet</strong> in the same space. Easy!
            </p>
          </figure>
        </div>

        <ul className="loopy-powers">
          {loopyPowers.map((power) => (
            <li key={power.title}>
              <h3>{power.title}</h3>
              <p>{power.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="plans" aria-labelledby="plans-heading">
        <h2 id="plans-heading">Plans</h2>
        <div className="plan-grid">
          {plans.map((plan) => (
            <div key={plan.name} className="plan">
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price}
                <span> per month</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/get-started" className="button">
          Get started today
        </Link>
      </section>
    </main>
  );
}
