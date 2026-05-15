// src/components/animations/stagger-container.tsx

"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function StaggerContainer({ children }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      variants={{
        hidden: {},

        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
