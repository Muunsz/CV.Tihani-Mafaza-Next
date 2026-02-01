import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS, COMPANY, USP } from '@/lib/constants';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami - CV. Tihani Mafaza',
  description: 'Profil perusahaan CV. Tihani Mafaza - penyedia barang & jasa profesional sejak 15 tahun',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Tentang CV. Tihani Mafaza
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Dibangun atas kepercayaan dan dedikasi, kami melayani dengan sepenuh hati.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: COLORS.primary }}>
                  Profil Perusahaan
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    CV. Tihani Mafaza adalah badan hukum yang bergerak di bidang pengadaan barang
                    dan layanan profesional. Dengan pengalaman lebih dari 15 tahun melayani
                    institusi pendidikan, pemerintah, dan korporat di Bandung dan sekitarnya.
                  </p>
                  <p>
                    Kami berkomitmen untuk memberikan solusi terbaik dengan transparansi harga,
                    kualitas terjamin, dan layanan yang responsif terhadap kebutuhan klien kami.
                  </p>
                  <p>
                    Filosofi kami adalah "{COMPANY.motto}" - kami percaya bahwa perjalanan seribu
                    mil dimulai dengan satu langkah kecil, dan setiap klien adalah awal dari
                    hubungan bisnis yang panjang dan saling menguntungkan.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-12 border border-gray-200">
                <div className="text-center space-y-6">
                  <div className="text-6xl">🏢</div>
                  <div>
                    <p className="text-4xl font-bold" style={{ color: COLORS.primary }}>
                      15+
                    </p>
                    <p className="text-gray-600 mt-2">Tahun Pengalaman</p>
                  </div>
                  <div
                    className="w-12 h-1 rounded-full mx-auto"
                    style={{ backgroundColor: COLORS.accent }}
                  />
                  <p className="text-gray-700 italic">
                    "Kepuasan Anda adalah Prestasi Kami"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
                  Visi Kami
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi mitra terpercaya nomor satu dalam pengadaan barang dan jasa berkualitas
                  di wilayah Bandung, dengan layanan yang inovatif, transparan, dan selalu
                  customer-centric.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
                  Misi Kami
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.accent }} />
                    <span className="text-gray-700">
                      Menyediakan produk berkualitas dengan harga kompetitif dan transparan
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.accent }} />
                    <span className="text-gray-700">
                      Memberikan layanan excellent yang melampaui ekspektasi klien
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.accent }} />
                    <span className="text-gray-700">
                      Membangun kemitraan jangka panjang yang saling menguntungkan
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: COLORS.primary }}>
              Nilai-Nilai Inti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🤝',
                  title: 'Kepercayaan',
                  description: 'Integritas dan kejujuran dalam setiap transaksi',
                },
                {
                  icon: '⭐',
                  title: 'Kualitas',
                  description: 'Standar tinggi dalam setiap produk dan layanan',
                },
                {
                  icon: '🚀',
                  title: 'Inovasi',
                  description: 'Selalu mencari cara terbaik untuk melayani Anda',
                },
                {
                  icon: '💪',
                  title: 'Dedikasi',
                  description: '24 jam siap melayani kebutuhan Anda',
                },
              ].map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-16 text-center text-white rounded-lg mx-4 mb-20"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Siap Bekerja Sama?</h2>
            <p className="mb-8 text-lg opacity-90">
              Hubungi kami hari ini untuk mendiskusikan kebutuhan pengadaan barang Anda.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg font-bold transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              Hubungi Kami Sekarang
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
