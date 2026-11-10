import { sql } from "@/lib/db";

// Ask Loopy requests allowed per calendar month, by plan.
const monthlyLimits = { Free: 0, Pro: 10, Ultimate: Infinity };

// The user's plan and how many Loopy requests they have left this month.
export async function loopyAllowance(userId) {
  const [row] = await sql`
    select
      coalesce((select plan from profiles where user_id = ${userId}), 'Free') as plan,
      (select count(*)::int from loopy_requests
        where user_id = ${userId} and created_at >= date_trunc('month', now())) as used
  `;
  const limit = monthlyLimits[row.plan] ?? 0;
  return { plan: row.plan, used: row.used, limit, remaining: Math.max(limit - row.used, 0) };
}

export async function recordLoopyRequest(userId) {
  await sql`insert into loopy_requests (user_id) values (${userId})`;
}
