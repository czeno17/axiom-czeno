import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/animations/framerConfig";

export function AnimatedCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className={className}>
      {children}
    </motion.div>
  );
}
