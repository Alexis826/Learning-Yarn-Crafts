"use client";

import { useState } from "react";
import { plans } from "../plans";

export default function SignUpForm() {
  const [plan, setPlan] = useState("Free");
  const [submitted, setSubmitted] = useState(false);

  // Accounts aren't saved anywhere yet: there is no sign-up backend.
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="signup-notice" role="status">
        <h2>Thanks for your interest!</h2>
        <p>
          Sign-ups for the {plan} plan aren&apos;t open yet, so no account was
          created. Check back soon.
        </p>
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

      <button type="submit" className="button">
        Create account
      </button>
    </form>
  );
}
