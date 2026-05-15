// src/components/layout/grid-layout.tsx

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function GridLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        `
        grid
        gap-8
        lg:grid-cols-2
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
