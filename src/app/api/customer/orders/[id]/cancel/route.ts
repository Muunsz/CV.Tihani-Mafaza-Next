import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * POST /api/orders/[id]/cancel
 * Cancel order
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');
    const body = await request.json();
    const { reason } = body;

    // Get order
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
      include: { order_items: true },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found', 'NOT_FOUND');
    }

    // Check authorization - user can only cancel their own orders, admin/staff can cancel any
    if (
      userRole !== 'admin' &&
      userRole !== 'staff' &&
      order.user_id !== parseInt(userId || '0')
    ) {
      throw new ApiError(403, 'Cannot cancel this order', 'FORBIDDEN');
    }

    // Check if order can be cancelled
    if (
      !['pending', 'processing'].includes(order.order_status || '')
    ) {
      throw new ApiError(
        400,
        `Cannot cancel order with status: ${order.order_status}`,
        'INVALID_REQUEST'
      );
    }

    // Restore inventory
    await Promise.all(
      order.order_items.map((item) =>
        prisma.products.update({
          where: { id: item.product_id },
          data: {
            stock_quantity: {
              increment: item.quantity,
            },
          },
        })
      )
    );

    // Update order status
    const cancelledOrder = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: {
        order_status: 'cancelled',
      },
      include: {
        users: {
          select: { email: true, full_name: true, id: true },
        },
      },
    });

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(userId || '0'),
        action: 'CANCEL_ORDER',
        entity_type: 'orders',
        entity_id: parseInt(id),
        old_value: { status: order.order_status },
        new_value: { status: 'cancelled', reason: reason || null },
      },
    });

    // Send notification
    if (cancelledOrder.users) {
      await prisma.notifications.create({
        data: {
          user_id: cancelledOrder.users.id,
          type: 'order_cancelled',
          title: `Order ${cancelledOrder.order_number} Cancelled`,
          message: `Your order has been cancelled. Reason: ${reason || 'No reason provided'}`,
          data: { order_id: cancelledOrder.id },
        },
      });
    }

    return NextResponse.json(
      ApiResponse.success({
        message: 'Order cancelled successfully',
        order: cancelledOrder,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
