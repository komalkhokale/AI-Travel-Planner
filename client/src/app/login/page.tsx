"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { Lock, Mail } from "lucide-react";

import { toast } from "sonner";

import api from "@/services/api";

import { useAuthStore } from "@/store/auth-store";

import FadeUp from "@/components/animations/fade-up";

import AuthCard from "@/components/auth/auth-card";

import AuthInput from "@/components/auth/auth-input";

import AuthLayout from "@/components/auth/auth-layout";

import GradientButton from "@/components/ui/gradient-button";

export default function LoginPage() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      setAuth(data.user, data.token);

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <FadeUp>
        <AuthCard>
          {/* HEADING */}
          <div className="text-center">
            <h1
              className="
              text-4xl
              font-bold
              tracking-tight
              text-zinc-900
              "
            >
              Welcome Back
            </h1>

            <p
              className="
              mt-3
              text-zinc-500
              "
            >
              Login to continue your travel journey.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            mt-8
            space-y-4
            "
          >
            {/* EMAIL */}
            <div className="relative">
              <Mail
                size={18}
                className="
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-zinc-400
                "
              />

              <AuthInput
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                className="
                h-14
                rounded-2xl
                border-zinc-300
                bg-white
                pl-12
                text-zinc-900
                placeholder:text-zinc-400
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                "
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock
                size={18}
                className="
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-zinc-400
                "
              />

              <AuthInput
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                className="
                h-14
                rounded-2xl
                border-zinc-300
                bg-white
                pl-12
                text-zinc-900
                placeholder:text-zinc-400
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                "
                onChange={handleChange}
              />
            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="
                text-sm
                font-medium
                text-blue-600
                transition
                hover:text-blue-500
                "
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <GradientButton className="w-full">
              {loading ? "Logging in..." : "Login"}
            </GradientButton>
          </form>

          {/* DIVIDER */}
          <div
            className="
            my-8
            flex
            items-center
            "
          >
            <div className="h-px flex-1 bg-zinc-200" />

            <span
              className="
              px-4
              text-sm
              text-zinc-400
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* SIGNUP */}
          <p
            className="
            text-center
            text-sm
            text-zinc-500
            "
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="
              font-semibold
              text-blue-600
              hover:text-blue-500
              "
            >
              Create account
            </Link>
          </p>
        </AuthCard>
      </FadeUp>
    </AuthLayout>
  );
}
