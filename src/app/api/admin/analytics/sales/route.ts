import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/analytics/sales
 * Get sales analytics
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly'; // daily, weekly, monthly
    const startDate = new Date();

    // Set start date based on period
    if (period === 'daily') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'weekly') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === 'monthly') {
      startDate.setMonth(startDate.getMonth() - 12);
    }

    // Get sales data by period
    const salesData = await prisma.orders.groupBy({
      by: ['created_at'],
      where: {
        payment_status: 'paid',
        created_at: { gte: startDate },
      },
      _count: {
        id: true,
      },
      _sum: {
        total_amount: true,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    // Get top categories
    const topCategories = await prisma.order_items.groupBy({
      by: ['product_id'],
      where: {
        orders: {
          payment_status: 'paid',
          created_at: { gte: startDate },
        },
      },
      _sum: {
        total_price: true,
      },
      _count: {
        id: true,
      },
    });

    // Enrich with category info
    const enrichedCategories = await Promise.all(
      topCategories.slice(0, 5).map(async (item) => {
        const product = await prisma.products.findUnique({
          where: { id: item.product_id },
          include: { categories: true },
        });
        return {
          category: product?.categories.name,
          revenue: item._sum.total_price,
          quantity: item._count.id,
        };
      })
    );

    return NextResponse.json(
      ApiResponse.success({
        period,
        salesData,
        topCategories: enrichedCategories,
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
