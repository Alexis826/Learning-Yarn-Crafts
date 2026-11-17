"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { saveProgress } from "./progress";

const STORAGE_KEY = "cozy-loops-progress";
const empty = { completedSteps: [], rowCount: 0, stitchCount: 0 };

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeLocal(key, value) {
  try {
    // Re-read first: other project grids on the page save here too.
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readLocal(), [key]: value }));
  } catch {
    // Storage can be unavailable (private browsing); progress just isn't kept.
  }
}

// Progress for every project, keyed by project id. Signed-in users' progress
// is saved to the database (counter taps are batched); signed-out visitors'
// progress stays in this browser.
export function useProjectProgress({ signedIn, initial = {} }) {
  const [progress, setProgress] = useState(initial);
  const latest = useRef(initial);
  const timers = useRef({});

  useEffect(() => {
    if (!signedIn) {
      latest.current = readLocal();
      setProgress(latest.current);
    }
  }, [signedIn]);

  const get = useCallback((key) => ({ ...empty, ...progress[key] }), [progress]);

  const update = useCallback(
    (key, change) => {
      const next = { ...empty, ...latest.current[key], ...change };
      latest.current = { ...latest.current, [key]: next };
      setProgress(latest.current);

      if (signedIn) {
        clearTimeout(timers.current[key]);
        timers.current[key] = setTimeout(() => saveProgress(key, next), 600);
      } else {
        writeLocal(key, next);
      }
    },
    [signedIn],
  );

  return { get, update };
}
