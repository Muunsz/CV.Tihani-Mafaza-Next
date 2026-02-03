'use client';

import React from "react"

import { useState } from 'react';
import { COLORS } from '@/lib/constants';
import { Lock, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';

interface ChangePasswordFormProps {
  onSubmit?: (currentPassword: string, newPassword: string) => void;
}

export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password baru minimal 8 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password baru dan konfirmasi tidak cocok');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Password baru tidak boleh sama dengan password lama');
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(currentPassword, newPassword);
      }
      setTimeout(() => {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Password lama tidak sesuai');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
          <span className="text-xl">✓</span>
          <p className="text-sm text-green-700">Password berhasil diubah</p>
        </div>
      )}

      {/* Current Password */}
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Password Saat Ini
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label htmlFor="newPassword" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Password Baru
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter, berbeda dengan password lama</p>
      </div>

      {/* Confirm New Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Konfirmasi Password Baru
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Save size={18} />
        {isLoading ? 'Sedang menyimpan...' : 'Ubah Password'}
      </button>
    </form>
  );
}
