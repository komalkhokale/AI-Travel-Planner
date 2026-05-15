// src/components/layout/section-wrapper.tsx

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function SectionWrapper({ children, className }: Props) {
  return (
    <section
      className={cn(
        `
        relative
        py-32
        `,
        className,
      )}
    >
      {children}
    </section>
  );
}
