'use client';

import { useRef } from "react"
import React from "react"
import { useState } from 'react';
import Link from 'next/link';
import { SvgCaptcha } from './SvgCaptcha';
import { COLORS } from '@/lib/constants';
import { User, Mail, Lock, Phone, Building2, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA

const RECAPTCHA_SITE_KEY = 'your_recaptcha_site_key_here'; // Declare RECAPTCHA_SITE_KEY

interface RegisterFormProps {
  onSubmit?: (data: any) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const recaptchaRef = useRef<any>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Nama lengkap harus diisi');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Format email tidak valid');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Nomor telepon harus diisi');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi tidak cocok');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('Anda harus setuju dengan syarat dan ketentuan');
      return false;
    }
    if (!captchaVerified) {
      setError('Verifikasi CAPTCHA terlebih dahulu');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }

      setTimeout(() => {
        setIsLoading(false);
        setCaptchaVerified(false);
        setCaptchaInput('');
      }, 1000);
    } catch (err) {
      setError('Terjadi kesalahan saat pendaftaran');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
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
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Nama Perusahaan
        </label>
        <div className="relative">
          <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="PT Contoh Jaya"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
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
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
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
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
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
        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
          Konfirmasi Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
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
        <label htmlFor="terms" className="ml-2 text-sm text-gray-700 cursor-pointer">
          Saya setuju dengan{' '}
          <Link href="/terms" className="hover:underline font-semibold" style={{ color: COLORS.accent }}>
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
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-white font-semibold transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.accent }}
      >
        {isLoading ? 'Sedang mendaftar...' : 'Daftar'}
      </button>

      {/* Login Link */}
      <p className="text-center text-gray-600">
        Sudah punya akun?{' '}
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
