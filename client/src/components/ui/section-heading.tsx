// src/components/ui/section-heading.tsx

import { cn } from "@/lib/utils";

interface Props {
  title: string;

  subtitle?: string;

  className?: string;
}

export default function SectionHeading({ title, subtitle, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2
        className="
        text-5xl
        font-bold
        tracking-tight
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
          mt-5
          text-lg
          leading-8
          text-zinc-400
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
