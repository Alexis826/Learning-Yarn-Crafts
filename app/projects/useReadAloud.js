"use client";

import { useCallback, useEffect, useState } from "react";

// Reads text aloud with the browser's built-in voices. `speakingId` is the id
// passed to `toggle` while it's being read; pressing the same id again stops.
export function useReadAloud() {
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    // Stop reading if the user leaves the page.
    return () => window.speechSynthesis?.cancel();
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  }, []);

  const toggle = useCallback(
    (id, text) => {
      const speech = window.speechSynthesis;
      if (!speech) return;
      speech.cancel();
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setSpeakingId((current) => (current === id ? null : current));
      utterance.onerror = utterance.onend;
      setSpeakingId(id);
      speech.speak(utterance);
    },
    [speakingId],
  );

  return { supported, speakingId, toggle, stop };
}
