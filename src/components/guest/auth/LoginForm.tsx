"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { COLORS } from "@/lib/constants";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from "lucide-react";
import { SvgCaptcha } from "./SvgCaptcha";

export function LoginForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      const role = session.user.role as string;

      const redirectMap: Record<string, string> = {
        admin: "/admin/dashboard",
        staff: "/staff/dashboard",
        customer: "/customer/dashboard",
        guest: "/guest/dashboard",
      };

      const redirectUrl = redirectMap[role] || "/";
      router.replace(redirectUrl);
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
      // Use NextAuth redirect callback by letting signIn handle the redirect
      const result = (await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/guest/auth/redirect",
      })) as { error?: string } | undefined;

      console.log("[LOGIN] Sign in result:", result);
      // If signIn doesn't redirect (error case), reset loading state
      if (result?.error) {
        setIsLoading(false);
        setError("Email atau password salah");
      }
      // If successful, signIn will redirect and this code won't execute
    } catch (err) {
      console.error("[LOGIN] SignIn error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      console.log("[GOOGLE_LOGIN] Starting Google sign in");

      // Use NextAuth redirect callback by letting signIn handle the redirect
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: "/guest/auth/redirect",
      });

      console.log("[GOOGLE_LOGIN] Google sign in result:", result);
      // If signIn doesn't redirect (shouldn't happen with redirect: true),
      // reset loading state and show error
      setGoogleLoading(false);
      setError(
        "Terjadi kesalahan saat login dengan Google. Silakan coba lagi.",
      );
    } catch (error) {
      console.error("[GOOGLE_LOGIN] Unexpected error:", error);
      setError("Gagal login dengan Google. Silakan coba lagi.");
      setGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
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
            href="/guest/auth/forgot-password"
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
        disabled={isLoading || googleLoading || !captchaVerified}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? "Sedang masuk..." : "Masuk"}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">atau</span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading || isLoading}
        className="w-full py-3 rounded-lg font-semibold transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 flex items-center justify-center gap-2"
      >
        {googleLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Menghubungkan dengan Google...
          </>
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Masuk dengan Google
          </>
        )}
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
