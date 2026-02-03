import React from "react";
import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS } from "@/lib/constants";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Tips Memilih Penyedia Barang yang Tepat untuk Institusi Anda",
    excerpt:
      "Memilih penyedia barang yang tepat adalah keputusan penting. Pelajari kriteria dan tips untuk membuat keputusan terbaik.",
    category: "Panduan",
    author: "Tim Tihani Mafaza",
    date: "20 Januari 2024",
    image: "https://via.placeholder.com/600x400?text=Panduan+Pemilihan",
    content: "Artikel lengkap tentang tips memilih penyedia barang...",
  },
  {
    id: 2,
    title: "Pentingnya Transparansi Harga dalam Transaksi B2B",
    excerpt:
      "Transparansi harga adalah kunci kepercayaan. Temukan mengapa transparansi penting dalam bisnis modern.",
    category: "Bisnis",
    author: "Tim Tihani Mafaza",
    date: "15 Januari 2024",
    image: "https://via.placeholder.com/600x400?text=Transparansi+Harga",
    content: "Artikel tentang transparansi harga dalam transaksi B2B...",
  },
  {
    id: 3,
    title: "Tren Pengadaan Barang di Era Digital 2024",
    excerpt:
      "Era digital mengubah cara institusi melakukan pengadaan barang. Pelajari tren terbaru dan bagaimana beradaptasi.",
    category: "Industri",
    author: "Tim Tihani Mafaza",
    date: "10 Januari 2024",
    image: "https://via.placeholder.com/600x400?text=Era+Digital",
    content: "Artikel tentang tren pengadaan barang di era digital...",
  },
  {
    id: 4,
    title: "Panduan Lengkap Sistem Logistik Modern",
    excerpt:
      "Sistem logistik yang efisien memastikan pengiriman tepat waktu. Pelajari komponen penting logistik modern.",
    category: "Logistik",
    author: "Tim Tihani Mafaza",
    date: "5 Januari 2024",
    image: "https://via.placeholder.com/600x400?text=Logistik",
    content: "Artikel lengkap tentang sistem logistik modern...",
  },
  {
    id: 5,
    title: "Kualitas Produk: Investasi Terbaik untuk Institusi",
    excerpt:
      "Produk berkualitas bukan hanya tentang harga, tapi nilai jangka panjang. Pahami mengapa kualitas penting.",
    category: "Kualitas",
    author: "Tim Tihani Mafaza",
    date: "1 Januari 2024",
    image: "https://via.placeholder.com/600x400?text=Kualitas+Produk",
    content: "Artikel tentang pentingnya kualitas produk untuk institusi...",
  },
  {
    id: 6,
    title: "Cara Optimasi Budget Pengadaan Barang",
    excerpt:
      "Maksimalkan anggaran pengadaan dengan strategi yang tepat. Temukan cara menghemat tanpa mengorbankan kualitas.",
    category: "Keuangan",
    author: "Tim Tihani Mafaza",
    date: "28 Desember 2023",
    image: "https://via.placeholder.com/600x400?text=Optimasi+Budget",
    content: "Artikel tentang optimasi budget pengadaan barang...",
  },
];

const categories = [
  "Semua",
  "Panduan",
  "Bisnis",
  "Industri",
  "Logistik",
  "Kualitas",
  "Keuangan",
];

export const metadata = {
  title: "Blog & Artikel - CV. Tihani Mafaza",
  description:
    "Baca artikel dan panduan tentang pengadaan barang, bisnis, dan industri",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Blog & Artikel
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Baca artikel dan panduan tentang pengadaan barang, bisnis, dan
              industri terkini.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    cat === "Semua"
                      ? "text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundColor:
                      cat === "Semua" ? COLORS.accent : undefined,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3 w-fit"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      {article.category}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blog/${article.id}`}
                      className="mt-4 text-sm font-bold flex items-center gap-2 transition group/link"
                      style={{ color: COLORS.accent }}
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Berlangganan Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Dapatkan artikel dan tips terbaru langsung ke email Anda setiap
              minggu.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={
                  { "--tw-ring-color": COLORS.accent } as React.CSSProperties
                }
              />
              <button
                className="px-6 py-3 rounded-lg text-white font-bold transition hover:shadow-lg"
                style={{ backgroundColor: COLORS.accent }}
              >
                Berlangganan
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
