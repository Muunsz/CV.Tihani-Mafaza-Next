'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
  {
    icon: '❓',
    title: 'Informasi Umum',
    questions: [
      {
        q: 'Apa itu CV. Tihani Mafaza?',
        a: 'CV. Tihani Mafaza adalah perusahaan penyedia barang dan jasa profesional yang telah berdiri sejak 2005. Kami melayani berbagai institusi termasuk sekolah, universitas, rumah sakit, dan perusahaan dengan standar kualitas tinggi dan harga yang transparan.',
      },
      {
        q: 'Berapa lama CV. Tihani Mafaza sudah beroperasi?',
        a: 'CV. Tihani Mafaza telah beroperasi selama lebih dari 20 tahun (sejak 2005) dengan pengalaman yang luas dalam industri pengadaan barang dan jasa. Kami telah bermitra dengan ribuan institusi dan memiliki track record yang sangat baik.',
      },
      {
        q: 'Di mana lokasi kantor CV. Tihani Mafaza?',
        a: 'Kantor pusat kami berada di Jl. Pendidikan No. 42, Bandung, Jawa Barat 40154. Kami juga memiliki kantor cabang di beberapa kota besar untuk melayani klien dengan lebih baik.',
      },
    ],
  },
  {
    icon: '📦',
    title: 'Produk & Layanan',
    questions: [
      {
        q: 'Produk apa saja yang tersedia di CV. Tihani Mafaza?',
        a: 'Kami menyediakan berbagai jenis produk termasuk: elektronik, buku & referensi, furniture & ATK, alat medis, kebersihan & sanitasi, material bangunan, dan berbagai jasa profesional. Katalog kami terus diperbarui sesuai kebutuhan pasar.',
      },
      {
        q: 'Apakah kami bisa memesan produk yang tidak ada di katalog?',
        a: 'Ya, tentu saja! Kami menawarkan layanan "Unlimited Request" di mana klien dapat memesan produk atau jasa yang tidak tersedia di katalog kami, sesuai dengan kebutuhan spesifik mereka. Hubungi tim kami untuk diskusi lebih lanjut.',
      },
      {
        q: 'Berapa lama waktu pengiriman barang?',
        a: 'Waktu pengiriman tergantung pada lokasi dan jenis produk. Untuk area Bandung dan sekitarnya, pengiriman biasanya dilakukan dalam 1-3 hari kerja. Untuk area lain, kami akan memberikan estimasi waktu setelah Anda melakukan pemesanan.',
      },
    ],
  },
  {
    icon: '💰',
    title: 'Pembayaran & Harga',
    questions: [
      {
        q: 'Bagaimana sistem harga CV. Tihani Mafaza?',
        a: 'Harga kami sangat transparan. Semua harga yang ditampilkan sudah termasuk PPN dan PPh, dengan rincian DPP (Dasar Pengenaan Pajak) yang jelas. Kami tidak ada biaya tersembunyi, semua sudah terlihat di awal pemesanan.',
      },
      {
        q: 'Metode pembayaran apa saja yang diterima?',
        a: 'Kami menerima berbagai metode pembayaran termasuk: transfer bank, kartu kredit, e-wallet, dan cicilan dengan berbagai syarat dan ketentuan. Klien korporat juga bisa menggunakan sistem billing atau invoice jika sudah memiliki perjanjian khusus.',
      },
      {
        q: 'Apakah ada diskon untuk pemesanan dalam jumlah besar?',
        a: 'Ya, kami memberikan diskon khusus untuk pemesanan dalam jumlah besar atau pemesanan rutin. Hubungi tim sales kami untuk mendapatkan penawaran khusus yang disesuaikan dengan kebutuhan Anda.',
      },
    ],
  },
  {
    icon: '🛠️',
    title: 'Layanan Purna Jual',
    questions: [
      {
        q: 'Apakah semua produk memiliki garansi?',
        a: 'Sebagian besar produk kami memiliki garansi resmi dari produsen (biasanya 1-2 tahun untuk elektronik). Untuk produk yang tidak memiliki garansi resmi, kami menjamin kualitas dan siap membantu jika ada masalah dalam penggunaan.',
      },
      {
        q: 'Bagaimana jika ada barang yang rusak saat pengiriman?',
        a: 'Jika ada barang yang rusak saat pengiriman, segera hubungi kami dengan foto bukti kerusakan. Kami akan melakukan inspeksi dan mengganti barang yang rusak tanpa biaya tambahan sesuai dengan perjanjian pengiriman.',
      },
      {
        q: 'Apakah ada layanan after-sales service?',
        a: 'Ya, kami menyediakan layanan after-sales service yang responsif. Tim customer service kami siap melayani keluhan atau pertanyaan Anda 24/7. Kami juga menyediakan layanan maintenance dan perbaikan untuk produk-produk tertentu.',
      },
    ],
  },
  {
    icon: '👤',
    title: 'Akun & Pemesanan',
    questions: [
      {
        q: 'Apakah harus membuat akun untuk melakukan pemesanan?',
        a: 'Ya, untuk memberikan pengalaman terbaik dan tracking pemesanan yang lebih baik, Anda perlu membuat akun terlebih dahulu. Proses pendaftaran sangat mudah dan tidak memerlukan biaya apapun.',
      },
      {
        q: 'Bagaimana cara melacak status pemesanan saya?',
        a: 'Setelah melakukan pemesanan, Anda dapat melacak status melalui dashboard akun Anda. Kami akan mengirimkan notifikasi email dan SMS untuk setiap update status pesanan Anda, mulai dari konfirmasi, pengiriman, hingga barang sampai.',
      },
      {
        q: 'Bisakah saya membatalkan atau mengubah pesanan setelah dikirim?',
        a: 'Pembatalan atau pengubahan pesanan dapat dilakukan sebelum barang dikirim dengan biaya administratif yang minimal. Setelah barang dikirim, Anda masih bisa melakukan pengembalian dengan syarat dan ketentuan yang berlaku.',
      },
    ],
  },
  {
    icon: '📞',
    title: 'Kontak & Support',
    questions: [
      {
        q: 'Jam berapa customer service CV. Tihani Mafaza melayani?',
        a: 'Tim customer service kami melayani 24/7, tanpa henti. Kami dapat dihubungi melalui WhatsApp, telepon, email, atau live chat di website kami. Kami berkomitmen untuk merespon setiap pertanyaan dalam waktu kurang dari 1 jam.',
      },
      {
        q: 'Bagaimana cara menghubungi CV. Tihani Mafaza?',
        a: 'Anda dapat menghubungi kami melalui: WhatsApp (+62-812-345-6789), Telepon (+62-274-123-456), Email (info@tihanimafaza.com), atau langsung ke kantor kami di Jl. Pendidikan No. 42, Bandung.',
      },
    ],
  },
];

