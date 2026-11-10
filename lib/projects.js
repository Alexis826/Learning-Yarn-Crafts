import { sql } from "@/lib/db";

const crafts = ["Crochet", "Knitting"];

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function textList(value) {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

// Builds the labeled details shown at the top of a project's directions.
function detailsFor({ craft, yarn, tool, time, size, skills }) {
  const entries = [
    ["Yarn", yarn],
    [craft === "Knitting" ? "Needles" : "Hook", tool],
    ["Time", time],
    ["Size", size],
    ["Skills", skills],
  ].filter(([, value]) => text(value));
  return entries.length ? Object.fromEntries(entries.map(([k, v]) => [k, text(v)])) : null;
}

// Saves a project for a user. Returns { project } or { error }.
export async function insertProject(userId, input) {
  const name = text(input.name);
  const steps = textList(input.steps);
  if (!name) return { error: "A project needs a name." };
  if (steps.length === 0) return { error: "A project needs at least one step." };

  const craft = crafts.includes(input.craft) ? input.craft : null;
  const details = detailsFor({ ...input, craft });

  const [project] = await sql`
    insert into projects (user_id, name, craft, materials, steps, details, tip)
    values (
      ${userId},
      ${name},
      ${craft},
      ${JSON.stringify(textList(input.materials))},
      ${JSON.stringify(steps)},
      ${details ? JSON.stringify(details) : null},
      ${text(input.tip) || null}
    )
    returning id, name, craft, materials, steps, details, tip
  `;
  return { project };
}
