import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Soft content settle under the brand route wipe.
 * Opacity-only so ScrollTrigger pins / fixed UI stay correct.
 */
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.45,
        delay: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
