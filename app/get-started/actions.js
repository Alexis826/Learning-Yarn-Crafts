"use server";

import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { plans } from "../plans";

const planNames = plans.map((p) => p.name);

// Records the signed-in user's chosen plan.
export async function choosePlan(plan) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in first." };
  if (!planNames.includes(plan)) return { error: "Please choose a plan." };

  await sql`
    insert into profiles (user_id, plan) values (${user.id}, ${plan})
    on conflict (user_id) do update set plan = excluded.plan
  `;
  return { ok: true };
}
