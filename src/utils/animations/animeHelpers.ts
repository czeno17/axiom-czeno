// Lightweight, dependency-free helpers for one-off imperative animations
// (e.g. a confidence stamp pulse on submit). The project intentionally does
// not depend on anime.js — framer-motion (see framerConfig.ts) covers
// declarative React animation; this file is for the rare imperative case.

export function pulse(el: HTMLElement | null, className = "animate-pulse", durationMs = 600) {
  if (!el) return;
  el.classList.add(className);
  window.setTimeout(() => el.classList.remove(className), durationMs);
}
