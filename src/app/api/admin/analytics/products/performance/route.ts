import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/analytics/products/performance
 * Get product performance metrics
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError('UNAUTHORIZED', 'Admin or staff access required', 403);
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get top selling products
    const topSelling = await prisma.order_items.groupBy({
      by: ['product_id'],
      where: {
        orders: {
          payment_status: 'paid',
          created_at: { gte: startDate },
        },
      },
      _sum: {
        quantity: true,
        total_price: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 10,
    });

    // Get low stock products
    const lowStock = await prisma.products.findMany({
      where: {
        is_active: true,
        stock_quantity: {
          lte: 10,
        },
      },
      select: {
        id: true,
        name: true,
        sku: true,
        stock_quantity: true,
        price: true,
      },
      orderBy: {
        stock_quantity: 'asc',
      },
      take: 10,
    });

    // Get products with most reviews
    const mostReviewed = await prisma.product_reviews.groupBy({
      by: ['product_id'],
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    // Enrich top selling with product details
    const enrichedTopSelling = await Promise.all(
      topSelling.map(async (item) => {
        const product = await prisma.products.findUnique({
          where: { id: item.product_id },
          select: {
            id: true,
            name: true,
            price: true,
            rating: true,
            review_count: true,
          },
        });
        return {
          product,
          quantitySold: item._sum.quantity,
          revenue: item._sum.total_price,
          orders: item._count.id,
        };
      })
    );

    // Enrich most reviewed
    const enrichedMostReviewed = await Promise.all(
      mostReviewed.map(async (item) => {
        const product = await prisma.products.findUnique({
          where: { id: item.product_id },
          select: {
            id: true,
            name: true,
            rating: true,
          },
        });
        return {
          product,
          reviewCount: item._count.id,
          averageRating: item._avg.rating,
        };
      })
    );

    return NextResponse.json(
      ApiResponse.success({
        topSelling: enrichedTopSelling,
        lowStock,
        mostReviewed: enrichedMostReviewed,
        dateRange: {
          startDate,
          endDate: new Date(),
          days,
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
