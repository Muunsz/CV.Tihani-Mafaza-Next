"use client";


import { PRODUCTS, COLORS, PRODUCT_CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/components/products/ProductCard";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug?: string;
  price: number;
  discount_percentage?: number;
  stock_quantity: number;
  image_url?: string;
  is_featured: boolean;
  categories?: {
    name: string;
  };
  category?: string;
  rating?: number;
  review_count?: number;
}

interface ProductsSectionProps {
  products?: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use database products if available, otherwise fallback to constants
  const displayProducts =
    products && products.length > 0 ? products : PRODUCTS.slice(0, 6);

  const filteredProducts = selectedCategory
    ? displayProducts.filter((p) => {
        if (products && products.length > 0) {
          // For database products, filter by category name
          return (
            p.categories?.name?.toLowerCase() ===
            PRODUCT_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name.toLowerCase()
          );
        } else {
          // For constant products, filter by category id
          return (p as any).category === selectedCategory;
        }
      })
    : displayProducts;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Katalog Produk & Layanan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi berbagai kategori produk berkualitas dengan harga
            transparan dan layanan terpercaya
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === null
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedCategory === null ? COLORS.accent : undefined,
            }}
          >
            Semua Produk
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === cat.id ? COLORS.accent : undefined,
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug || ""}
              price={Number(product.price) || 0}
              discount_percentage={product.discount_percentage || 0}
              stock_quantity={product.stock_quantity || 0}
              image_url={product.image_url || "/placeholder-product.jpg"}
              category={product.categories?.name || product.category || ""}
              rating={product.rating || 0}
              review_count={product.review_count || 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-4 rounded-lg text-white font-bold text-lg transition hover:shadow-lg hover:-translate-y-1"
            style={{ backgroundColor: COLORS.primary }}
          >
            Lihat Semua Produk ({products && products.length > 0 ? products.length : PRODUCTS.length})
          </button>
        </div>
      </div>
    </section>
  );
}
