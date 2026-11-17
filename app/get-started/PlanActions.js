"use client";

import { useState } from "react";
import { plans } from "../plans";
import { openBillingPortal, startCheckout } from "./billing";

// Upgrade buttons for the signed-in user's Get Started page, or a Manage
// subscription button once they pay through Stripe.
export default function PlanActions({ currentPlan, hasSubscription }) {
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");

  async function go(action, key) {
    setPending(key);
    setError("");
    const result = await action();
    if (result.url) {
      window.location.assign(result.url);
      return;
    }
    setError(result.error);
    setPending("");
  }

  const upgrades = plans.filter(
    (p) => p.name !== "Free" && p.name !== currentPlan && !(currentPlan === "Ultimate" && p.name === "Pro"),
  );

  return (
    <div className="plan-actions">
      {hasSubscription ? (
        <button
          type="button"
          className="button"
          disabled={Boolean(pending)}
          onClick={() => go(openBillingPortal, "portal")}
        >
          {pending === "portal" ? "Opening…" : "Manage subscription"}
        </button>
      ) : (
        upgrades.map((p) => (
          <button
            key={p.name}
            type="button"
            className="button"
            disabled={Boolean(pending)}
            onClick={() => go(() => startCheckout(p.name), p.name)}
          >
            {pending === p.name ? "Opening secure checkout…" : `Upgrade to ${p.name}, ${p.price}/month`}
          </button>
        ))
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
