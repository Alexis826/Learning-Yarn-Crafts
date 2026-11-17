import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Get Started | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

export default async function GetStarted() {
  // Signed-in people manage their plan from their profile.
  if (await currentUser()) redirect("/profile");

  return (
    <main>
      <h1>Get Started</h1>
      <p>Create your account and choose the plan that fits you.</p>
      <SignUpForm />
    </main>
  );
}
