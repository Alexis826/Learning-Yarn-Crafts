import { getStripe, syncSubscription } from "@/lib/stripe";

// Stripe calls this when a checkout finishes and whenever a subscription
// changes. Plans only change here, from signed Stripe events.
export async function POST(request) {
  const stripe = getStripe();
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      request.headers.get("stripe-signature"),
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature check failed:", error.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.mode === "subscription" && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await syncSubscription(subscription);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(event.data.object);
        break;
      default:
        break;
    }
  } catch (error) {
    // A 500 makes Stripe retry the event later.
    console.error(`Stripe webhook ${event.type} failed:`, error);
    return Response.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}
