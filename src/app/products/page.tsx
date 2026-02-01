'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS, PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Katalog Produk & Layanan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Ribuan produk berkualitas dengan harga transparan siap untuk memenuhi kebutuhan Anda.
              Telusuri berbagai kategori atau gunakan filter untuk menemukan produk yang tepat.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Info Box */}
            <div
              className="p-6 rounded-lg mb-12 border-l-4"
              style={{
                backgroundColor: COLORS.grayLight,
                borderColor: COLORS.accent,
              }}
            >
              <p className="text-gray-700">
                <strong>Total Produk:</strong> {PRODUCTS.length} item tersedia
                {' | '}
                <strong>Kategori:</strong> {PRODUCT_CATEGORIES.length} kategori
                {' | '}
                <strong>Pengiriman:</strong> Ke seluruh Indonesia
              </p>
            </div>

            {/* Product Grid with Filters */}
            <ProductGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
