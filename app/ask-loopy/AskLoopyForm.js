"use client";

import Link from "next/link";
import { useActionState, useRef } from "react";
import LoopyMascot from "../LoopyMascot";
import { askLoopy } from "./actions";

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function PlayIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 5l11 7-11 7z" fill="currentColor" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 5h14v10H10l-5 4z" />
    </svg>
  );
}

// Clickable prompts that fill in the message box.
function PromptChips({ prompts, onPick, label }) {
  if (prompts.length === 0) return null;
  return (
    <div className="prompt-chips">
      <p className="prompt-chips-label">{label}</p>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt.text}>
            <button
              type="button"
              className={`prompt-chip${prompt.fromHistory ? " from-history" : ""}`}
              onClick={() => onPick(prompt.text)}
            >
              {prompt.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// `remaining` is how many requests are left this month, or null for unlimited.
// `suggestions` are prompts based on the user's recent requests and common
// beginner questions.
export default function AskLoopyForm({ remaining, suggestions = [] }) {
  const [state, formAction, pending] = useActionState(askLoopy, null);
  const left = state && "remaining" in state ? state.remaining : remaining;
  const messageRef = useRef(null);

  function fillPrompt(text) {
    const box = messageRef.current;
    box.value = text;
    box.scrollIntoView({ block: "center", behavior: "smooth" });
    box.focus();
  }

  const hasHistory = suggestions.some((s) => s.fromHistory);

  return (
    <>
      <form className="loopy-form" action={formAction}>
        <h2 className="loopy-form-title">What can Loopy help with?</h2>
        <p className="loopy-form-subtitle">Fill in any one of these, or combine them.</p>

        <PromptChips
          prompts={suggestions}
          onPick={fillPrompt}
          label={hasHistory ? "Ideas based on what you've asked" : "Try asking"}
        />

        <label className="loopy-field">
          <span className="loopy-field-label">
            <span className="field-icon">
              <PlayIcon />
            </span>
            YouTube tutorial link
          </span>
          <input
            type="url"
            name="youtubeUrl"
            placeholder="https://www.youtube.com/watch?v=…"
          />
        </label>
        <label className="loopy-field">
          <span className="loopy-field-label">
            <span className="field-icon">
              <CameraIcon />
            </span>
            Pattern photo
          </span>
          <input type="file" name="image" accept="image/*" />
          <span className="field-hint">A clear photo or screenshot, under 4 MB.</span>
        </label>
        <label className="loopy-field">
          <span className="loopy-field-label">
            <span className="field-icon">
              <ChatIcon />
            </span>
            Message for Loopy
          </span>
          <textarea
            ref={messageRef}
            name="message"
            rows={4}
            placeholder="Paste a pattern, or ask something like “What yarn should I use for a baby blanket?”"
          />
        </label>

        {state?.error && (
          <p className="form-error" role="alert">
            {state.error}
          </p>
        )}

        <button type="submit" className="button" disabled={pending}>
          {pending ? "Loopy is working…" : "Ask Loopy"}
        </button>
        {left !== null && (
          <p className="form-switch">
            {left} Loopy {left === 1 ? "request" : "requests"} left this month
          </p>
        )}
      </form>

      {pending && (
        <div className="loopy-thinking" role="status">
          <LoopyMascot size={56} clipId="loopy-thinking" />
          <p>Loopy is reading and watching carefully. Videos can take a minute.</p>
        </div>
      )}

      {!pending && state?.reply && (
        <section className="loopy-answer" aria-live="polite">
          <div className="loopy-bubble">
            <LoopyMascot size={56} clipId="loopy-answer" />
            <p>{state.reply}</p>
          </div>

          {state.project && (
            <article className="loopy-project">
              {state.project.craft && (
                <span className="project-craft">{state.project.craft}</span>
              )}
              <h2>{state.project.name}</h2>
              {state.project.details && (
                <dl className="project-details">
                  {Object.entries(state.project.details).map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {state.project.materials?.length > 0 && (
                <>
                  <h3>Materials</h3>
                  <ul>
                    {state.project.materials.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              <h3>Directions</h3>
              <ol>
                {state.project.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {state.project.tip && (
                <p className="project-tip">
                  <strong>Tip:</strong> {state.project.tip}
                </p>
              )}
              <p className="saved-note">
                ✓ Saved to <Link href="/projects">your Projects</Link>
              </p>
            </article>
          )}

          <div className="loopy-followups">
            <PromptChips
              prompts={(state.suggestions ?? []).map((text) => ({ text, fromHistory: true }))}
              onPick={fillPrompt}
              label="Ask Loopy next"
            />
          </div>
        </section>
      )}
    </>
  );
}
