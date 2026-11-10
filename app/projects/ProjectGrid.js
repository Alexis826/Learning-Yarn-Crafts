"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import YarnBall from "../YarnBall";
import { exampleProject } from "./exampleProject";

// `saved` is the signed-in user's projects, loaded from the database.
export default function ProjectGrid({ saved = [] }) {
  const projects = [exampleProject, ...saved];
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <ul className="project-grid">
        <li>
          <Link href="/ask-loopy" className="project-tile add-tile">
            <span className="plus" aria-hidden="true">+</span>
            Add project
          </Link>
        </li>
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="project-tile"
              onClick={() => setOpen(project)}
            >
              {project.example && <span className="example-badge">Example</span>}
              <YarnBall size={44} clipId={`yarn-${project.id}`} />
              <span className="project-name">{project.name}</span>
              {project.craft && <span className="project-craft">{project.craft}</span>}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={() => setOpen(null)}
      >
        {open && (
          <>
            <div className="dialog-header">
              <div>
                {open.craft && <span className="project-craft">{open.craft}</span>}
                <h2 id="project-dialog-title">{open.name}</h2>
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
            {open.example && (
              <p className="example-note">
                This is an example of how Loopy&apos;s instructions will look.
              </p>
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
          </>
        )}
      </dialog>
    </>
  );
}
