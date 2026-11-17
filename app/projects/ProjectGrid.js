"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import YarnBall from "../YarnBall";
import ProgressBar from "./ProgressBar";
import ProjectRendering, { hasRendering } from "./ProjectRendering";
import StitchCounter from "./StitchCounter";
import { useProjectProgress } from "./useProjectProgress";
import { useReadAloud } from "./useReadAloud";

function SpeakerIcon({ speaking }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
      {speaking ? (
        <path d="M17 9l4 6M21 9l-4 6" />
      ) : (
        <>
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
        </>
      )}
    </svg>
  );
}

// A grid of project tiles, most completed first; clicking one opens its
// directions, with step checkboxes and a row & stitch counter. `showAdd` puts
// the Add project tile (which leads to Ask Loopy) first. `initialProgress` is
// the signed-in user's saved progress, keyed by project id. `openId` opens
// that project's directions when the page loads.
export default function ProjectGrid({
  projects,
  showAdd = false,
  badge,
  signedIn = false,
  initialProgress = {},
  openId,
}) {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const titleId = useId();
  const progress = useProjectProgress({ signedIn, initial: initialProgress });
  const readAloud = useReadAloud();

  function toggleStep(project, index) {
    const done = new Set(progress.get(project.id).completedSteps);
    if (done.has(index)) done.delete(index);
    else done.add(index);
    progress.update(project.id, { completedSteps: [...done].sort((a, b) => a - b) });
  }

  // Only count checked steps that still exist in the project.
  function stepsDone(project) {
    return progress.get(project.id).completedSteps.filter((i) => i < project.steps.length).length;
  }

  // Most completed first; projects with equal progress keep their order.
  const completion = (project) =>
    project.steps.length ? stepsDone(project) / project.steps.length : 0;
  const sorted = [...projects].sort((a, b) => completion(b) - completion(a));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Open the linked project once, e.g. from the home page's Continue button.
  useEffect(() => {
    const linked = openId && projects.find((p) => p.id === openId);
    if (linked) setOpen(linked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  return (
    <>
      <ul className="project-grid">
        {showAdd && (
          <li>
            <Link href="/ask-loopy" className="project-tile add-tile">
              <span className="plus" aria-hidden="true">+</span>
              Add project
            </Link>
          </li>
        )}
        {sorted.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="project-tile"
              onClick={() => setOpen(project)}
            >
              {badge && <span className="example-badge">{badge}</span>}
              {hasRendering(project.rendering) ? (
                <ProjectRendering kind={project.rendering} size={64} />
              ) : (
                <YarnBall size={44} clipId={`yarn-${project.id}`} />
              )}
              <span className="project-name">{project.name}</span>
              {project.craft && <span className="project-craft">{project.craft}</span>}
              {stepsDone(project) > 0 ? (
                <ProgressBar done={stepsDone(project)} total={project.steps.length} compact />
              ) : (
                project.details?.Time && (
                  <span className="project-time">{project.details.Time}</span>
                )
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={titleId}
        onClose={() => {
          readAloud.stop();
          setOpen(null);
        }}
      >
        {open && (
          <>
            <div className="dialog-header">
              <div>
                {open.craft && <span className="project-craft">{open.craft}</span>}
                <h2 id={titleId}>{open.name}</h2>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="Close"
                onClick={() => setOpen(null)}
              >
                ×
              </button>
            </div>
            {hasRendering(open.rendering) && (
              <figure className="project-preview">
                <ProjectRendering kind={open.rendering} size={180} />
                <figcaption>What your finished {open.name.toLowerCase()} will look like</figcaption>
              </figure>
            )}
            {open.details && (
              <dl className="project-details">
                {Object.entries(open.details).map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {open.materials?.length > 0 && (
              <>
                <h3>Materials</h3>
                <ul>
                  {open.materials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            <StitchCounter
              key={open.id}
              craft={open.craft}
              rowCount={progress.get(open.id).rowCount}
              stitchCount={progress.get(open.id).stitchCount}
              onChange={(change) => progress.update(open.id, change)}
            />
            <div className="directions-heading">
              <h3>Directions</h3>
              <ProgressBar done={stepsDone(open)} total={open.steps.length} />
            </div>
            <ol className="step-checklist">
              {open.steps.map((step, index) => {
                const checked = progress.get(open.id).completedSteps.includes(index);
                return (
                  <li key={step} className={checked ? "done" : undefined}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStep(open, index)}
                      />
                      <span className="step-number">{index + 1}.</span>
                      <span className="step-text">{step}</span>
                    </label>
                    {readAloud.supported && (
                      <button
                        type="button"
                        className={`speak-step${readAloud.speakingId === index ? " speaking" : ""}`}
                        aria-label={
                          readAloud.speakingId === index
                            ? `Stop reading step ${index + 1}`
                            : `Read step ${index + 1} aloud`
                        }
                        aria-pressed={readAloud.speakingId === index}
                        onClick={() => readAloud.toggle(index, `Step ${index + 1}. ${step}`)}
                      >
                        <SpeakerIcon speaking={readAloud.speakingId === index} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
            {!signedIn && (
              <p className="progress-note">
                Your progress is saved in this browser.{" "}
                <Link href="/sign-in">Sign in</Link> to keep it on every device.
              </p>
            )}
            {open.tip && (
              <p className="project-tip">
                <strong>Tip:</strong> {open.tip}
              </p>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
