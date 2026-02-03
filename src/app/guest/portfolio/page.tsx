import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS, PARTNERS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Pengadaan Laptop untuk SMK Telkom Bandung",
    description: "100 unit laptop untuk kebutuhan pembelajaran digital siswa.",
    category: "Elektronik",
    year: "2024",
    image: "https://via.placeholder.com/400x300?text=SMK+Telkom",
  },
  {
    id: 2,
    title: "Renovasi Perpustakaan SMK Bina Insani Ibun",
    description: "Suplai furniture dan peralatan perpustakaan modern.",
    category: "Furniture",
    year: "2024",
    image: "https://via.placeholder.com/400x300?text=Perpustakaan",
  },
  {
    id: 3,
    title: "Sistem Keamanan SD Sedunia",
    description: "Instalasi sistem CCTV dan akses kontrol terpadu.",
    category: "Elektronik",
    year: "2023",
    image: "https://via.placeholder.com/400x300?text=Sistem+CCTV",
  },
  {
    id: 4,
    title: "Perlengkapan Laboratorium Kimia Pemerintah",
    description:
      "Penyediaan lengkap alat dan bahan laboratorium standar internasional.",
    category: "Medis & Laboratorium",
    year: "2023",
    image: "https://via.placeholder.com/400x300?text=Laboratorium",
  },
  {
    id: 5,
    title: "Peralatan Kantor PT. Maju Jaya Investama",
    description: "Furniture dan peralatan kantor untuk 200+ karyawan.",
    category: "Furniture & ATK",
    year: "2023",
    image: "https://via.placeholder.com/400x300?text=Kantor",
  },
  {
    id: 6,
    title: "Material Bangunan Pemerintah Kota Bandung",
    description:
      "Suplai material berkualitas untuk proyek infrastruktur publik.",
    category: "Material Bangunan",
    year: "2022",
    image: "https://via.placeholder.com/400x300?text=Konstruksi",
  },
];

export const metadata = {
  title: "Portfolio & Galeri Proyek - CV. Tihani Mafaza",
  description:
    "Lihat koleksi proyek-proyek sukses yang telah kami kerjakan untuk berbagai klien",
};

export default function PortfolioPage() {
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
              Portfolio & Galeri Proyek
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Kami bangga dengan setiap proyek yang telah kami tangani. Berikut
              adalah beberapa proyek terkemuka yang menunjukkan dedikasi kami
              terhadap keunggulan.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: COLORS.accent }}
                      >
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="py-16 text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">50+</p>
                <p className="text-lg opacity-90">Proyek Selesai</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">100+</p>
                <p className="text-lg opacity-90">Klien Puas</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">99%</p>
                <p className="text-lg opacity-90">Tingkat Kepuasan</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">15+</p>
                <p className="text-lg opacity-90">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Ingin Memulai Proyek Bersama Kami?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Hubungi tim kami untuk mendiskusikan kebutuhan spesifik proyek
              Anda.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-lg text-white font-bold transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              Hubungi Tim Kami
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
