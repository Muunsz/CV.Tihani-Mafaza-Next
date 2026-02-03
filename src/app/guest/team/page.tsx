"use client";

import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS } from "@/lib/constants";
import { Card } from "@/components/guest/ui/card";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ir. Bambang Sutrisno",
    position: "Direktur Utama",
    department: "Manajemen",
    bio: "Memiliki pengalaman lebih dari 20 tahun di industri pengadaan barang dan jasa. Visioner dalam mengembangkan CV. Tihani Mafaza menjadi supplier terpercaya di Indonesia.",
    image: "https://via.placeholder.com/300x300?text=Direktur",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    position: "Kepala Operasional",
    department: "Operasional",
    bio: "Bertanggung jawab atas kelancaran operasional perusahaan. Ahli dalam manajemen logistik dan distribusi barang dengan rekam jejak sempurna.",
    image: "https://via.placeholder.com/300x300?text=Operasional",
  },
  {
    id: 3,
    name: "Drs. Hendra Wijaya",
    position: "Kepala Tim Penjualan",
    department: "Penjualan",
    bio: "Expert dalam membangun hubungan dengan klien korporat dan institusi pendidikan. Telah membuka lebih dari 100 account baru dalam 5 tahun terakhir.",
    image: "https://via.placeholder.com/300x300?text=Penjualan",
  },
  {
    id: 4,
    name: "Linda Santoso",
    position: "Kepala Tim Customer Service",
    department: "Customer Service",
    bio: "Memastikan setiap klien mendapatkan layanan terbaik 24/7. Responsif, profesional, dan selalu siap membantu kebutuhan klien kami.",
    image: "https://via.placeholder.com/300x300?text=Customer+Service",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    position: "Kepala Tim Logistik",
    department: "Logistik",
    bio: "Mengelola pengiriman dan distribusi barang ke seluruh wilayah. Berpengalaman dalam menangani proyek-proyek besar dengan ketepatan waktu 100%.",
    image: "https://via.placeholder.com/300x300?text=Logistik",
  },
  {
    id: 6,
    name: "Rina Wijayanto",
    position: "Kepala Tim Keuangan",
    department: "Keuangan",
    bio: "Mengelola keuangan perusahaan dengan transparan dan akuntabel. Memastikan setiap transaksi tercatat dengan baik dan laporan keuangan selalu tepat waktu.",
    image: "https://via.placeholder.com/300x300?text=Keuangan",
  },
];

export default function TeamPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tim Kami</h1>
            <p className="text-xl text-gray-200">
              Profesional berpengalaman yang siap melayani Anda dengan sepenuh
              hati
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Keluarga Besar Tihani Mafaza
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kami terdiri dari profesional muda yang berdedikasi tinggi dengan
              pengalaman bertahun-tahun di bidangnya masing-masing. Setiap
              anggota tim kami membawa passion dan komitmen yang sama:
              memberikan yang terbaik untuk kepuasan klien kami.
            </p>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 bg-gray-300 overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p
                      className="font-semibold mb-2"
                      style={{ color: COLORS.accent }}
                    >
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {member.department}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Nilai-Nilai Inti Tim Kami
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🤝</span> Integritas
                </h3>
                <p className="text-gray-200">
                  Kami berkomitmen untuk selalu jujur dan transparan dalam
                  setiap transaksi bisnis dengan klien kami.
                </p>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Profesionalisme
                </h3>
                <p className="text-gray-200">
                  Setiap anggota tim kami mengedepankan profesionalisme tinggi
                  dalam menjalankan tugas mereka.
                </p>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Inovasi
                </h3>
                <p className="text-gray-200">
                  Kami terus berinovasi untuk memberikan solusi terbaik dan
                  terdepan dalam industri.
                </p>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">❤️</span> Dedikasi
                </h3>
                <p className="text-gray-200">
                  Kepuasan klien adalah prioritas utama kami, dan kami
                  berkomitmen melayani 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
