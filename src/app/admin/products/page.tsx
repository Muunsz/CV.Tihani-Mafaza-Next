"use client";

import { RoleLayout } from "@/components/admin/RoleLayout";
import { COLORS } from "@/lib/constants";
import {
  Package,
  Search,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Tag,
  Zap,
  Star,
} from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  status: "active" | "inactive";
  image?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Mesin Absen Digital Solution X-601",
    category: "Elektronik",
    price: 6270000,
    stock: 5,
    rating: 4.8,
    reviews: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Epson L3110 Printer Multifungsi",
    category: "Elektronik",
    price: 3179500,
    stock: 8,
    rating: 4.6,
    reviews: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Laptop Acer E5-474 Core i5",
    category: "Elektronik",
    price: 10000000,
    stock: 3,
    rating: 4.9,
    reviews: 15,
    status: "active",
  },
  {
    id: "4",
    name: "Tandu Darurat Medis",
    category: "Medis",
    price: 1976400,
    stock: 10,
    rating: 4.7,
    reviews: 5,
    status: "active",
  },
  {
    id: "5",
    name: "Kursi Siswa Kayu Berkualitas",
    category: "Furniture",
    price: 450000,
    stock: 50,
    rating: 4.5,
    reviews: 20,
    status: "active",
  },
];

function ProductsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Elektronik", "Medis", "Furniture", "Material"];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Produk
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {filteredProducts.length} produk
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus size={18} />
          Tambah Produk
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition"
          style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Semua Kategori" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid - Desktop */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  backgroundColor:
                    product.status === "active"
                      ? "#10b981"
                      : "#6b7280",
                }}
              >
                {product.status === "active" ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-t border-b">
              <div>
                <p className="text-xs text-gray-600">Harga</p>
                <p className="font-bold text-sm">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Stok</p>
                <p
                  className={`font-bold text-sm ${
                    product.stock < 5 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.stock} unit
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-gray-600">
                  ({product.reviews} ulasan)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Edit"
                >
                  <Edit2 size={16} style={{ color: COLORS.primary }} />
                </button>
                <button
                  className="p-2 hover:bg-red-50 rounded-lg transition"
                  title="Hapus"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table - Mobile */}
      <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-gray-900 text-sm">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{product.category}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-gray-600">
                  Stok: {product.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <RoleLayout
      role="admin"
      title="Manajemen Produk"
      subtitle="Kelola katalog produk dan inventori"
    >
      <ProductsContent />
    </RoleLayout>
  );
}
