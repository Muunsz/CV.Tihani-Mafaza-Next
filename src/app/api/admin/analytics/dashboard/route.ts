import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/analytics/dashboard
 * Get dashboard analytics (admin/staff only)
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    // Get date range from query params
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get metrics
    const [
      totalOrders,
      totalRevenue,
      totalUsers,
      activeProducts,
      recentOrders,
      topProducts,
      orderStats,
    ] = await Promise.all([
      // Total orders
      prisma.orders.count({
        where: {
          created_at: { gte: startDate },
        },
      }),

      // Total revenue
      prisma.orders.aggregate({
        where: {
          payment_status: 'paid',
          created_at: { gte: startDate },
        },
        _sum: {
          total_amount: true,
        },
      }),

      // Total users
      prisma.users.count(),

      // Active products
      prisma.products.count({
        where: { is_active: true },
      }),

      // Recent orders
      prisma.orders.findMany({
        take: 10,
        orderBy: { created_at: 'desc' },
        include: {
          users: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
        },
      }),

      // Top products
      prisma.order_items.groupBy({
        by: ['product_id'],
        _count: {
          id: true,
        },
        _sum: {
          total_price: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: 5,
      }),

      // Order status stats
      prisma.orders.groupBy({
        by: ['order_status'],
        _count: {
          id: true,
        },
      }),
    ]);

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (p) => {
        const product = await prisma.products.findUnique({
          where: { id: p.product_id },
          select: {
            id: true,
            name: true,
            price: true,
          },
        });
        return {
          product,
          quantity_sold: p._count.id,
          revenue: p._sum.total_price,
        };
      })
    );

    return NextResponse.json(
      ApiResponse.success({
        metrics: {
          totalOrders,
          totalRevenue: totalRevenue._sum.total_amount || 0,
          totalUsers,
          activeProducts,
        },
        orderStats,
        recentOrders,
        topProducts: topProductsWithDetails,
        dateRange: {
          startDate,
          endDate: new Date(),
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
