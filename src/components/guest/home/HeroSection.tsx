'use client';

import { COMPANY, COLORS } from '@/lib/constants';
import { ArrowRight, ShoppingCart, FileText } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                <span style={{ color: COLORS.primary }}>Kepuasan Anda</span>
                <br />
                <span style={{ color: COLORS.primary }}>adalah Prestasi Kami</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Penyedia barang & jasa profesional dengan harga transparan, layanan 24 jam, dan
                pengalaman lebih dari 15 tahun melayani institusi di Bandung.
              </p>
            </div>

            {/* Philosophy */}
            <div
              className="p-4 rounded-lg border-l-4 italic text-gray-700"
              style={{ borderColor: COLORS.accent }}
            >
              "{COMPANY.motto}"
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="px-8 py-4 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: COLORS.accent }}
              >
                <ShoppingCart className="w-5 h-5" />
                Beli Sekarang
              </button>
              <button
                className="px-8 py-4 rounded-lg border-2 font-bold text-lg flex items-center justify-center gap-2 transition hover:shadow-lg hover:-translate-y-1"
                style={{
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                }}
              >
                <FileText className="w-5 h-5" />
                Request Barang
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>Terpercaya 15+ Tahun</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span>100+ Klien Aktif</span>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative h-96 hidden lg:block">
            <div
              className="absolute inset-0 rounded-2xl opacity-10"
              style={{ backgroundColor: COLORS.accent }}
            />
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">📦</div>
                <p className="text-gray-400 font-semibold">Pengadaan Profesional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
    </section>
  );
}
