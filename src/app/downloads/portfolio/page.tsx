"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/constants";
import {
  Download,
  ArrowLeft,
  FileText,
  Calendar,
  User,
  ChevronRight,
  Briefcase,
} from "lucide-react";

const portfolioProjects = [
  {
    id: 1,
    title: "Sistem Manajemen Inventori",
    description: "Platform lengkap untuk mengelola stok barang dan pemesanan dengan dashboard real-time",
    category: "Web Application",
    date: "2024-01-15",
    client: "PT Maju Jaya",
    image: "🏢",
    highlights: ["Dashboard Real-time", "Laporan Otomatis", "Integrasi Pembayaran"],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Marketplace modern dengan fitur lengkap untuk penjualan online multi-vendor",
    category: "Web Application",
    date: "2023-12-20",
    client: "Kober Mawar",
    image: "🛍️",
    highlights: ["Multi-Vendor", "Payment Gateway", "Mobile Responsive"],
  },
  {
    id: 3,
    title: "Mobile App Pemesanan",
    description: "Aplikasi mobile untuk memudahkan pelanggan melakukan pemesanan dengan tracking real-time",
    category: "Mobile App",
    date: "2023-11-10",
    client: "Lazada Seller",
    image: "📱",
    highlights: ["Push Notification", "Tracking Pesanan", "User Friendly"],
  },
  {
    id: 4,
    title: "Website Company Profile",
    description: "Website profesional untuk showcase produk dan layanan perusahaan dengan SEO optimal",
    category: "Website",
    date: "2023-10-05",
    client: "CV. Tihani Mafaza",
    image: "🌐",
    highlights: ["SEO Optimized", "Responsive Design", "Contact Form"],
  },
];

const files = [
  { name: "Portofolio Lengkap 2024", type: "PDF", size: "2.5 MB" },
  { name: "Galeri Proyek", type: "ZIP", size: "15 MB" },
  { name: "Case Studies", type: "PDF", size: "3.2 MB" },
  { name: "Client Testimonials", type: "PDF", size: "1.8 MB" },
];

export default function PortfolioPage() {
  const router = useRouter();

  const handleDownload = (fileName: string, fileType: string) => {
    alert(`Mengunduh ${fileName}.${fileType.toLowerCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Kembali ke Pusat Unduhan
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portofolio Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Lihat kumpulan proyek-proyek terbaik kami yang telah membantu berbagai klien
            mencapai kesuksesan bisnis mereka
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {/* Image/Icon */}
              <div
                className="h-40 flex items-center justify-center text-6xl"
                style={{ backgroundColor: `${COLORS.accent}15` }}
              >
                {project.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs font-semibold text-white"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            File Portofolio Tersedia
          </h2>

          <div className="space-y-3 mb-8">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <FileText size={20} style={{ color: COLORS.accent }} />
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
                  style={{ color: COLORS.accent }}
                >
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="p-4 rounded-lg text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            <p className="text-sm">
              Semua file portofolio telah dikurasi dan dipersiapkan untuk memberikan
              gambaran lengkap tentang kemampuan dan pengalaman kami
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tertarik Berkolaborasi?
          </h3>
          <p className="text-gray-600 mb-6">
            Hubungi kami untuk membahas proyek Anda berikutnya
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
          >
            Hubungi Kami Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
