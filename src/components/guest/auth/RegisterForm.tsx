"use client";

import { useRef } from "react";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { SvgCaptcha } from "./SvgCaptcha";
import { COLORS } from "@/lib/constants";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  Eye,
  EyeOff,
  AlertCircle,
  Loader,
} from "lucide-react";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Nama lengkap harus diisi");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Format email tidak valid");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Nomor telepon harus diisi");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi tidak cocok");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("Anda harus setuju dengan syarat dan ketentuan");
      return false;
    }
    if (!captchaVerified) {
      setError("Verifikasi CAPTCHA terlebih dahulu");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/guest/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          agreeTerms: formData.agreeTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Pendaftaran gagal");
      }

      // Success - redirect to login or show success message
      alert("Pendaftaran berhasil! Silakan login dengan akun Anda.");
      window.location.href = "/guest/auth/login";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat pendaftaran");
      } else {
        setError("Terjadi kesalahan saat pendaftaran");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/customer/dashboard",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Gagal login dengan Google. Silakan coba lagi.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nama Perusahaan
        </label>
        <div className="relative">
          <Building2
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="PT Contoh Jaya"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Email */}
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Nomor Telepon
        </label>
        <div className="relative">
          <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+62 812 3456 7890"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.primary }}
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start">
        <input
          id="terms"
          name="agreeTerms"
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="w-4 h-4 rounded border-gray-300 cursor-pointer mt-0.5"
          style={{ accentColor: COLORS.accent }}
        />
        <label
          htmlFor="terms"
          className="ml-2 text-sm text-gray-700 cursor-pointer"
        >
          Saya setuju dengan{" "}
          <Link
            href="/terms"
            className="hover:underline font-semibold"
            style={{ color: COLORS.accent }}
          >
            syarat dan ketentuan
          </Link>
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
        disabled={isLoading || googleLoading}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? "Sedang mendaftar..." : "Daftar"}
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

      {/* Google Sign Up Button */}
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
            Daftar dengan Google
          </>
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link
          href="/guest/auth/login"
          className="font-semibold hover:underline"
          style={{ color: COLORS.accent }}
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
