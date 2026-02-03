import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS, COMPANY } from "@/lib/constants";
import { MapPin, Briefcase, DollarSign, Clock, ArrowRight } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Sales Executive",
    department: "Penjualan",
    location: "Bandung",
    type: "Full-time",
    salary: "Kompetitif",
    description:
      "Kami mencari profesional sales yang bersemangat untuk mengembangkan bisnis kami.",
    requirements: [
      "3+ tahun pengalaman sales",
      "Memiliki jaringan luas",
      "Target oriented",
      "Komunikasi baik",
    ],
  },
  {
    id: 2,
    title: "Customer Service Representative",
    department: "Customer Service",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 3-4 juta",
    description:
      "Bergabunglah dengan tim customer service kami yang berkomitmen pada excellence.",
    requirements: [
      "Minimal D3 atau S1",
      "Pengalaman customer service",
      "Ramah dan profesional",
      "Bahasa Inggris",
    ],
  },
  {
    id: 3,
    title: "Logistik Coordinator",
    department: "Logistik",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 4-5 juta",
    description:
      "Kami butuh talent untuk mengelola logistik dan pengiriman barang dengan efisien.",
    requirements: [
      "2+ tahun di bidang logistik",
      "Organized dan detail",
      "Komunikasi baik",
      "MS Office",
    ],
  },
  {
    id: 4,
    title: "Warehouse Staff",
    department: "Gudang",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 2.5-3.5 juta",
    description:
      "Bergabung sebagai bagian dari tim warehouse kami yang dinamis.",
    requirements: [
      "Minimal SMA/SMK",
      "Sehat dan kuat",
      "Teliti",
      "Berpengalaman diutamakan",
    ],
  },
  {
    id: 5,
    title: "Accounting Staff",
    department: "Keuangan",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 4-5 juta",
    description:
      "Cari akuntan untuk mengelola pembukuan dan laporan keuangan perusahaan.",
    requirements: [
      "D3/S1 Akuntansi",
      "Pengalaman minimal 2 tahun",
      "Mengerti pajak",
      "Detail oriented",
    ],
  },
  {
    id: 6,
    title: "Marketing & Digital Specialist",
    department: "Marketing",
    location: "Bandung",
    type: "Full-time",
    salary: "Rp 5-6 juta",
    description:
      "Kami mencari specialist untuk mengembangkan strategi marketing digital kami.",
    requirements: [
      "2+ tahun di digital marketing",
      "Menguasai social media",
      "Analitik & SEO",
      "Kreatif",
    ],
  },
];

export const metadata = {
  title: "Karir - Bergabunglah dengan CV. Tihani Mafaza",
  description:
    "Lihat lowongan kerja dan bergabunglah dengan tim profesional kami",
};

export default function CareersPage() {
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
              Karir Bersama Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Kami percaya bahwa talenta terbaik adalah aset terbesar
              perusahaan. Jika Anda mencari peluang karir yang menantang,
              bergabunglah dengan tim {COMPANY.name}.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: COLORS.primary }}
              >
                Budaya Kerja Kami
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Di CV. Tihani Mafaza, kami membangun lingkungan kerja yang
                mendukung pertumbuhan dan inovasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤝",
                  title: "Kolaborasi",
                  description:
                    "Kami bekerja sebagai satu tim menuju tujuan bersama.",
                },
                {
                  icon: "🚀",
                  title: "Inovasi",
                  description:
                    "Kami mendorong ide-ide segar dan cara kerja yang lebih baik.",
                },
                {
                  icon: "📈",
                  title: "Pertumbuhan",
                  description:
                    "Kami berinvestasi dalam pengembangan karir Anda.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 rounded-lg bg-white border border-gray-200"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-4xl font-bold mb-12"
              style={{ color: COLORS.primary }}
            >
              Lowongan Kerja Terbuka
            </h2>

            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-8 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {job.department}
                      </p>
                    </div>
                    <button
                      className="px-6 py-2 rounded-lg text-white font-bold text-sm transition hover:shadow-lg whitespace-nowrap flex items-center gap-2"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      Lamar Sekarang
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin
                        className="w-5 h-5"
                        style={{ color: COLORS.accent }}
                      />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase
                        className="w-5 h-5"
                        style={{ color: COLORS.accent }}
                      />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign
                        className="w-5 h-5"
                        style={{ color: COLORS.accent }}
                      />
                      {job.salary}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-3">
                      Persyaratan:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-600 text-sm"
                        >
                          <span className="text-orange-500 font-bold mt-1">
                            ✓
                          </span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: COLORS.primary }}
            >
              Proses Aplikasi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Submit CV",
                  description: "Kirimkan CV dan surat lamaran",
                },
                {
                  step: "2",
                  title: "Review",
                  description: "Tim kami meninjau aplikasi Anda",
                },
                {
                  step: "3",
                  title: "Interview",
                  description: "Wawancara dengan tim management",
                },
                {
                  step: "4",
                  title: "Offer",
                  description: "Terima penawaran dan mulai bekerja",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16 text-white text-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Tidak Menemukan Posisi yang Cocok?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Kirimkan CV dan profil Anda untuk kami pertimbangkan untuk posisi
              di masa depan.
            </p>
            <button
              className="px-8 py-3 rounded-lg font-bold transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              Kirim CV Anda
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
