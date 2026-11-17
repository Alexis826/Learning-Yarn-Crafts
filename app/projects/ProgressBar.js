// "3 of 8 steps" with a bar, or a finished check once every step is done.
export default function ProgressBar({ done, total, compact = false }) {
  if (total === 0) return null;
  const finished = done >= total;
  const percent = Math.round((Math.min(done, total) / total) * 100);

  return (
    <span className={`progress${compact ? " compact" : ""}${finished ? " finished" : ""}`}>
      <span
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={Math.min(done, total)}
        aria-label="Steps completed"
      >
        <span className="progress-fill" style={{ width: `${percent}%` }} />
      </span>
      <span className="progress-label">
        {finished ? "✓ Finished!" : `${done} of ${total} steps`}
      </span>
    </span>
  );
}
