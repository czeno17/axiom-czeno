import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations/framerConfig";

export function PageTransition({ children, pageKey }: { children: ReactNode; pageKey: string }) {
  return (
    <motion.div
      key={pageKey}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
