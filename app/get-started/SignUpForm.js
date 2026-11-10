"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { authErrorMessage } from "@/lib/auth/errors";
import { plans } from "../plans";
import { choosePlan } from "./actions";

export default function SignUpForm() {
  const router = useRouter();
  const [plan, setPlan] = useState("Free");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [welcomeName, setWelcomeName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    setPending(true);
    setError("");

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email: form.get("email").trim(),
        password: form.get("password"),
      });
      if (signUpError) {
        setError(authErrorMessage(signUpError, "We couldn't create your account. Please try again."));
        return;
      }

      const result = await choosePlan(plan);
      if (result.error) {
        setError(result.error);
        return;
      }

      setWelcomeName(name);
      router.refresh();
    } catch (err) {
      setError(authErrorMessage(err, "We couldn't create your account. Please try again."));
    } finally {
      setPending(false);
    }
  }

  if (welcomeName) {
    return (
      <div className="signup-notice" role="status">
        <h2>Welcome, {welcomeName}!</h2>
        <p>
          Your account is ready on the {plan} plan. Your projects will be saved
          to your account.
        </p>
        <Link href="/projects" className="button">
          Go to my projects
        </Link>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <fieldset className="account-fields">
        <legend>Your account</legend>
        <label>
          Name
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Choose your plan</legend>
        <div className="plan-grid">
          {plans.map((p) => (
            <label
              key={p.name}
              className={`plan plan-option${plan === p.name ? " selected" : ""}`}
            >
              <input
                type="radio"
                name="plan"
                value={p.name}
                checked={plan === p.name}
                onChange={() => setPlan(p.name)}
              />
              <span className="plan-name">{p.name}</span>
              <span className="price">
                {p.price}
                <span> per month</span>
              </span>
              {p.features.map((feature) => (
                <span key={feature} className="plan-feature">
                  {feature}
                </span>
              ))}
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="form-switch">
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </p>
    </form>
  );
}
