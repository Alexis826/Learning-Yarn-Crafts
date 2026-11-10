"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { authErrorMessage } from "@/lib/auth/errors";

export default function SignInForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");

    try {
      const { error: signInError } = await authClient.signIn.email({
        email: form.get("email").trim(),
        password: form.get("password"),
      });
      if (signInError) {
        setError(authErrorMessage(signInError, "We couldn't sign you in. Please try again."));
        return;
      }
      router.push("/projects");
      router.refresh();
    } catch (err) {
      setError(authErrorMessage(err, "We couldn't sign you in. Please try again."));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <fieldset className="account-fields">
        <legend>Your account</legend>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
      </fieldset>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="form-switch">
        New to Cozy Loops? <Link href="/get-started">Create an account</Link>
      </p>
    </form>
  );
}
