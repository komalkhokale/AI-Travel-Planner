// src/components/auth/auth-card.tsx

import GlassCard from "@/components/ui/glass-card";

interface Props {
  children: React.ReactNode;
}

export default function AuthCard({ children }: Props) {
  return (
    <GlassCard
      className="
      w-full
      max-w-[460px]
      rounded-[32px]
      border-black
      bg-white/80
      p-8
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      backdrop-blur-2xl
      "
    >
      {children}
    </GlassCard>
  );
}
