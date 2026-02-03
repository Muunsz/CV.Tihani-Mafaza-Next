"use client";

import React from "react";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import { ProductCard } from "./ProductCard";
import { Search, Filter, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  category: string;
  category_id: number;
  is_featured: boolean;
  image_url: string;
  rating: number;
  review_count: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  product_count: number;
}

interface ProductGridProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

export function ProductGrid({
  initialProducts,
  initialCategories,
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">(
    "name",
  );
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  let filtered = initialProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (
          a.price * (1 - a.discount_percentage / 100) -
          b.price * (1 - b.discount_percentage / 100)
        );
      case "price-desc":
        return (
          b.price * (1 - b.discount_percentage / 100) -
          a.price * (1 - a.discount_percentage / 100)
        );
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSortBy("name");
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ "--tw-ring-color": COLORS.accent } as React.CSSProperties}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Filter & Urut</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3">
                Kategori
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === null
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Semua Kategori
                </button>
                {initialCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat.name
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {cat.name} ({cat.product_count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3">
                Urut Berdasarkan
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={
                  { "--tw-ring-color": COLORS.accent } as React.CSSProperties
                }
              >
                <option value="name">Nama (A-Z)</option>
                <option value="price-asc">Harga (Terendah)</option>
                <option value="price-desc">Harga (Tertinggi)</option>
              </select>
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Menampilkan <strong>{filtered.length}</strong> dari{" "}
          <strong>{initialProducts.length}</strong> produk
        </p>
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              discount_percentage={product.discount_percentage}
              stock_quantity={product.stock_quantity}
              image_url={product.image_url}
              category={product.category}
              rating={product.rating}
              review_count={product.review_count}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-gray-600 mb-6">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 rounded-lg text-white font-bold transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}
