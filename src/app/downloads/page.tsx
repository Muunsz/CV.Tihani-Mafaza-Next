"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/constants";
import {
  FileText,
  Download,
  ArrowRight,
  Briefcase,
  ImageIcon,
  ChevronRight,
} from "lucide-react";

const downloadItems = [
  {
    id: 1,
    title: "Portofolio Perusahaan",
    description: "Lihat daftar lengkap proyek dan pengalaman kami",
    icon: Briefcase,
    href: "/downloads/portfolio",
    color: "#3b82f5",
    files: [
      { name: "Portfolio Lengkap", type: "PDF", size: "2.5 MB" },
      { name: "Galeri Proyek", type: "ZIP", size: "15 MB" },
    ],
  },
  {
    id: 2,
    title: "Profil Perusahaan",
    description: "Informasi lengkap tentang CV. Tihani Mafaza",
    icon: FileText,
    href: "/downloads/company-profile",
    color: COLORS.accent,
    files: [
      { name: "Company Profile", type: "PDF", size: "3.2 MB" },
      { name: "Daftar Produk", type: "PDF", size: "2.1 MB" },
      { name: "Tim & Struktur Organisasi", type: "PDF", size: "1.8 MB" },
      { name: "Sertifikasi & Penghargaan", type: "PDF", size: "2.6 MB" },
      { name: "Presentasi Bisnis", type: "PPT", size: "8.4 MB" },
    ],
  },
];

export default function DownloadsPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleDownload = (fileName: string, fileType: string) => {
    // Simulasi download
    alert(`Mengunduh ${fileName}.${fileType.toLowerCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pusat Unduhan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Akses dokumen, portfolio, dan informasi perusahaan kami dengan mudah
          </p>
        </div>

        {/* Download Items Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {downloadItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Header with Icon */}
                <div
                  className="p-6 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon size={40} />
                    <Download size={24} className="opacity-50" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>

                {/* Files List */}
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
                    File yang Tersedia ({item.files.length})
                  </h3>

                  <div className="space-y-3 mb-6">
                    {item.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText
                            size={20}
                            style={{ color: item.color }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.type} • {file.size}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file.name, file.type)}
                          className="p-2 rounded-lg hover:bg-white transition"
                          style={{ color: item.color }}
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* View Detailed Page Link */}
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    Lihat Halaman Lengkap
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className="rounded-lg p-12 text-white text-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h3 className="text-2xl font-bold mb-3">Tidak Menemukan File yang Anda Cari?</h3>
          <p className="mb-6 text-lg opacity-90">
            Hubungi tim kami untuk mendapatkan file atau informasi lainnya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
