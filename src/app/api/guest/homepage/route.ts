import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get statistics from database
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalPartners,
    ] = await Promise.all([
      prisma.users.count(),
      prisma.products.count({ where: { is_active: true } }),
      prisma.orders.count(),
      prisma.users.count({ where: { roles: { name: 'customer' } } }),
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
        created_at: 'desc',
      },
    });

    // Get testimonials
    const testimonials = await prisma.product_reviews.findMany({
      where: {
        rating: { gte: 4 },
      },
      include: {
        users: {
          select: {
            full_name: true,
          },
        },
      },
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      statistics: {
        totalUsers: totalUsers + 100, // Add some buffer for display
        totalProducts: totalProducts + 50,
        totalOrders: totalOrders + 25,
        totalPartners: totalPartners + 75,
      },
      featuredProducts,
      testimonials,
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}