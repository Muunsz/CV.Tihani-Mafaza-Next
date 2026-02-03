'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/lib/constants';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface ResetPasswordFormProps {
  token?: string;
  onSubmit?: (password: string, confirmPassword: string) => void;
}

export function ResetPasswordForm({ token, onSubmit }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Password dan konfirmasi harus diisi');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak cocok');
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(password, confirmPassword);
      }
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Terjadi kesalahan saat reset password');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.accent}20` }}
          >
            <CheckCircle size={32} style={{ color: COLORS.accent }} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
            Password Berhasil Direset
          </h2>
          <p className="text-gray-600">
            Password Anda telah diubah dengan sukses. Silakan masuk dengan password baru Anda.
          </p>
        </div>

        <Link
          href="/auth/login"
          className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          Masuk Sekarang
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
          Reset Password
        </h2>
        <p className="text-gray-600">
          Masukkan password baru Anda di bawah ini.
        </p>
      </div>

      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!token && (
        <div className="flex gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">Token tidak ditemukan. Link reset password mungkin sudah kadaluarsa.</p>
        </div>
      )}

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Password Baru
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Konfirmasi Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !token}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? 'Sedang menyimpan...' : 'Reset Password'}
      </button>

      <p className="text-center text-gray-600">
        Kembali ke{' '}
        <Link
          href="/auth/login"
          className="font-semibold hover:underline"
          style={{ color: COLORS.accent }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}
