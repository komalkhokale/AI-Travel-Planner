// src/components/animations/hover-scale.tsx

"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function HoverScale({ children }: Props) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
