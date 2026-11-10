"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth/server";
import { insertProject } from "@/lib/projects";

// Saves a project to the signed-in user's Projects page. Takes
// { name, craft: "Crochet" | "Knitting", yarn, tool, time, size, skills,
//   materials: [string], steps: [string], tip }.
export async function saveProject(project) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in to save projects." };

  const result = await insertProject(user.id, project);
  if (result.project) revalidatePath("/projects");
  return result;
}
