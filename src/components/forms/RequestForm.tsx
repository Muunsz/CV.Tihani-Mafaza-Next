'use client';

import { useRef } from "react"
import React from "react"
import { useState } from 'react';
import { SvgCaptcha } from '@/components/auth/SvgCaptcha';
import { COLORS } from '@/lib/constants';
import { Send, Upload, AlertCircle } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY"; // Declare RECAPTCHA_SITE_KEY here

export function RequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    institution: '',
    itemName: '',
    specification: '',
    quantity: '',
    targetPrice: '',
    notes: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name.trim() || !formData.phone.trim() || !formData.institution.trim() ||
        !formData.itemName.trim() || !formData.specification.trim() || !formData.quantity.trim()) {
      setError('Semua field yang ditandai dengan * harus diisi');
      return;
    }

    if (!captchaVerified) {
      setError('Verifikasi CAPTCHA terlebih dahulu');
      return;
    }

    // TODO: Integrate with backend
    console.log('Form submitted:', { ...formData, file });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        institution: '',
        itemName: '',
        specification: '',
        quantity: '',
        targetPrice: '',
        notes: '',
      });
      setFile(null);
      setCaptchaVerified(false);
      setCaptchaInput('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Request Barang Custom
          </h2>
          <p className="text-gray-600 text-lg">
            Tidak menemukan barang yang Anda cari? Hubungi kami untuk pengadaan barang sesuai
            kebutuhan spesifik Anda.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Request Berhasil Dikirim!</p>
              <p className="text-gray-600">
                Tim kami akan menghubungi Anda dalam waktu 24 jam untuk konfirmasi.
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

              {/* Row 1: Name & Phone */}
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
              </div>

              {/* Row 2: Institution */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Institusi / Perusahaan *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                  placeholder="Nama Sekolah / Perusahaan"
                />
              </div>

              {/* Row 3: Item Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nama Barang *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                    placeholder="Contoh: Laptop gaming"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Jumlah *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                    placeholder="10"
                    min="1"
                  />
                </div>
              </div>

              {/* Row 4: Specifications */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Spesifikasi Detail *
                </label>
                <textarea
                  name="specification"
                  value={formData.specification}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                  placeholder="Jelaskan spesifikasi detail yang dibutuhkan..."
                />
              </div>

              {/* Row 5: Target Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Target Harga (jika ada)
                </label>
                <input
                  type="number"
                  name="targetPrice"
                  value={formData.targetPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                  placeholder="1000000"
                  min="0"
                />
              </div>

              {/* Row 6: File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Foto / Spesifikasi (Optional)
                </label>
                <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : 'Klik untuk upload atau drag file'}
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Row 7: Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Catatan Tambahan
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': COLORS.accent } as React.CSSProperties}
                  placeholder="Informasi tambahan atau permintaan khusus..."
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
                  className="flex-1 px-6 py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <Send className="w-5 h-5" />
                  Kirim Request
                </button>
                <button
                  type="reset"
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-bold transition hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                * Bidang wajib diisi. Kami akan menghubungi Anda secepatnya.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
