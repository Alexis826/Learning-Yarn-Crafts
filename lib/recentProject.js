import { sql } from "@/lib/db";
import { starterProjects } from "@/app/projects/starterProjects";

// The unfinished project the user touched most recently (checked a step or
// used a counter), with its progress, or null.
export async function recentProject(userId) {
  const rows = await sql`
    select project_key, completed_steps, row_count, stitch_count
    from project_progress
    where user_id = ${userId}
      and (cardinality(completed_steps) > 0 or row_count > 0 or stitch_count > 0)
    order by updated_at desc
    limit 10
  `;
  if (rows.length === 0) return null;

  // Saved project ids are uuids; beginner project ids are not.
  const uuid = /^[0-9a-f-]{36}$/i;
  const savedIds = rows.map((r) => r.project_key).filter((key) => uuid.test(key));
  const saved = savedIds.length
    ? await sql`select id, name, craft, steps from projects where user_id = ${userId} and id = any(${savedIds})`
    : [];

  for (const row of rows) {
    const project =
      starterProjects.find((p) => p.id === row.project_key) ??
      saved.find((p) => p.id === row.project_key);
    if (!project) continue;

    const total = project.steps.length;
    const done = row.completed_steps.filter((i) => i < total).length;
    if (done >= total) continue;

    return {
      id: project.id,
      name: project.name,
      craft: project.craft,
      rendering: project.rendering,
      done,
      total,
      rowCount: row.row_count,
      stitchCount: row.stitch_count,
    };
  }
  return null;
}
