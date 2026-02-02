import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    if (!['admin', 'staff'].includes(userRole || '')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Not authorized' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate) where.created_at.lte = new Date(endDate);
    }

    const orders = await prisma.orders.findMany({
      where,
      include: {
        order_items: {
          include: {
            products: true,
          },
        },
        payments: true,
        users: {
          select: {
            email: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    if (format === 'csv') {
      let csv = 'Order ID,Order Number,User,Email,Total Amount,Status,Payment Status,Created At\n';
      orders.forEach((order) => {
        csv += `${order.id},"${order.order_number}","${order.users?.full_name || 'Guest'}","${order.users?.email || order.guest_email}",${order.total_amount},"${order.order_status}","${order.payment_status}","${order.created_at}"\n`;
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="orders.csv"',
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('[v0] Export orders error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to export orders' } },
      { status: 500 }
    );
  }
}
