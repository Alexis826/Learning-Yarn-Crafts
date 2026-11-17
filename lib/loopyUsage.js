import { sql } from "@/lib/db";

// Ask Loopy requests allowed per calendar month, by plan.
const monthlyLimits = { Free: 0, Pro: 10, Ultimate: Infinity };

// Common beginner questions, used to fill out suggested prompts.
const commonQuestions = [
  "What's the difference between worsted and DK yarn?",
  "Which hook size should I use for a cozy blanket?",
  "What's an easy first project for a total beginner?",
  "How do I read a crochet chart?",
  "How do I fix a dropped stitch in knitting?",
  "What yarn is best for baby items?",
  "How do I change colors in the middle of a row?",
  "Can you turn a granny square into a blanket pattern?",
];

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

export async function recordLoopyRequest(userId, { prompt, projectName, suggestions } = {}) {
  await sql`
    insert into loopy_requests (user_id, prompt, project_name, suggestions)
    values (
      ${userId},
      ${prompt ? prompt.slice(0, 500) : null},
      ${projectName ?? null},
      ${JSON.stringify(suggestions ?? [])}
    )
  `;
}

// Up to `count` prompts to offer on Ask Loopy: follow-ups Loopy suggested
// after the user's recent requests first, then common beginner questions.
// Questions the user already asked are left out.
export async function suggestedPrompts(userId, count = 6) {
  const recent = await sql`
    select prompt, suggestions from loopy_requests
    where user_id = ${userId}
    order by created_at desc
    limit 8
  `;
  const asked = new Set(recent.map((r) => r.prompt?.trim().toLowerCase()).filter(Boolean));
  const picks = [];
  const add = (text, fromHistory) => {
    const key = text.trim().toLowerCase();
    if (picks.length < count && !asked.has(key) && !picks.some((p) => p.text.toLowerCase() === key)) {
      picks.push({ text: text.trim(), fromHistory });
    }
  };

  for (const row of recent) for (const s of row.suggestions ?? []) add(s, true);
  for (const q of commonQuestions) add(q, false);
  return picks;
}
