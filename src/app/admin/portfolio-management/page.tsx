"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";
import { useState } from "react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  status: "published" | "draft";
  date: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Sistem Manajemen Inventori",
    category: "Web Application",
    description: "Platform lengkap untuk mengelola stok barang...",
    status: "published",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Web Application",
    description: "Marketplace modern dengan fitur lengkap...",
    status: "published",
    date: "2023-12-20",
  },
  {
    id: 3,
    title: "Mobile App Pemesanan",
    category: "Mobile App",
    description: "Aplikasi mobile untuk pemesanan...",
    status: "draft",
    date: "2023-11-10",
  },
];

function PortfolioManagementContent() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(portfolioItems);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Portfolio
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {filteredItems.length} proyek
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition hover:shadow-lg"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={18} />
          Tambah Proyek
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Cari proyek..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        />
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4">Tambah Proyek Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Judul Proyek" className="px-4 py-2.5 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Kategori" className="px-4 py-2.5 border border-gray-300 rounded-lg" />
            <textarea
              placeholder="Deskripsi"
              className="md:col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: COLORS.accent }}
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ backgroundColor: `${COLORS.primary}08` }}>
              <th className="px-6 py-3 text-left font-semibold">Judul</th>
              <th className="px-6 py-3 text-left font-semibold">Kategori</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-6 py-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status === "published" ? "Dipublikasikan" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit2 size={18} style={{ color: COLORS.primary }} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PortfolioManagement() {
  return (
    <RoleLayout role="admin" title="Portfolio Management" subtitle="Kelola proyek portfolio Anda">
      <PortfolioManagementContent />
    </RoleLayout>
  );
}
