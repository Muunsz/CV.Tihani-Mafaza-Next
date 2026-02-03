"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { COLORS } from "@/lib/constants";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { SvgCaptcha } from "./SvgCaptcha";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}
export function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");

  // Auto-redirect if already logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (session.user.role === "staff") {
        router.replace("/staff/dashboard");
      } else if (session.user.role === "customer") {
        router.replace("/customer/dashboard");
      } else if (session.user.role === "guest") {
        router.replace("/guest/dashboard");
      } else {
        router.replace("/profile");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="text-center py-12">Memuat sesi...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }

    if (!captchaVerified) {
      setError("Silakan verifikasi CAPTCHA terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
      } else {
        // Redirect to dashboard sesuai role
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user?.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (data?.user?.role === "staff") {
          window.location.href = "/staff/dashboard";
        } else if (data?.user?.role === "customer") {
          window.location.href = "/customer/dashboard";
        } else if (data?.user?.role === "guest") {
          window.location.href = "/guest/dashboard";
        } else {
          window.location.href = "/profile";
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat masuk");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle
            size={20}
            className="text-red-600 flex-shrink-0 mt-0.5"
          />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Email Address
        </label>
        <div className="relative">
          <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold"
            style={{ color: COLORS.primary }}
          >
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm hover:underline"
            style={{ color: COLORS.accent }}
          >
            Lupa password?
          </Link>
        </div>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
          style={{ accentColor: COLORS.accent }}
        />
        <label
          htmlFor="remember"
          className="ml-2 text-sm text-gray-700 cursor-pointer"
        >
          Ingat saya di perangkat ini
        </label>
      </div>

      {/* SVG CAPTCHA */}
      <SvgCaptcha
        onVerified={setCaptchaVerified}
        onInputChange={setCaptchaInput}
        inputValue={captchaInput}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? "Sedang masuk..." : "Masuk"}
      </button>

      {/* Register Link */}
      <p className="text-center text-gray-600">
        Belum punya akun?{" "}
        <Link
          href="/guest/auth/register"
          className="font-semibold hover:underline"
          style={{ color: COLORS.accent }}
        >
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}
