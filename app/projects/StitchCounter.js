"use client";

import { useState } from "react";

const stepSizes = [1, 5, 10];

function Counter({ label, value, onChange }) {
  const [by, setBy] = useState(1);
  const name = label.toLowerCase();

  return (
    <div className="counter">
      <span className="counter-label">{label}</span>
      <div className="counter-controls">
        <button
          type="button"
          className="counter-button"
          aria-label={`Subtract ${by} from ${name}`}
          disabled={value === 0}
          onClick={() => onChange(Math.max(value - by, 0))}
        >
          −{by > 1 && <span className="counter-by">{by}</span>}
        </button>
        <output className="counter-value" aria-live="polite" aria-label={label}>
          {value}
        </output>
        <button
          type="button"
          className="counter-button"
          aria-label={`Add ${by} to ${name}`}
          onClick={() => onChange(value + by)}
        >
          +{by > 1 && <span className="counter-by">{by}</span>}
        </button>
      </div>
      <div className="counter-step" role="group" aria-label={`Count ${name} by`}>
        <span>Count by</span>
        {stepSizes.map((size) => (
          <button
            key={size}
            type="button"
            className={size === by ? "active" : undefined}
            aria-pressed={size === by}
            onClick={() => setBy(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="counter-reset"
        disabled={value === 0}
        onClick={() => onChange(0)}
      >
        Reset
      </button>
    </div>
  );
}

// A row counter and a stitch counter that fold open inside a project.
export default function StitchCounter({ rowCount, stitchCount, onChange, craft }) {
  const [open, setOpen] = useState(rowCount > 0 || stitchCount > 0);

  return (
    <div className="stitch-counter">
      <button
        type="button"
        className="stitch-counter-toggle"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? "▾" : "▸"}</span> Row &amp; stitch counter
        {!open && (rowCount > 0 || stitchCount > 0) && (
          <span className="counter-summary">
            Row {rowCount} · Stitch {stitchCount}
          </span>
        )}
      </button>
      {open && (
        <div className="counter-panel">
          <Counter
            label={craft === "Crochet" ? "Rows / rounds" : "Rows"}
            value={rowCount}
            onChange={(rowCount) => onChange({ rowCount })}
          />
          <Counter
            label="Stitches"
            value={stitchCount}
            onChange={(stitchCount) => onChange({ stitchCount })}
          />
        </div>
      )}
    </div>
  );
}
