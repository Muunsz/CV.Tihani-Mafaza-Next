import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/analytics/customers
 * Get customer insights and metrics
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

    const [
      totalCustomers,
      newCustomers,
      topCustomers,
      customerOrderStats,
      avgOrderValue,
    ] = await Promise.all([
      // Total customers
      prisma.users.count(),

      // New customers in period
      prisma.users.count({
        where: {
          created_at: { gte: startDate },
        },
      }),

      // Top customers by order value
      prisma.orders.groupBy({
        by: ['user_id'],
        where: {
          payment_status: 'paid',
          user_id: { not: null },
          created_at: { gte: startDate },
        },
        _sum: {
          total_amount: true,
        },
        _count: {
          id: true,
        },
        orderBy: {
          _sum: {
            total_amount: 'desc',
          },
        },
        take: 10,
      }),

      // Order statistics
      prisma.orders.aggregate({
        where: {
          payment_status: 'paid',
          created_at: { gte: startDate },
        },
        _count: {
          id: true,
        },
        _avg: {
          total_amount: true,
        },
      }),

      // Average order value
      prisma.orders.aggregate({
        where: {
          payment_status: 'paid',
        },
        _avg: {
          total_amount: true,
        },
      }),
    ]);

    // Get customer details for top customers
    const topCustomersWithDetails = await Promise.all(
      topCustomers.map(async (customer) => {
        if (!customer.user_id) return null;

        const user = await prisma.users.findUnique({
          where: { id: customer.user_id },
          select: {
            id: true,
            full_name: true,
            email: true,
            phone_number: true,
          },
        });

        return {
          user,
          totalSpent: customer._sum.total_amount,
          orderCount: customer._count.id,
        };
      })
    );

    return NextResponse.json(
      ApiResponse.success({
        totalCustomers,
        newCustomersInPeriod: newCustomers,
        topCustomers: topCustomersWithDetails,
        orderMetrics: {
          totalOrders: customerOrderStats._count.id,
          averageOrderValue: customerOrderStats._avg.total_amount,
        },
        overallAverageOrderValue: avgOrderValue._avg.total_amount,
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