export function FAQPageClient() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeCategory = faqCategories[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h1>
            <p className="text-xl text-gray-200">Temukan jawaban untuk pertanyaan umum Anda di sini</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-4 sticky top-20">
                  <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {faqCategories.map((category, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCategory(idx)}
                        className={`w-full text-left px-4 py-2 rounded-md transition flex items-center gap-2 ${
                          selectedCategory === idx
                            ? 'text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: selectedCategory === idx ? COLORS.accent : 'transparent',
                        }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium">{category.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="lg:col-span-3">
                {activeCategory && (
                  <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                      <span className="text-4xl">{activeCategory.icon}</span>
                      {activeCategory.title}
                    </h2>
                    <div>
                      {activeCategory.questions.map((item, qIdx) => {
                        const itemId = `${selectedCategory}-${qIdx}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <div
                            key={itemId}
                            className="border-b border-gray-200 py-4"
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full flex items-start justify-between text-left hover:opacity-70 transition"
                            >
                              <span className="text-lg font-semibold text-gray-900 pr-4">{item.q}</span>
                              <ChevronDown
                                className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1 transition"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                              />
                            </button>
                            {isOpen && (
                              <p className="text-gray-600 mt-4 leading-relaxed">{item.a}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Masih Ada Pertanyaan?</h2>
            <p className="text-lg text-gray-200 mb-8">
              Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami kapan saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/62812345678"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg font-semibold transition hover:opacity-90"
                style={{ backgroundColor: COLORS.accent }}
              >
                Chat WhatsApp
              </a>
              <a
                href="tel:+6274123456"
                className="px-8 py-3 rounded-lg border-2 text-white font-semibold transition hover:bg-white hover:text-gray-900"
                style={{ borderColor: 'white' }}
              >
                Telepon Kami
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
