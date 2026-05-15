// src/components/animations/floating-element.tsx

"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function FloatingElement({ children }: Props) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}
