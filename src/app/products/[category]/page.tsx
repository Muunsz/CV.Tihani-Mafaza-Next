'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COLORS, PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;

  const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
  const products = PRODUCTS.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-5xl mb-4">404</div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
              Kategori Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-8">
              Kategori yang Anda cari tidak tersedia.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold transition hover:shadow-lg"
              style={{ backgroundColor: COLORS.accent }}
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Katalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Katalog
            </Link>
            <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.primary }}>
              {category.icon} {category.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Jelajahi koleksi lengkap produk dalam kategori {category.name.toLowerCase()}.
              Total {products.length} produk tersedia.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    priceFinal={product.priceFinal}
                    dppValue={product.dppValue}
                    stock={product.stock}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Belum Ada Produk
                </h3>
                <p className="text-gray-600 mb-6">
                  Kategori ini sedang dalam pengembangan. Silakan kembali ke katalog.
                </p>
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 rounded-lg text-white font-bold transition hover:shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Lihat Katalog Lengkap
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
