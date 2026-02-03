import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS } from "@/lib/constants";
import {
  Clock2 as Clock24,
  Truck,
  Star,
  Headphones,
  Shield,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Layanan Unggulan - CV. Tihani Mafaza",
  description:
    "Jelajahi layanan terpadu yang dirancang untuk memenuhi kebutuhan pengadaan barang dan jasa Anda",
};

const services = [
  {
    icon: Clock24,
    title: "Layanan 24 Jam",
    description:
      "Tim customer service kami siap melayani Anda kapan saja, tanpa henti untuk memastikan kepuasan Anda.",
    features: [
      "Customer Service Responsif",
      "Support Live Chat",
      "Konsultasi Gratis",
      "Response Time < 1 Jam",
    ],
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat & Aman",
    description:
      "Kami menjamin pengiriman ke seluruh Indonesia dengan sistem tracking real-time dan asuransi penuh.",
    features: [
      "Ke Seluruh Indonesia",
      "Tracking Real-Time",
      "Asuransi Pengiriman",
      "Packaging Premium",
    ],
  },
  {
    icon: Star,
    title: "Harga Transparan",
    description:
      "Semua harga sudah termasuk pajak (PPN, PPh, DPP) tanpa biaya tersembunyi. Anda tahu persis apa yang dibayar.",
    features: [
      "All-in Pricing",
      "Tanpa Biaya Tersembunyi",
      "Diskon Volume",
      "Harga Kompetitif",
    ],
  },
  {
    icon: Headphones,
    title: "Konsultasi Profesional",
    description:
      "Dapatkan konsultasi gratis dari tim ahli kami untuk memilih produk yang tepat sesuai kebutuhan Anda.",
    features: [
      "Expert Team",
      "Konsultasi Gratis",
      "Rekomendasi Produk",
      "Solusi Customized",
    ],
  },
  {
    icon: Shield,
    title: "Jaminan Kualitas",
    description:
      "Semua produk telah melewati quality control ketat dan dilengkapi dengan garansi resmi.",
    features: [
      "Quality Control Ketat",
      "Garansi Resmi",
      "Return Policy Jelas",
      "Sertifikat Authentic",
    ],
  },
  {
    icon: Zap,
    title: "Proses Cepat & Efisien",
    description:
      "Dari pemesanan hingga pengiriman, semua diproses dengan cepat tanpa birokrasi yang rumit.",
    features: [
      "Proses Instan",
      "Minimal Documentation",
      "Fast Approval",
      "Flexible Terms",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Layanan Unggulan Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Kami menyediakan layanan terpadu yang dirancang khusus untuk
              memenuhi kebutuhan pengadaan barang dan jasa Anda dengan standar
              profesional.
            </p>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote
              className="text-2xl italic font-semibold mb-4"
              style={{ color: COLORS.primary }}
            >
              "Kepuasan Anda adalah Prestasi Kami"
            </blockquote>
            <p className="text-gray-600 text-lg mb-6">
              Motto ini menjadi komitmen utama kami dalam setiap interaksi
              dengan pelanggan.
            </p>
            <p className="text-gray-600 text-lg italic">
              "A thousand miles journey begins with one small step" - Mari
              bersama membangun kepercayaan dan kemitraan jangka panjang.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-xl transition"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${COLORS.accent}20` }}
                    >
                      <Icon size={28} style={{ color: COLORS.accent }} />
                    </div>

                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: COLORS.primary }}
                    >
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="space-y-2 border-t pt-6">
                      {service.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${COLORS.accent}20` }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS.accent }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-4xl font-bold text-center mb-12"
              style={{ color: COLORS.primary }}
            >
              Mengapa Memilih CV. Tihani Mafaza?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${COLORS.accent}20` }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: COLORS.primary }}
                  >
                    Pengalaman 15+ Tahun
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Dipercaya oleh ribuan institusi dan perusahaan di seluruh
                    Indonesia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${COLORS.accent}20` }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: COLORS.primary }}
                  >
                    Ribuan Produk Pilihan
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Katalog lengkap dari berbagai kategori untuk memenuhi semua
                    kebutuhan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${COLORS.accent}20` }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: COLORS.primary }}
                  >
                    Harga Kompetitif
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Tawarkan harga terbaik dengan kualitas terjamin dan
                    transparan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${COLORS.accent}20` }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: COLORS.primary }}
                  >
                    Jangkauan Nasional
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Melayani pengiriman ke seluruh Indonesia dengan sistem
                    tracking real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: `${COLORS.primary}10` }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Siap Mulai Perjalanan Anda?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Hubungi kami hari ini untuk mendapatkan penawaran khusus dan
              konsultasi gratis.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                className="px-8 py-4 rounded-lg text-white font-bold transition hover:shadow-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                Hubungi Kami
              </button>
              <button
                className="px-8 py-4 rounded-lg font-bold transition hover:bg-white"
                style={{
                  backgroundColor: COLORS.accent,
                  color: "white",
                  borderColor: COLORS.accent,
                }}
              >
                Lihat Katalog Lengkap
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
