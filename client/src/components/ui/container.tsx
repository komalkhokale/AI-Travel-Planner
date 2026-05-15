// src/components/ui/container.tsx

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        `
        mx-auto
        max-w-7xl
        px-6
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
