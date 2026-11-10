"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import YarnBall from "../YarnBall";

// A grid of project tiles; clicking one opens its directions. `showAdd` puts
// the Add project tile (which leads to Ask Loopy) first.
export default function ProjectGrid({ projects, showAdd = false, badge }) {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

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
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="project-tile"
              onClick={() => setOpen(project)}
            >
              {badge && <span className="example-badge">{badge}</span>}
              <YarnBall size={44} clipId={`yarn-${project.id}`} />
              <span className="project-name">{project.name}</span>
              {project.craft && <span className="project-craft">{project.craft}</span>}
              {project.details?.Time && (
                <span className="project-time">{project.details.Time}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={titleId}
        onClose={() => setOpen(null)}
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
            <h3>Directions</h3>
            <ol>
              {open.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
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
