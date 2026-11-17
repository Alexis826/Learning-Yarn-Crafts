"use server";

import { currentUser } from "@/lib/auth/server";
import { billingProfile, ensureCustomer, getStripe, priceIds, siteOrigin } from "@/lib/stripe";

const activeStatuses = ["active", "trialing", "past_due"];

// Starts Stripe Checkout for a paid plan. Returns { url } or { error }.
export async function startCheckout(plan) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in first." };
  if (!priceIds[plan]) return { error: "Please choose Pro or Ultimate." };

  try {
    const profile = await billingProfile(user.id);
    // Someone already subscribed changes plans in the billing portal, so
    // they never pay for two subscriptions at once.
    if (profile.stripe_subscription_id && activeStatuses.includes(profile.subscription_status)) {
      return openBillingPortal();
    }

    const origin = await siteOrigin();
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer: await ensureCustomer(user),
      client_reference_id: user.id,
      line_items: [{ price: priceIds[plan], quantity: 1 }],
      subscription_data: { metadata: { userId: user.id } },
      success_url: `${origin}/profile?checkout=success`,
      cancel_url: `${origin}/profile?checkout=cancelled`,
    });
    return { url: session.url };
  } catch (error) {
    console.error("Stripe checkout failed:", error);
    return { error: "We couldn't open checkout. Please try again in a moment." };
  }
}

// Opens Stripe's billing portal to change plan, update the card or cancel.
export async function openBillingPortal() {
  const user = await currentUser();
  if (!user) return { error: "Please sign in first." };

  try {
    const profile = await billingProfile(user.id);
    if (!profile.stripe_customer_id) return { error: "You don't have a paid plan yet." };

    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${await siteOrigin()}/profile`,
    });
    return { url: session.url };
  } catch (error) {
    console.error("Stripe billing portal failed:", error);
    return { error: "We couldn't open billing. Please try again in a moment." };
  }
}
