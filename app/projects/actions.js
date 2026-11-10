"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth/server";
import { sql } from "@/lib/db";

const crafts = ["Crochet", "Knitting"];

function textList(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

// Saves a project to the signed-in user's Projects page. Ask Loopy calls this
// with { name, craft: "Crochet" | "Knitting", materials: [string], steps: [string] }.
export async function saveProject({ name, craft, materials, steps }) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in to save projects." };

  const projectName = typeof name === "string" ? name.trim() : "";
  const projectSteps = textList(steps);
  if (!projectName) return { error: "A project needs a name." };
  if (projectSteps.length === 0) return { error: "A project needs at least one step." };

  const [project] = await sql`
    insert into projects (user_id, name, craft, materials, steps)
    values (
      ${user.id},
      ${projectName},
      ${crafts.includes(craft) ? craft : null},
      ${JSON.stringify(textList(materials))},
      ${JSON.stringify(projectSteps)}
    )
    returning id, name, craft, materials, steps
  `;
  revalidatePath("/projects");
  return { project };
}
