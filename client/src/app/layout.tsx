// src/app/layout.tsx

import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/providers/theme-provider";

import AuthProvider from "@/providers/auth-provider";

import { Poppins } from "next/font/google";

import LayoutWrapper from "@/components/layout/layout-wrapper";

const poppins = Poppins({
  subsets: ["latin"],

  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Travel",

  description: "Smart AI Travel Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider>
          <AuthProvider>
            <LayoutWrapper>
              <main>{children}</main>

              <Toaster richColors position="top-right" />
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
