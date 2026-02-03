"use client";

import { COLORS } from "@/lib/constants";
import { ShoppingCart, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category: string;
  rating: number;
  review_count: number;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  discount_percentage,
  stock_quantity,
  image_url,
  category,
  rating,
  review_count,
}: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const finalPrice = price * (1 - discount_percentage / 100);
  const hasDiscount = discount_percentage > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {stock_quantity > 0 && stock_quantity <= 5 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Stok Terbatas
          </div>
        )}
        {stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Habis</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {category}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-xs text-gray-600">
                {rating.toFixed(1)} ({review_count})
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/detail/${slug}`}>
          <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition">
            {name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="space-y-2 py-3 border-y border-gray-200">
          <div>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through mb-1">
                {formatCurrency(price)}
              </p>
            )}
            <p className="text-2xl font-bold" style={{ color: COLORS.primary }}>
              {formatCurrency(finalPrice)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-green-600 font-semibold">
                Diskon {discount_percentage}%
              </p>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex-1">
            {stock_quantity === 999 ? (
              <span className="text-green-600 font-semibold">
                ✓ Layanan Tersedia
              </span>
            ) : stock_quantity > 0 ? (
              <span className="text-green-600 font-semibold">
                ✓ Stok: {stock_quantity} unit
              </span>
            ) : (
              <span className="text-red-600 font-semibold">✗ Stok Habis</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            disabled={stock_quantity === 0}
            className="flex-1 px-4 py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: stock_quantity === 0 ? "#ccc" : COLORS.accent,
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Pesan</span>
          </button>
          <Link
            href={`/products/detail/${slug}`}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            title="Detail Produk"
          >
            <Info className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
