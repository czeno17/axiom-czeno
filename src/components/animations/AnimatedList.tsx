import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/utils/animations/framerConfig";

export function AnimatedList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export function AnimatedListItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
