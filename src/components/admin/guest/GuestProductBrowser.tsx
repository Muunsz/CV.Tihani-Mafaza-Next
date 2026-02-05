"use client";

import { COLORS, PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/constants";
import { Heart, ShoppingCart, Search, Filter } from "lucide-react";
import { useState } from "react";

export function GuestProductBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <Search size={20} style={{ color: COLORS.gray }} />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <button
              className="px-4 py-2 rounded-lg flex items-center gap-2 border"
              style={{ color: COLORS.primary, borderColor: COLORS.accent }}
            >
              <Filter size={20} />
              Filter
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === "all" ? "text-white" : "border bg-white"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === "all" ? COLORS.primary : "transparent",
                borderColor:
                  selectedCategory === "all" ? COLORS.primary : COLORS.gray,
                color: selectedCategory === "all" ? "white" : COLORS.primary,
              }}
            >
              Semua Kategori
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat.id ? "text-white" : "border bg-white"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === cat.id
                      ? COLORS.primary
                      : "transparent",
                  borderColor:
                    selectedCategory === cat.id ? COLORS.primary : COLORS.gray,
                  color: selectedCategory === cat.id ? "white" : COLORS.primary,
                }}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <p className="text-sm text-gray-600">
            Menampilkan {filteredProducts.length} dari {PRODUCTS.length} produk
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
          >
            {/* Product Image */}
            <div
              className="h-48 bg-linear-to-br"
              style={{
                backgroundImage: `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.accent}20)`,
              }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23f0f0f0" width="200" height="200"/><text x="50%" y="50%" fontSize="14" fill="%23999" textAnchor="middle" dy=".3em">No Image</text></svg>';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-bold flex-1 text-sm line-clamp-2">
                  {product.name}
                </h3>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <Heart
                    size={20}
                    fill={
                      wishlist.includes(product.id) ? COLORS.accent : "none"
                    }
                    style={{
                      color: wishlist.includes(product.id)
                        ? COLORS.accent
                        : COLORS.gray,
                    }}
                  />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">{product.category}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Harga</p>
                <p
                  className="text-xl font-bold"
                  style={{ color: COLORS.accent }}
                >
                  Rp{(product.priceFinal / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">
                  DPP: Rp{(product.dppValue / 1000000).toFixed(1)}M
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg text-white font-semibold transition hover:shadow-md"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <ShoppingCart size={18} className="mx-auto" />
                </button>
                <button
                  className="flex-1 py-2 rounded-lg font-semibold border transition hover:bg-gray-50"
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Tidak ada produk yang sesuai</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
