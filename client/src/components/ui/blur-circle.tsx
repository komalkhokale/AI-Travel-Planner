// src/components/ui/blur-circle.tsx

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function BlurCircle({ className }: Props) {
  return (
    <div
      className={cn(
        `
        absolute
        rounded-full
        bg-violet-500/20
        blur-[120px]
        `,
        className,
      )}
    />
  );
}
