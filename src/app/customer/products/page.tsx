"use client";

import React, { useState } from "react";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { COLORS } from "@/lib/constants";
import { Heart, ShoppingCart, Star, Search, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, name: "Laptop Gaming Pro", category: "Elektronik", price: 12500000, rating: 4.8, reviews: 128, image: "💻" },
  { id: 2, name: "Mouse Wireless", category: "Aksesoris", price: 450000, rating: 4.5, reviews: 45, image: "🖱️" },
  { id: 3, name: "Keyboard Mechanical", category: "Aksesoris", price: 1200000, rating: 4.9, reviews: 92, image: "⌨️" },
  { id: 4, name: "Monitor 4K", category: "Elektronik", price: 3500000, rating: 4.7, reviews: 67, image: "🖥️" },
  { id: 5, name: "Headphone Noise Cancelling", category: "Audio", price: 2800000, rating: 4.6, reviews: 156, image: "🎧" },
  { id: 6, name: "Webcam Full HD", category: "Aksesoris", price: 850000, rating: 4.4, reviews: 34, image: "📷" },
];

const categories = ["Semua", "Elektronik", "Aksesoris", "Audio"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "Semua" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <CustomerLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>
          Katalog Produk
        </h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition ${
                  selectedCategory === category
                    ? "text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? COLORS.accent : undefined,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl relative">
                {product.image}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 transition"
                >
                  <Heart
                    size={20}
                    className={wishlist.includes(product.id) ? "text-red-600 fill-current" : "text-gray-400"}
                  />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                </div>

                <p className="text-sm text-gray-500 mb-3">{product.category}</p>

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                <p className="text-lg font-bold mb-4" style={{ color: COLORS.accent }}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                <button
                  className="w-full py-2 rounded-lg text-white font-semibold transition hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <ShoppingCart size={18} />
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Tidak ada produk ditemukan</p>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
