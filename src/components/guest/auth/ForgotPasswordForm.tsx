'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/lib/constants';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email harus diisi');
      return;
    }

    if (!email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Email tidak ditemukan');
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
            Email Terkirim
          </h2>
          <p className="text-gray-600">
            Kami telah mengirimkan link reset password ke email Anda. Silakan cek inbox atau folder spam Anda.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Link akan berlaku selama 24 jam. Jika tidak menerima email, silakan coba lagi atau hubungi support.
          </p>
        </div>

        <Link
          href="/auth/login"
          className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
          Lupa Password?
        </h2>
        <p className="text-gray-600">
          Tidak masalah! Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
        </p>
      </div>

      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
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
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? 'Mengirim...' : 'Kirim Link Reset Password'}
      </button>

      <p className="text-center text-gray-600">
        Ingat password Anda?{' '}
        <Link
          href="/auth/login"
          className="font-semibold hover:underline"
          style={{ color: COLORS.accent }}
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
