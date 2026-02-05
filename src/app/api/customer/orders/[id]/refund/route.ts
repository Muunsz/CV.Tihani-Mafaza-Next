import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { Prisma } from '@prisma/client'; // Import Prisma

/**
 * POST /api/orders/[id]/refund
 * Create refund for order (admin/staff only)
 */
export async function POST(
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

    const { amount, reason, items } = body;

    // Get order
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
      include: {
        order_items: true,
        payments: {
          where: { payment_status: 'completed' },
        },
      },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found', 'NOT_FOUND');
    }

    if (order.payments.length === 0) {
      throw new ApiError(400, 'No completed payments found', 'INVALID_REQUEST');
    }

    // Validate refund amount
    const totalPaid = order.payments.reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );
    if (Number(amount) > totalPaid) {
      throw new ApiError(
        400,
        `Refund amount exceeds paid amount (${totalPaid})`,
        'INVALID_REQUEST'
      );
    }

    // Create refund payment
    const refundPayment = await prisma.payments.create({
      data: {
        order_id: parseInt(id),
        payment_method: 'refund',
        amount: new Prisma.Decimal(amount),
        payment_status: 'refunded',
        error_message: reason || null,
      },
    });

    // Restore inventory if partial or full refund
    if (items && Array.isArray(items)) {
      await Promise.all(
        (items as { id: number; quantity?: number }[]).map(async (item) => {
          const orderItem = order.order_items.find(
            (oi) => oi.id === item.id
          );
          if (orderItem) {
            await prisma.products.update({
              where: { id: orderItem.product_id },
              data: {
                stock_quantity: {
                  increment: item.quantity || orderItem.quantity,
                },
              },
            });
          }
        })
      );
    }

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(userId || '0'),
        action: 'CREATE_REFUND',
        entity_type: 'payments',
        entity_id: refundPayment.id,
        new_value: {
          order_id: order.id,
          amount,
          reason,
        },
      },
    });

    // Send notification
    if (order.user_id) {
      await prisma.notifications.create({
        data: {
          user_id: order.user_id,
          type: 'refund_issued',
          title: `Refund Issued for Order ${order.order_number}`,
          message: `A refund of ${amount} has been issued. Amount will be credited within 5-7 business days.`,
          data: { order_id: order.id, amount },
        },
      });
    }

    return NextResponse.json(
      ApiResponse.success({
        message: 'Refund created successfully',
        refund: refundPayment,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
