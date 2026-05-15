// src/components/auth/auth-input.tsx

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface Props {
  placeholder: string;

  type?: string;

  className?: string;

  name?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
  placeholder,
  type = "text",
  className,
  name,
  onChange,
}: Props) {
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={cn(
        `
        h-14
        rounded-2xl
        border-zinc-300
        bg-white
        text-black
        placeholder:text-zinc-400
        focus-visible:ring-2
        focus-visible:ring-blue-500
        `,
        className,
      )}
    />
  );
}
