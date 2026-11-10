"use client";

import { createAuthClient } from "@neon/auth/next";

// Browser-side Neon Auth. Talks to the same-origin /api/auth proxy.
export const authClient = createAuthClient();
