'use client';

import { PARTNERS, COLORS } from '@/lib/constants';

export function PartnersSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Mitra & Klien Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ratusan institusi pendidikan, pemerintah, dan swasta mempercayai kami
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-2">{partner.logo}</div>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold text-center line-clamp-2">
                {partner.name}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Snippet */}
        <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-blue-50 to-orange-50 border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <p className="text-lg text-gray-700 italic mb-4">
              &quot;Kepercayaan klien adalah aset terbesar kami. Setiap transaksi adalah kesempatan
              untuk membuktikan komitmen kami terhadap keunggulan layanan.&quot;
            </p>
            <div
              className="w-1 h-1 rounded-full mb-4"
              style={{ backgroundColor: COLORS.accent }}
            />
            <p className="font-bold text-gray-900">Tim CV. Tihani Mafaza</p>
          </div>
        </div>
      </div>
    </section>
  );
}
