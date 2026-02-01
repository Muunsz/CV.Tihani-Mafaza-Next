'use client';

import { useRef } from "react"

import React from "react"

import { useState } from 'react';
import { SvgCaptcha } from '@/components/auth/SvgCaptcha';
import { COLORS } from '@/lib/constants';
import { Send, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA

const RECAPTCHA_SITE_KEY = 'your_recaptcha_site_key'; // Declare RECAPTCHA_SITE_KEY

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const recaptchaRef = useRef<any>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaVerified) {
      setError('Verifikasi CAPTCHA terlebih dahulu');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setIsLoading(false);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setCaptchaVerified(false);
      setCaptchaInput('');
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      {submitted ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">Pesan Berhasil Dikirim!</p>
          <p className="text-gray-600">
            Terima kasih atas pesan Anda. Tim kami akan merespon dalam waktu 24 jam.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Row 2: Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nomor Telepon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                placeholder="+62-812-XXXX-XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Subjek *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
              >
                <option value="">-- Pilih Subjek --</option>
                <option value="inquiry">Inquiry Produk</option>
                <option value="quotation">Permohonan Quotation</option>
                <option value="complaint">Keluhan Layanan</option>
                <option value="feedback">Feedback & Saran</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Row 3: Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Pesan *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
              placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
            />
          </div>

          {/* SVG CAPTCHA */}
          <SvgCaptcha
            onVerified={setCaptchaVerified}
            onInputChange={setCaptchaInput}
            inputValue={captchaInput}
          />

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.accent }}
            >
              <Send className="w-5 h-5" />
              <span>{isLoading ? 'Mengirim...' : 'Kirim Pesan'}</span>
            </button>
            <button
              type="reset"
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-bold transition hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Bidang wajib diisi. Kami akan merespon dalam waktu 24 jam kerja.
          </p>
        </form>
      )}
    </div>
  );
}
