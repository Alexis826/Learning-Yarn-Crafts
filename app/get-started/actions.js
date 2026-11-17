"use server";

import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";

// Creates the signed-in user's profile on the Free plan. Paid plans are only
// ever set by Stripe webhooks after payment (see lib/stripe.js).
export async function startFreePlan() {
  const user = await currentUser();
  if (!user) return { error: "Please sign in first." };

  await sql`
    insert into profiles (user_id, plan) values (${user.id}, 'Free')
    on conflict (user_id) do nothing
  `;
  return { ok: true };
}
