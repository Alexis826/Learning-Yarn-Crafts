import Link from "next/link";
import { currentUser } from "@/lib/auth/server";
import { billingProfile } from "@/lib/stripe";
import PlanActions from "./PlanActions";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Get Started | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

export default async function GetStarted({ searchParams }) {
  const user = await currentUser();
  const { checkout } = await searchParams;

  if (!user) {
    return (
      <main>
        <h1>Get Started</h1>
        <p>Create your account and choose the plan that fits you.</p>
        <SignUpForm />
      </main>
    );
  }

  const profile = await billingProfile(user.id);

  return (
    <main>
      <h1>Your plan</h1>

      {checkout === "success" && (
        <p className="checkout-banner success" role="status">
          Thank you! Your payment went through. Your new plan will show here
          within a few seconds. Refresh if it hasn&apos;t updated yet.
        </p>
      )}
      {checkout === "cancelled" && (
        <p className="checkout-banner" role="status">
          Checkout was cancelled, so nothing was charged.
        </p>
      )}

      <div className="signup-notice plan-summary">
        <p>Signed in as {user.name || user.email}</p>
        <h2>{profile.plan} plan</h2>
        {profile.subscription_status === "past_due" && (
          <p className="form-error">
            Your last payment didn&apos;t go through. Please update your card.
          </p>
        )}
        <PlanActions
          currentPlan={profile.plan}
          hasSubscription={Boolean(profile.stripe_subscription_id)}
        />
        <p className="form-switch">
          <Link href="/projects">Go to my projects</Link>
        </p>
      </div>
    </main>
  );
}
