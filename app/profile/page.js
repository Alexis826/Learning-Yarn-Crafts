import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import { loopyAllowance } from "@/lib/loopyUsage";
import { billingProfile } from "@/lib/stripe";
import PlanActions from "../get-started/PlanActions";
import { plans } from "../plans";

export const metadata = {
  title: "Profile | Cozy Loops",
};

// Depends on who's signed in, so it's rendered per request.
export const dynamic = "force-dynamic";

export default async function Profile({ searchParams }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { checkout } = await searchParams;
  const [profile, allowance] = await Promise.all([
    billingProfile(user.id),
    loopyAllowance(user.id),
  ]);
  const plan = plans.find((p) => p.name === profile.plan) ?? plans[0];

  return (
    <main className="profile">
      <h1>Profile</h1>

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

      <section className="profile-card" aria-labelledby="account-heading">
        <h2 id="account-heading">Account</h2>
        <dl className="profile-details">
          <div>
            <dt>Name</dt>
            <dd>{user.name || "—"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </section>

      <section className="profile-card" aria-labelledby="plan-heading">
        <h2 id="plan-heading">Plan</h2>
        <p className="profile-plan">
          <strong>{plan.name}</strong>
          <span>
            {plan.price} per month
            {profile.subscription_status === "active" && " · renews monthly"}
          </span>
        </p>
        <ul className="profile-features">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="profile-usage">
          {allowance.limit === Infinity
            ? "Unlimited Loopy requests"
            : allowance.limit === 0
              ? "Loopy isn't included in the Free plan"
              : `${allowance.remaining} of ${allowance.limit} Loopy requests left this month`}
        </p>
        {profile.subscription_status === "past_due" && (
          <p className="form-error">
            Your last payment didn&apos;t go through. Please update your card.
          </p>
        )}
        <PlanActions
          currentPlan={profile.plan}
          hasSubscription={Boolean(profile.stripe_subscription_id)}
        />
      </section>

      <p className="form-switch">
        <Link href="/projects">Go to my projects</Link>
      </p>
    </main>
  );
}
