import { GoogleGenAI } from "@google/genai";

export const LOOPY_MODEL = "gemini-3.8-flash";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `You are Loopy, the friendly helper on Cozy Loops, a site for beginners learning knitting and crochet.

People send you a tutorial video, a photo of a pattern, pasted pattern text, or a question.

When they send a pattern or a tutorial (video, photo, or text) for something they can make:
- Write a project: a clear name, the craft, the yarn weight with its number (for example "Worsted weight (#4)"), the hook or needle size in both mm and US sizing, a rough time for a beginner, the finished size, and the skills used.
- Write the steps in your own words for a beginner. Spell out every abbreviation (write "double crochet", never "dc"). Keep stitch counts and row or round numbers exact. One action per step.
- Use US crochet terms. If the source uses UK terms, convert them and mention that in the tip.
- Only include details you can actually see or hear in the source. If something is missing (for example the video never names the yarn), give a sensible beginner suggestion and say it's a suggestion.

When they ask a question (yarn choice, which hook, what a pattern could become, and so on), answer it in "reply" and leave out "project".

If the input isn't about knitting or crochet, say so kindly in "reply" and leave out "project".

"reply" is always 1 to 4 warm, encouraging sentences to the person.`;

const projectSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Short project name, e.g. Ribbed Beanie" },
    craft: { type: "string", enum: ["Crochet", "Knitting"] },
    yarn: { type: "string", description: "Yarn weight with number, fiber if known, and rough amount" },
    tool: { type: "string", description: "Hook or needle size in mm and US sizing" },
    time: { type: "string", description: "Rough time for a beginner" },
    size: { type: "string", description: "Finished size" },
    skills: { type: "string", description: "Comma-separated skills used" },
    materials: { type: "array", items: { type: "string" } },
    steps: { type: "array", items: { type: "string" }, minItems: 1 },
    tip: { type: "string", description: "One helpful beginner tip" },
  },
  required: ["name", "craft", "yarn", "tool", "materials", "steps"],
};

const responseJsonSchema = {
  type: "object",
  properties: {
    reply: { type: "string" },
    project: projectSchema,
  },
  required: ["reply"],
};

// Gemini answers 503 (busy) or 429 (rate limited) during demand spikes.
// Try up to 3 times, waiting 2s then 4s between tries.
async function withRetries(call) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await call();
    } catch (error) {
      const busy = error?.status === 503 || error?.status === 429;
      if (!busy || attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// Asks Loopy about a YouTube video, a pattern photo and/or a message.
// Returns { reply, project } where project is null for plain questions.
export async function askGemini({ youtubeUrl, image, message }) {
  const parts = [];
  if (youtubeUrl) parts.push({ fileData: { fileUri: youtubeUrl } });
  if (image) parts.push({ inlineData: { mimeType: image.mimeType, data: image.base64 } });
  parts.push({
    text: message || "Turn this into beginner-friendly step-by-step directions.",
  });

  const response = await withRetries(() =>
    ai.models.generateContent({
      model: LOOPY_MODEL,
      contents: [{ role: "user", parts }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseJsonSchema,
      },
    }),
  );

  const result = JSON.parse(response.text ?? "{}");
  return {
    reply: typeof result.reply === "string" ? result.reply : "",
    project: result.project?.steps?.length ? result.project : null,
  };
}
