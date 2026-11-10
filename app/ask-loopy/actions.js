"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth/server";
import { askGemini } from "@/lib/loopy";
import { loopyAllowance, recordLoopyRequest } from "@/lib/loopyUsage";
import { insertProject } from "@/lib/projects";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const youtubePattern =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]{6,}/;

// Sends the form to Loopy and saves any project it writes.
// Returns { reply, project, remaining } or { error }.
export async function askLoopy(_previous, formData) {
  const user = await currentUser();
  if (!user) return { error: "Please sign in to ask Loopy." };

  const allowance = await loopyAllowance(user.id);
  if (allowance.remaining <= 0) {
    return {
      error:
        allowance.limit === 0
          ? "Ask Loopy is part of the Pro and Ultimate plans."
          : "You've used all of your Loopy requests for this month. They reset on the 1st.",
    };
  }

  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const file = formData.get("image");
  const hasImage = file && typeof file === "object" && file.size > 0;

  if (!youtubeUrl && !message && !hasImage) {
    return { error: "Add a YouTube link, a pattern photo, or a message for Loopy." };
  }
  if (youtubeUrl && !youtubePattern.test(youtubeUrl)) {
    return { error: "That doesn't look like a YouTube video link." };
  }

  let image = null;
  if (hasImage) {
    if (!file.type.startsWith("image/")) return { error: "The pattern photo must be an image." };
    if (file.size > MAX_IMAGE_BYTES) return { error: "Please use a photo under 4 MB." };
    image = { mimeType: file.type, base64: Buffer.from(await file.arrayBuffer()).toString("base64") };
  }

  let answer;
  try {
    answer = await askGemini({ youtubeUrl, image, message });
  } catch (error) {
    console.error("Ask Loopy failed:", error);
    return {
      error:
        "Loopy couldn't read that. If it's a video, make sure it's public. Then try again in a moment.",
    };
  }

  await recordLoopyRequest(user.id);

  let project = null;
  if (answer.project) {
    const saved = await insertProject(user.id, answer.project);
    project = saved.project ?? null;
    if (project) revalidatePath("/projects");
  }

  return {
    reply: answer.reply,
    project,
    // null means unlimited (the Ultimate plan).
    remaining: allowance.limit === Infinity ? null : allowance.remaining - 1,
  };
}
