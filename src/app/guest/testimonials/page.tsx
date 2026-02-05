"use client";

import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS, TESTIMONIALS } from "@/lib/constants";
import { Card } from "@/components/guest/ui/card";
import { Star } from "lucide-react";

const EXTENDED_TESTIMONIALS = [
  ...TESTIMONIALS,
  {
    id: 5,
    author: "Dinas Pendidikan Kota Bandung",
    role: "Kepala Bidang Sarana Prasarana",
    content:
      "Kerjasama dengan CV. Tihani Mafaza sangat memuaskan. Mereka memahami kebutuhan institusi pemerintah dan selalu memberikan solusi terbaik dengan harga yang kompetitif.",
    rating: 5,
  },
  {
    id: 6,
    author: "RS Hasan Sadikin",
    role: "Direktur Logistik",
    content:
      "Sebagai rumah sakit besar, kami membutuhkan supplier yang reliable dan responsif. Tihani Mafaza adalah pilihan terbaik kami untuk kebutuhan alat medis dan non-medis.",
    rating: 5,
  },
  {
    id: 7,
    author: "Universitas Pendidikan Indonesia",
    role: "Manajer Pengadaan",
    content:
      "Transparansi pajak mereka sangat membantu dalam proses pelaporan keuangan kami. Tim mereka profesional dan selalu siap membantu kapan pun kami butuh.",
    rating: 5,
  },
  {
    id: 8,
    author: "Kantor Cabang Perusahaan A",
    role: "Human Resources Manager",
    content:
      "Kami puas dengan layanan after-sales Tihani Mafaza. Garansi produk jelas dan mereka responsif jika ada masalah. Akan terus bermitra dengan mereka.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Testimoni Klien Kami
            </h1>
            <p className="text-xl text-gray-200">
              Kepuasan klien adalah bukti nyata dari komitmen kami terhadap
              kualitas dan layanan
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Apa Kata Klien Kami?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Lebih dari seribu institusi telah mempercayai CV. Tihani Mafaza
              sebagai supplier barang dan jasa mereka. Berikut adalah testimoni
              asli dari beberapa klien kami yang puas dengan layanan kami.
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {EXTENDED_TESTIMONIALS.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-8 hover:shadow-lg transition"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current"
                        style={{ color: COLORS.accent }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonial.author}
                    </p>
                    <p
                      className="text-gray-600"
                      style={{ color: COLORS.accent }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div
                  className="text-5xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  1000+
                </div>
                <p className="text-lg mt-2">Klien Terpuas</p>
              </div>
              <div>
                <div
                  className="text-5xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  4.9/5
                </div>
                <p className="text-lg mt-2">Rating Rata-rata</p>
              </div>
              <div>
                <div
                  className="text-5xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  98%
                </div>
                <p className="text-lg mt-2">Tingkat Kepuasan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jadilah Bagian dari Ribuan Klien Kami
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Rasakan sendiri kualitas layanan dan produk CV. Tihani Mafaza yang
              telah dipercaya oleh berbagai institusi.
            </p>
            <button
              className="px-8 py-3 rounded-lg text-white font-semibold transition hover:opacity-90"
              style={{ backgroundColor: COLORS.accent }}
            >
              Hubungi Kami Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
