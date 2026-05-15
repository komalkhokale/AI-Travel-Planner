"use client";

import { usePathname } from "next/navigation";

import FloatingNavbar from "./floating-navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

 const hideNavbar =
   pathname === "/login" ||
   pathname === "/signup" ||
   pathname === "/forgot-password" ||
   pathname === "/verify-otp";

  return (
    <>
      {!hideNavbar && <FloatingNavbar />}

      {children}
    </>
  );
}
