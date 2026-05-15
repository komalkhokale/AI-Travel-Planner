// src/components/ui/glass-card.tsx

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function GlassCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-xl
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
