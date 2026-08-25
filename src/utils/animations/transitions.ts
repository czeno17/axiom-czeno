export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const TRANSITIONS = {
  fast: { duration: 0.15, ease: EASE_OUT },
  base: { duration: 0.25, ease: EASE_OUT },
  slow: { duration: 0.4, ease: EASE_OUT },
};
