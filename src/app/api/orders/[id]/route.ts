import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/orders/[id]
 * Get order details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const order = await prisma.orders.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        order_items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image_url: true,
              },
            },
          },
        },
        shipping_address: {
          select: {
            full_name: true,
            phone_number: true,
            street_address: true,
            city: true,
            province: true,
            postal_code: true,
          },
        },
      },
    });

    if (!order) {
      throw new ApiError('NOT_FOUND', 'Order not found', 404);
    }

    // Verify ownership
    if (order.user_id !== parseInt(userId)) {
      throw new ApiError('FORBIDDEN', 'Cannot access this order', 403);
    }

    return NextResponse.json(ApiResponse.success(order));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/orders/[id]
 * Update order (admin only - for future use)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userRole = request.headers.get('x-user-role');
    const body = await request.json();

    if (userRole !== 'admin' && userRole !== 'staff') {
      throw new ApiError('FORBIDDEN', 'Only admins can update orders', 403);
    }

    const { order_status, payment_status, tracking_number } = body;

    // Validate status values
    const validOrderStatuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ];
    const validPaymentStatuses = ['unpaid', 'paid', 'failed', 'refunded'];

    if (order_status && !validOrderStatuses.includes(order_status)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Invalid order status'
      );
    }

    if (payment_status && !validPaymentStatuses.includes(payment_status)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Invalid payment status'
      );
    }

    const updated = await prisma.orders.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(order_status && { order_status }),
        ...(payment_status && { payment_status }),
        ...(tracking_number && { tracking_number }),
      },
    });

    return NextResponse.json(ApiResponse.success(updated));
  } catch (error) {
    return handleError(error);
  }
}
