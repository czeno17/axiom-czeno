import { useEffect, useState } from "react";

// Small helper for "enter" animations driven purely by CSS/Tailwind classes,
// used by components that don't need full framer-motion (see AnimatedCard
// for the framer-motion equivalent).
export function useMountedFade(delayMs = 0) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return mounted;
}
