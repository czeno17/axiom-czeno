import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

export function TransitionGroup({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
