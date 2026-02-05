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
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const { id } = await params;

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
      include: {
        order_items: {
          include: {
            products: {
              select: {
                id: true,
                name: true,
                // image_url: true, // remove if not in schema
              },
            },
          },
        },
        user_addresses: {
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
      throw new ApiError(404, 'Order not found', 'NOT_FOUND');
    }

    // Verify ownership
    if (order.user_id !== parseInt(userId)) {
      throw new ApiError(403, 'Cannot access this order', 'FORBIDDEN');
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
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const userRole = request.headers.get('x-user-role');
    const { id } = await params;
    const body = await request.json();

    if (userRole !== 'admin' && userRole !== 'staff') {
      throw new ApiError(403, 'Only admins can update orders', 'FORBIDDEN');
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
        400,
        'Invalid order status',
        'VALIDATION_ERROR'
      );
    }

    if (payment_status && !validPaymentStatuses.includes(payment_status)) {
      throw new ApiError(
        400,
        'Invalid payment status',
        'VALIDATION_ERROR'
      );
    }

    const updated = await prisma.orders.update({
      where: { id: parseInt(id) },
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
