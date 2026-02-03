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
  { params }: { params: { id: string } }
) {
  try {
    const role = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError('UNAUTHORIZED', 'Admin or staff access required', 403);
    }

    const { order_status, tracking_number, notes } = body;

    if (!order_status || !VALID_STATUSES.includes(order_status)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        400
      );
    }

    // Get order
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!order) {
      throw new ApiError('NOT_FOUND', 'Order not found', 404);
    }

    // Update order
    const updatedOrder = await prisma.orders.update({
      where: { id: parseInt(params.id) },
      data: {
        order_status,
        ...(tracking_number && { tracking_number }),
      },
      include: {
        order_items: true,
        users: {
          select: { email: true, full_name: true },
        },
      },
    });

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(userId || '0'),
        action: 'UPDATE_ORDER_STATUS',
        entity_type: 'orders',
        entity_id: parseInt(params.id),
        old_value: { status: order.order_status },
        new_value: { status: order_status },
      },
    });

    // Create notification for user
    if (updatedOrder.users) {
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
