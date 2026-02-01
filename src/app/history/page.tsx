'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS } from '@/lib/constants';
import { Card } from '@/components/ui/card';

const MILESTONES = [
  {
    id: 1,
    year: 2005,
    title: 'Awal Perjalanan',
    description: 'CV. Tihani Mafaza didirikan oleh Ir. Bambang Sutrisno dengan fokus pada pengadaan barang dan jasa untuk institusi pendidikan.',
    icon: '🚀',
  },
  {
    id: 2,
    year: 2008,
    title: 'Ekspansi Pertama',
    description: 'Membuka kantor cabang di Bandung dan merekrut tim profesional untuk mengembangkan bisnis di wilayah Jawa Barat.',
    icon: '🏢',
  },
  {
    id: 3,
    year: 2012,
    title: 'Sertifikasi & Rekognisi',
    description: 'Mendapat sertifikasi ISO 9001 dan menjadi supplier resmi untuk beberapa institusi pemerintah di tingkat nasional.',
    icon: '📜',
  },
  {
    id: 4,
    year: 2016,
    title: 'Diversifikasi Produk',
    description: 'Memperluas jenis produk dari sekadar barang elektronik menjadi furniture, material bangunan, dan alat medis dengan kualitas terjamin.',
    icon: '📦',
  },
  {
    id: 5,
    year: 2019,
    title: 'Platform Digital',
    description: 'Meluncurkan platform digital untuk memudahkan klien melakukan pemesanan dan tracking barang secara real-time.',
    icon: '💻',
  },
  {
    id: 6,
    year: 2022,
    title: 'Penghargaan Terbaik',
    description: 'Meraih penghargaan "Supplier Terpercaya 2022" dari asosiasi pengadaan barang se-Indonesia dan "Customer Service Excellence".',
    icon: '🏆',
  },
  {
    id: 7,
    year: 2024,
    title: 'Transformasi Digital Penuh',
    description: 'Meluncurkan e-commerce website modern dan mobile app untuk memberikan pengalaman berbelanja yang seamless kepada semua klien.',
    icon: '🌟',
  },
];

const ACHIEVEMENTS = [
  {
    id: 1,
    metric: '100+',
    label: 'Perusahaan & Institusi Partner',
    description: 'Telah bermitra dengan lebih dari 100 perusahaan dan institusi di berbagai sektor industri',
  },
  {
    id: 2,
    metric: '15,000+',
    label: 'Transaksi Berhasil',
    description: 'Lebih dari 15,000 transaksi sukses yang menunjukkan kepercayaan klien kepada kami',
  },
  {
    id: 3,
    metric: '98%',
    label: 'Kepuasan Klien',
    description: '98% klien kami merasa puas dengan layanan dan produk yang kami berikan',
  },
  {
    id: 4,
    metric: '20+',
    label: 'Tahun Pengalaman',
    description: 'Lebih dari 20 tahun melayani dengan dedikasi penuh di industri pengadaan barang dan jasa',
  },
];

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Jejak Langkah Kami</h1>
            <p className="text-xl text-gray-200">Perjalanan panjang menciptakan kepercayaan dan kualitas yang konsisten</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sejarah dan Perkembangan</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sejak didirikan pada tahun 2005, CV. Tihani Mafaza telah konsisten memberikan layanan pengadaan barang dan jasa berkualitas tinggi. 
              Kami terus berinovasi dan berkembang untuk memenuhi kebutuhan pasar yang dinamis.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Milestone Perjalanan Kami</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" style={{ backgroundColor: COLORS.accent }}></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {MILESTONES.map((milestone, index) => (
                  <div key={milestone.id} className={`flex gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    <div className="w-1/2"></div>
                    <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white border-4 flex items-center justify-center text-2xl" style={{ borderColor: COLORS.accent }}>
                        {milestone.icon}
                      </div>
                    </div>
                    <div className="w-1/2 pb-4">
                      <Card className="p-6">
                        <div className="text-sm font-bold" style={{ color: COLORS.accent }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Pencapaian & Statistik</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ACHIEVEMENTS.map((achievement) => (
                <Card key={achievement.id} className="bg-white bg-opacity-10 border-0 text-center p-8 text-white">
                  <div className="text-4xl font-bold" style={{ color: COLORS.accent }}>
                    {achievement.metric}
                  </div>
                  <h3 className="text-lg font-bold mt-3 mb-2">{achievement.label}</h3>
                  <p className="text-gray-200 text-sm">{achievement.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Visi & Misi Kami</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span style={{ color: COLORS.accent }}>👁️</span> Visi
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi supplier barang dan jasa terdepan di Indonesia yang dipercaya oleh ribuan institusi 
                  dengan standar kualitas internasional dan layanan yang exceptional.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span style={{ color: COLORS.accent }}>🎯</span> Misi
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Menyediakan barang & jasa berkualitas dengan harga transparan</li>
                  <li>• Memberikan layanan 24/7 yang responsif dan profesional</li>
                  <li>• Membangun hubungan jangka panjang yang saling menguntungkan</li>
                  <li>• Terus berinovasi untuk memenuhi kebutuhan pasar</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
