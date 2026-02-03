'use client';

import { USP, COLORS } from '@/lib/constants';

export function USPSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Keunggulan Utama Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tiga pilar utama yang membedakan CV. Tihani Mafaza dari kompetitor lainnya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USP.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.primary }}>
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
