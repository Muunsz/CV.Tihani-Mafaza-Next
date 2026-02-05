'use client';

import { RoleLayout } from '@/components/admin/RoleLayout';
import { GuestProductBrowser } from '@/components/admin/guest/GuestProductBrowser';
import { COLORS } from '@/lib/constants';

function GuestPortalContent() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className="rounded-lg p-8 text-white"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-2">Selamat Datang!</h2>
          <p className="opacity-90 mb-4 text-lg">
            Temukan ribuan produk berkualitas dari CV. Tihani Mafaza dengan harga transparan.
          </p>
          <blockquote className="text-sm italic border-l-4 border-orange-400 pl-4">
            Motto kami: &quot;Kepuasan Anda adalah Prestasi Kami&qout;
            <br />
            &quot;A thousand miles journey begins with one small step&quot;
          </blockquote>
        </div>
      </div>

      {/* Product Browser */}
      <GuestProductBrowser />

      {/* Why Choose Us */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>
          Mengapa Memilih CV. Tihani Mafaza?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${COLORS.accent}20` }}
            >
              <span style={{ color: COLORS.accent }} className="text-2xl font-bold">
                ✓
              </span>
            </div>
            <h4 className="font-bold text-lg mb-2">Harga Transparan</h4>
            <p className="text-gray-600">
              Semua harga sudah termasuk pajak (PPN, PPh, DPP) tanpa biaya tersembunyi.
            </p>
          </div>
          <div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${COLORS.accent}20` }}
            >
              <span style={{ color: COLORS.accent }} className="text-2xl font-bold">
                ✓
              </span>
            </div>
            <h4 className="font-bold text-lg mb-2">Layanan 24 Jam</h4>
            <p className="text-gray-600">
              Tim customer service kami siap melayani Anda kapan saja, setiap hari untuk kepuasan maksimal.
            </p>
          </div>
          <div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${COLORS.accent}20` }}
            >
              <span style={{ color: COLORS.accent }} className="text-2xl font-bold">
                ✓
              </span>
            </div>
            <h4 className="font-bold text-lg mb-2">Produk Berkualitas</h4>
            <p className="text-gray-600">
              Semua produk dipilih dengan cermat dari supplier terpercaya untuk memastikan kepuasan Anda.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="rounded-lg p-8 text-white text-center"
        style={{ backgroundColor: COLORS.accent }}
      >
        <h3 className="text-2xl font-bold mb-4">Siap Memesan?</h3>
        <p className="mb-6 opacity-90">
          Hubungi tim sales kami untuk konsultasi gratis dan penawaran terbaik
        </p>
        <button className="px-8 py-3 rounded-lg bg-white text-white font-bold transition hover:shadow-lg" style={{ color: COLORS.accent }}>
          Hubungi Kami Sekarang
        </button>
      </div>
    </div>
  );
}

export default function GuestPortal() {
  return (
    <RoleLayout
      role="guest"
      title="Portal Tamu"
      subtitle="Jelajahi katalog produk kami tanpa perlu login"
    >
      <GuestPortalContent />
    </RoleLayout>
  );
}
