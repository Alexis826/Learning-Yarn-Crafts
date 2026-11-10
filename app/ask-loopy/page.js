import Link from "next/link";
import { currentUser } from "@/lib/auth/server";
import { loopyAllowance } from "@/lib/loopyUsage";
import { bethEllen } from "../fonts";
import LoopyMascot from "../LoopyMascot";
import AskLoopyForm from "./AskLoopyForm";

export const metadata = {
  title: "Ask Loopy | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";
// Watching a long video can take a while.
export const maxDuration = 300;

export default async function AskLoopy() {
  const user = await currentUser();
  const allowance = user ? await loopyAllowance(user.id) : null;

  return (
    <main className="ask-loopy">
      <div className="loopy-intro">
        <LoopyMascot size={96} clipId="loopy-page" />
        <div>
          <h1 className={bethEllen.className}>Ask Loopy</h1>
          <p>
            Share a YouTube tutorial, a photo of a pattern, or a question.
            Loopy writes clear, beginner-friendly directions and saves them to
            your Projects.
          </p>
        </div>
      </div>

      {!user ? (
        <div className="signup-notice">
          <h2>Sign in to ask Loopy</h2>
          <p>Loopy saves everything it writes to your account.</p>
          <Link href="/sign-in" className="button">
            Sign in
          </Link>
          <p className="form-switch">
            New here? <Link href="/get-started">Create an account</Link>
          </p>
        </div>
      ) : allowance.limit === 0 ? (
        <div className="signup-notice">
          <h2>Ask Loopy is part of Pro and Ultimate</h2>
          <p>
            You&apos;re on the Free plan. Pro includes 10 Loopy requests a
            month, and Ultimate is unlimited.
          </p>
          <Link href="/#plans-heading" className="button">
            See plans
          </Link>
        </div>
      ) : (
        <AskLoopyForm
          remaining={allowance.limit === Infinity ? null : allowance.remaining}
        />
      )}
    </main>
  );
}
