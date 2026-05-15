// src/components/auth/auth-layout.tsx

import BlurCircle from "@/components/ui/blur-circle";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#F8FAFC]
      px-6
      pt-36
      "
    >
      {/* BLUR */}
      <BlurCircle
        className="
        left-[-100px]
        top-[-100px]
        h-[300px]
        w-[300px]
        bg-blue-400/20
        "
      />

      <BlurCircle
        className="
        bottom-[-100px]
        right-[-100px]
        h-[300px]
        w-[300px]
        bg-violet-400/20
        "
      />

      {/* CONTENT */}
      <div
        className="
        flex
        justify-center
        "
      >
        {children}
      </div>
    </div>
  );
}
    