import { headers } from "next/headers";
import Stripe from "stripe";
import { sql } from "@/lib/db";

// Created on first use so builds work without STRIPE_SECRET_KEY set.
let client = null;
export function getStripe() {
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

// Stripe price for each paid plan. Defaults are the test-mode prices; set
// STRIPE_PRICE_PRO / STRIPE_PRICE_ULTIMATE when switching to live mode.
export const priceIds = {
  Pro: process.env.STRIPE_PRICE_PRO || "price_1Ucq9VLsWP2270rL94LeDabC",
  Ultimate: process.env.STRIPE_PRICE_ULTIMATE || "price_1Ucq9pLsWP2270rLmcTXACqg",
};

function planForPrice(priceId) {
  return Object.keys(priceIds).find((plan) => priceIds[plan] === priceId) ?? null;
}

// The site's own address, for Stripe's return links.
export async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function billingProfile(userId) {
  const [profile] = await sql`
    select plan, stripe_customer_id, stripe_subscription_id, subscription_status
    from profiles where user_id = ${userId}
  `;
  return profile ?? { plan: "Free" };
}

// Returns the user's Stripe customer id, creating the customer the first time.
export async function ensureCustomer(user) {
  const profile = await billingProfile(user.id);
  if (profile.stripe_customer_id) return profile.stripe_customer_id;

  const customer = await getStripe().customers.create({
    email: user.email,
    name: user.name || undefined,
    metadata: { userId: user.id },
  });
  await sql`
    insert into profiles (user_id, stripe_customer_id) values (${user.id}, ${customer.id})
    on conflict (user_id) do update set stripe_customer_id = excluded.stripe_customer_id
  `;
  return customer.id;
}

// Copies a Stripe subscription's state onto the matching profile. Active
// (or trialing / past due, while Stripe retries the card) keeps the paid
// plan; anything else drops the user back to Free.
export async function syncSubscription(subscription) {
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const priceId = subscription.items?.data?.[0]?.price?.id;
  const paidPlan = planForPrice(priceId);
  const keepsPlan = ["active", "trialing", "past_due"].includes(subscription.status);
  const plan = keepsPlan && paidPlan ? paidPlan : "Free";

  const updated = await sql`
    update profiles
    set plan = ${plan},
        stripe_subscription_id = ${subscription.id},
        subscription_status = ${subscription.status}
    where stripe_customer_id = ${customerId}
    returning user_id
  `;
  if (updated.length === 0) {
    console.warn(`Stripe subscription ${subscription.id} has no matching profile (customer ${customerId}).`);
  }
}
