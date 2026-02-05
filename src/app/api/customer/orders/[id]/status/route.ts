import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

const VALID_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

/**
 * PUT /api/orders/[id]/status
 * Update order status (admin/staff only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const role = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    const { order_status, tracking_number } = body;

    if (!order_status || !VALID_STATUSES.includes(order_status)) {
      throw new ApiError(
        400,
        `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        'VALIDATION_ERROR'
      );
    }

    // Get order
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found', 'NOT_FOUND');
    }

    // Update order
    const updatedOrder = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: {
        order_status,
        ...(tracking_number && { tracking_number }),
      },
      include: {
        order_items: true,
        users: {
          select: { id: true, email: true, full_name: true },
        },
      },
    });

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(userId || '0'),
        action: 'UPDATE_ORDER_STATUS',
        entity_type: 'orders',
        entity_id: parseInt(id),
        old_value: { status: order.order_status },
        new_value: { status: order_status },
      },
    });

    // Create notification for user
    if (updatedOrder.users && updatedOrder.users.id) {
      await prisma.notifications.create({
        data: {
          user_id: updatedOrder.users.id,
          type: 'order_update',
          title: `Order ${updatedOrder.order_number} Status Updated`,
          message: `Your order status has been updated to ${order_status}`,
          data: { order_id: updatedOrder.id, status: order_status },
        },
      });
    }

    return NextResponse.json(ApiResponse.success(updatedOrder));
  } catch (error) {
    return handleError(error);
  }
}
