import { createNeonAuth } from "@neon/auth/next/server";

// Server-side Neon Auth: session lookups and the /api/auth proxy.
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET },
});

// The signed-in user, or null.
export async function currentUser() {
  const { data: session } = await auth.getSession();
  return session?.user ?? null;
}
