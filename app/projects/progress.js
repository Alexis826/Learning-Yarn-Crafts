"use server";

import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";

const MAX_COUNT = 100000;

function count(value) {
  const n = Math.trunc(Number(value));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), MAX_COUNT) : 0;
}

// Saves the signed-in user's progress on one project.
export async function saveProgress(projectKey, { completedSteps, rowCount, stitchCount }) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in to save progress." };
  if (typeof projectKey !== "string" || !projectKey || projectKey.length > 100) {
    return { error: "Unknown project." };
  }

  const steps = Array.isArray(completedSteps)
    ? [...new Set(completedSteps.map((s) => Math.trunc(Number(s))))].filter(
        (s) => Number.isInteger(s) && s >= 0 && s < 200,
      )
    : [];

  await sql`
    insert into project_progress (user_id, project_key, completed_steps, row_count, stitch_count)
    values (${user.id}, ${projectKey}, ${steps}, ${count(rowCount)}, ${count(stitchCount)})
    on conflict (user_id, project_key) do update set
      completed_steps = excluded.completed_steps,
      row_count = excluded.row_count,
      stitch_count = excluded.stitch_count,
      updated_at = now()
  `;
  return { ok: true };
}
