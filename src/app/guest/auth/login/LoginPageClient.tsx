"use client";

import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { LoginForm } from "@/components/guest/auth/LoginForm";
import { COLORS } from "@/lib/constants";

export function LoginPageClient() {
  // Google sign-in is handled by LoginForm component
  // No need to duplicate logic here

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: COLORS.primary }}
            >
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-600">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            <LoginForm />
          </div>

          {/* Divider dan tombol Google Sign In sudah ada di LoginForm, tidak perlu di sini */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
