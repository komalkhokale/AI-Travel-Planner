// src/components/ui/gradient-button.tsx

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;

  className?: string;
}

export default function GradientButton({ children, className }: Props) {
  return (
    <Button
      className={cn(
        `
        h-14
        w-full
        rounded-2xl
        bg-[#2563EB]
        px-8
        text-base
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:bg-[#1D4ED8]
        hover:scale-[1.01]
        active:scale-[0.99]
        cursor-pointer
        `,
        className,
      )}
    >
      {children}
    </Button>
  );
}
