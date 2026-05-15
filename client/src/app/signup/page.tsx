"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import api from "@/services/api";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  // GET EMAIL FROM LOCALSTORAGE
  const email =
    typeof window !== "undefined" ? localStorage.getItem("verifyEmail") : "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/otp/verify-otp", {
        email,
        otp,
      });

      toast.success(data.message);

      // REMOVE TEMP EMAIL
      localStorage.removeItem("verifyEmail");

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-zinc-50
      px-6
      "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-8
        shadow-xl
        "
      >
        <h1
          className="
          text-center
          text-4xl
          font-bold
          text-zinc-900
          "
        >
          Verify OTP
        </h1>

        <p
          className="
          mt-3
          text-center
          text-zinc-500
          "
        >
          Enter the OTP sent to:
        </p>

        {/* EMAIL DISPLAY */}
        <div
          className="
          mt-4
          rounded-2xl
          border
          border-zinc-200
          bg-zinc-100
          px-4
          py-4
          text-center
          font-medium
          text-zinc-700
          "
        >
          {email}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleVerify}
          className="
          mt-6
          space-y-4
          "
        >
          {/* OTP INPUT */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="
            h-14
            w-full
            rounded-2xl
            border
            border-zinc-300
            px-4
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            "
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="
            h-14
            w-full
            rounded-2xl
            bg-blue-600
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            "
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
