import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { COLORS } from "@/lib/constants";
import { ProductGrid } from '@/components/shared/products/ProductGrid';
import { prisma } from "@/lib/prisma";

async function getProducts() {
  try {
    const products = await prisma.products.findMany({
      where: { is_active: true },
      include: {
        categories: true,
        _count: {
          select: { product_reviews: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: Number(product.price), // Convert Decimal to number
      discount_percentage: product.discount_percentage || 0,
      stock_quantity: product.stock_quantity || 0,
      category: product.categories.name,
      category_id: product.category_id,
      is_featured: product.is_featured || false,
      image_url: "/placeholder-product.jpg", // Placeholder image since product_images model doesn't exist
      rating: Number(product.rating) || 0, // Convert Decimal to number
      review_count: product._count.product_reviews,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      where: { is_active: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      product_count: category._count.products,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              Katalog Produk & Layanan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Ribuan produk berkualitas dengan harga transparan siap untuk
              memenuhi kebutuhan Anda. Telusuri berbagai kategori atau gunakan
              filter untuk menemukan produk yang tepat.
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
                <strong>Total Produk:</strong> {products.length} item tersedia
                {" | "}
                <strong>Kategori:</strong> {categories.length} kategori
                {" | "}
                <strong>Pengiriman:</strong> Ke seluruh Indonesia
              </p>
            </div>

            {/* Product Grid with Filters */}
            <ProductGrid
              initialProducts={products}
              initialCategories={categories}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
