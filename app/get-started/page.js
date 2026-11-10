import Link from "next/link";
import { currentUser } from "@/lib/auth/server";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Get Started | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

export default async function GetStarted() {
  const user = await currentUser();

  return (
    <main>
      <h1>Get Started</h1>
      {user ? (
        <div className="signup-notice">
          <h2>You&apos;re signed in</h2>
          <p>You&apos;re signed in as {user.name || user.email}.</p>
          <Link href="/projects" className="button">
            Go to my projects
          </Link>
        </div>
      ) : (
        <>
          <p>Create your account and choose the plan that fits you.</p>
          <SignUpForm />
        </>
      )}
    </main>
  );
}
