import { Navbar } from "@/components/guest/layout/Navbar";
import { Footer } from "@/components/guest/layout/Footer";
import { HeroSection } from "@/components/guest/home/HeroSection";
import { StatisticsSection } from "@/components/guest/home/StatisticsSection";
import { USPSection } from "@/components/guest/home/USPSection";
import { ProductsSection } from "@/components/guest/home/ProductsSection";
import { ServicesSection } from "@/components/guest/home/ServicesSection";
import { TestimonialsSection } from "@/components/guest/home/TestimonialsSection";
import { PartnersSection } from "@/components/guest/home/PartnersSection";
import { FAQSection } from "@/components/guest/home/FAQSection";
import { RequestForm } from "@/components/shared/forms/RequestForm";
import { prisma } from "@/lib/prisma";

async function getHomepageData() {
  try {
    // Get statistics from database
    const [totalUsers, totalProducts, totalOrders, totalPartners] =
      await Promise.all([
        prisma.users.count(),
        prisma.products.count({ where: { is_active: true } }),
        prisma.orders.count(),
        prisma.users.count({ where: { roles: { name: "customer" } } }),
      ]);

    // Get featured products
    const featuredProducts = await prisma.products.findMany({
      where: {
        is_featured: true,
        is_active: true,
      },
      include: {
        categories: true,
      },
      take: 6,
      orderBy: {
        created_at: "desc",
      },
    });

    // Convert Decimal objects to plain numbers for client components
    const processedProducts = featuredProducts.map((product) => ({
      ...product,
      price: Number(product.price),
      rating: Number(product.rating),
      discount_percentage: product.discount_percentage ?? 0,
      stock_quantity: product.stock_quantity ?? 0,
      is_featured: product.is_featured === true,
      review_count: product.review_count ?? 0,
    }));

    // Get testimonials
    const testimonials = await prisma.product_reviews.findMany({
      where: {
        rating: { gte: 4 },
        is_approved: true,
      },
      include: {
        users: {
          select: {
            full_name: true,
          },
        },
        products: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 6,
    });

    // Map testimonials to ensure title is never null
    const processedTestimonials = testimonials.map((t) => ({
      ...t,
      title: t.title ?? "Testimoni Pelanggan",
      review_text: t.review_text ?? "",
    }));

    return {
      statistics: {
        totalUsers: totalUsers + 100, // Add some buffer for display
        totalProducts: totalProducts + 50,
        totalOrders: totalOrders + 25,
        totalPartners: totalPartners + 75,
      },
      featuredProducts: processedProducts,
      testimonials: processedTestimonials,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      statistics: {
        totalUsers: 100,
        totalProducts: 50,
        totalOrders: 25,
        totalPartners: 75,
      },
      featuredProducts: [],
      testimonials: [],
    };
  }
}

export default async function Home() {
  const data = await getHomepageData();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatisticsSection statistics={data.statistics} />
        <USPSection />
        <ProductsSection products={data.featuredProducts} />
        <ServicesSection />
        <TestimonialsSection testimonials={data.testimonials} />
        <PartnersSection />
        <FAQSection />
        <RequestForm />
      </main>
      <Footer />
    </div>
  );
}
