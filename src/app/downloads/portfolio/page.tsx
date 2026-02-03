"use client";

import { Download, Eye, FileText, Image as ImageIcon, Briefcase, Star, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/constants";

interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  downloadUrl: string;
  fileSize: string;
  views: number;
  rating: number;
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Sistem ERP Terintegrasi",
    category: "Software Development",
    description: "Sistem manajemen perusahaan yang komprehensif dengan modul inventory, accounting, dan HR management.",
    imageUrl: "/images/portfolio-1.jpg",
    downloadUrl: "/files/portfolio/erp-system.pdf",
    fileSize: "2.5 MB",
    views: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Website E-Commerce Custom",
    category: "Web Development",
    description: "Platform e-commerce responsif dengan payment gateway integration dan admin dashboard lengkap.",
    imageUrl: "/images/portfolio-2.jpg",
    downloadUrl: "/files/portfolio/ecommerce-case.pdf",
    fileSize: "1.8 MB",
    views: 890,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Mobile App Inventory",
    category: "Mobile Development",
    description: "Aplikasi mobile untuk manajemen inventory real-time dengan sinkronisasi database cloud.",
    imageUrl: "/images/portfolio-3.jpg",
    downloadUrl: "/files/portfolio/mobile-app.pdf",
    fileSize: "3.2 MB",
    views: 650,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Sistem Manajemen Proyek",
    category: "Project Management",
    description: "Platform kolaborasi untuk tim dengan fitur timeline, task management, dan reporting analytics.",
    imageUrl: "/images/portfolio-4.jpg",
    downloadUrl: "/files/portfolio/project-mgmt.pdf",
    fileSize: "2.1 MB",
    views: 1100,
    rating: 4.6,
  },
];

function PortfolioCard({ project }: { project: PortfolioProject }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(project.downloadUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = project.downloadUrl.split("/").pop() || "portfolio.pdf";
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition group">
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon size={64} className="text-gray-400" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="opacity-0 group-hover:opacity-100 transition bg-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:shadow-lg disabled:opacity-50"
          >
            <Download size={16} />
            {isDownloading ? "Mengunduh..." : "Unduh"}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: COLORS.accent }}
          >
            {project.category}
          </span>
          <span className="text-xs text-gray-500">{project.fileSize}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between py-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            {project.views} views
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            {project.rating}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-2 rounded-lg font-semibold text-white transition hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Download size={16} />
            {isDownloading ? "Mengunduh..." : "Unduh"}
          </button>
          <button className="flex-1 py-2 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition">
            <Eye size={16} className="inline mr-1" />
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(portfolioProjects.map((p) => p.category)),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.primary }}>
            Portfolio
          </h1>
          <p className="text-gray-600 text-lg">
            Lihat proyek-proyek kami dan unduh dokumentasi lengkap
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category ? COLORS.accent : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Briefcase size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">
              Tidak ada proyek dalam kategori ini
            </p>
          </div>
        )}
      </div>

      <div
        className="py-16"
        style={{ backgroundColor: COLORS.primary + "08" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tertarik dengan Portfolio Kami?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Unduh semua dokumentasi proyek dan lihat bagaimana kami dapat membantu bisnis Anda berkembang
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
