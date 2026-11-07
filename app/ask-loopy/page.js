import Link from "next/link";
import { bethEllen } from "../fonts";

export const metadata = {
  title: "Ask Loopy | Cozy Loops",
};

export default function AskLoopy() {
  return (
    <main>
      <h1 className={bethEllen.className}>Ask Loopy</h1>
      <p>
        Have a pattern that&apos;s hard to read or don&apos;t know what
        materials to use? Loopy, your crafting helper, is on the way.
      </p>

      <section className="coming-soon" aria-labelledby="coming-soon-heading">
        <h2 id="coming-soon-heading">Coming soon</h2>
        <p>
          Soon you&apos;ll be able to share a photo or video of a knitted or
          crocheted piece, and Loopy will write step-by-step instructions for
          making it. Every set of instructions Loopy creates is saved to your{" "}
          <Link href="/projects">Projects</Link> so you can open it anytime.
        </p>
      </section>
    </main>
  );
}
