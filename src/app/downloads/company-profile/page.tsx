"use client";

import {
  Download,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Award,
  TrendingUp,
  FileText,
  Building2,
  CheckCircle,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/constants";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  fileSize: string;
  downloadUrl: string;
  type: "PDF" | "DOC" | "PPT";
}

const documents: DocumentItem[] = [
  {
    id: 1,
    title: "Company Profile Lengkap",
    description:
      "Dokumentasi lengkap tentang CV. Tihani Mafaza beserta sejarah, visi, misi, dan pencapaian",
    fileSize: "3.5 MB",
    downloadUrl: "/files/company/profile-lengkap.pdf",
    type: "PDF",
  },
  {
    id: 2,
    title: "Daftar Produk & Layanan",
    description:
      "Katalog lengkap semua produk dan layanan yang kami tawarkan dengan detail spesifikasi",
    fileSize: "2.8 MB",
    downloadUrl: "/files/company/produk-layanan.pdf",
    type: "PDF",
  },
  {
    id: 3,
    title: "Pengalaman & Portofolio",
    description:
      "Daftar pengalaman kami melayani klien korporat dan instansi pemerintah",
    fileSize: "4.2 MB",
    downloadUrl: "/files/company/pengalaman-portfolio.pdf",
    type: "PDF",
  },
  {
    id: 4,
    title: "Tim & Struktur Organisasi",
    description:
      "Informasi tentang tim profesional kami dan struktur organisasi perusahaan",
    fileSize: "1.5 MB",
    downloadUrl: "/files/company/tim-organisasi.pdf",
    type: "PDF",
  },
  {
    id: 5,
    title: "Sertifikasi & Penghargaan",
    description:
      "Dokumentasi sertifikasi ISO, penghargaan, dan akreditasi yang telah diraih",
    fileSize: "2.3 MB",
    downloadUrl: "/files/company/sertifikasi.pdf",
    type: "PDF",
  },
  {
    id: 6,
    title: "Presentasi Bisnis",
    description:
      "Slide presentasi lengkap untuk rapat klien dan proposal bisnis",
    fileSize: "5.1 MB",
    downloadUrl: "/files/company/presentasi-bisnis.ppt",
    type: "PPT",
  },
];

function DocumentCard({ document }: { document: DocumentItem }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(document.downloadUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = window.document.createElement("a");
        link.href = url;
        link.download = document.downloadUrl.split("/").pop() || "document.pdf";
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Gagal mengunduh file. Silakan coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-700";
      case "DOC":
        return "bg-blue-100 text-blue-700";
      case "PPT":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: COLORS.primary + "15" }}
          >
            <FileText size={24} style={{ color: COLORS.primary }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {document.title}
            </h3>
            <p className="text-gray-600 text-sm">{document.description}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(document.type)}`}
        >
          {document.type}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500">{document.fileSize}</span>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2 rounded-lg font-semibold text-white transition hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Download size={16} />
          {isDownloading ? "Mengunduh..." : "Unduh"}
        </button>
      </div>
    </div>
  );
}

const stats = [
  { label: "Tahun Berdiri", value: "2005", icon: Calendar },
  { label: "Klien Puas", value: "500+", icon: Users },
  { label: "Proyek Selesai", value: "1000+", icon: CheckCircle },
  { label: "Penghargaan", value: "25+", icon: Award },
];

export default function CompanyProfilePage() {
  const router = useRouter();
  const [downloadAll, setDownloadAll] = useState(false);

  const handleDownloadAll = async () => {
    setDownloadAll(true);
    try {
      for (const doc of documents) {
        const response = await fetch(doc.downloadUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = window.document.createElement("a");
          link.href = url;
          link.download = doc.downloadUrl.split("/").pop() || "document.pdf";
          link.click();
          window.URL.revokeObjectURL(url);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      alert("Semua file telah diunduh!");
    } catch (error) {
      console.error("Download error:", error);
      alert("Gagal mengunduh beberapa file. Silakan coba lagi.");
    } finally {
      setDownloadAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Pusat Unduhan
          </button>

          <div className="flex items-start justify-between mb-8 flex-col md:flex-row gap-6">
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary }}
              >
                Profil Perusahaan
              </h1>
              <p className="text-gray-600 text-lg">
                CV. Tihani Mafaza - Penyedia Barang & Jasa Profesional
              </p>
            </div>
            <button
              onClick={handleDownloadAll}
              disabled={downloadAll}
              className="px-6 py-3 rounded-lg font-semibold text-white transition hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: COLORS.accent }}
            >
              <Download size={20} />
              {downloadAll ? "Mengunduh Semua..." : "Unduh Semua"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Tentang Kami</h2>
              <p className="text-gray-600 mb-4">
                CV. Tihani Mafaza adalah perusahaan terpercaya yang telah
                melayani berbagai klien korporat dan instansi pemerintah sejak
                tahun 2005. Kami menyediakan solusi terpadu untuk kebutuhan
                bisnis Anda.
              </p>
              <p className="text-gray-600 mb-6">
                Dengan pengalaman lebih dari 15 tahun, tim profesional kami siap
                memberikan layanan terbaik dan hasil yang memuaskan untuk setiap
                proyek.
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-6">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Alamat</p>
                    <p className="text-sm text-gray-700">
                      Jl. Merdeka No. 123, Jakarta Pusat 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Telepon</p>
                    <p className="text-sm text-gray-700">+62-21-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-700">
                      info@tihanimafaza.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Website</p>
                    <p className="text-sm text-gray-700">
                      www.tihanimafaza.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Pencapaian Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center border border-gray-200"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: COLORS.accent + "20" }}
                  >
                    <Icon size={24} style={{ color: COLORS.accent }} />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">
          Download Dokumentasi Perusahaan
        </h2>
        <p className="text-gray-600 mb-8">
          Semua dokumen di bawah dapat diunduh untuk keperluan bisnis Anda.
          Pilih dokumen yang Anda butuhkan atau unduh semua sekaligus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Konsultasi Bisnis",
                description:
                  "Konsultasi strategis untuk mengembangkan bisnis Anda",
                icon: Building2,
              },
              {
                title: "Solusi Teknologi",
                description: "Implementasi teknologi terkini untuk efisiensi",
                icon: TrendingUp,
              },
              {
                title: "Dukungan 24/7",
                description: "Tim support siap membantu Anda kapan saja",
                icon: Users,
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <Icon
                    size={32}
                    className="mb-4"
                    style={{ color: COLORS.primary }}
                  />
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-16" style={{ backgroundColor: COLORS.primary + "08" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mari Bekerja Sama</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk mendiskusikan bagaimana kami dapat membantu
            mencapai tujuan bisnis Anda
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
