// src/components/layout/page-wrapper.tsx

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function PageWrapper({ children, className }: Props) {
  return (
    <main
      className={cn(
        `
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
        `,
        className,
      )}
    >
      {children}
    </main>
  );
}
