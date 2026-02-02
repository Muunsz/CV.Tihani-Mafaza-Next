import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { Prisma } from '@prisma/client';

/**
 * POST /api/orders/[id]/payment
 * Confirm payment for order
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      payment_method,
      gateway_transaction_id,
      gateway_reference,
      amount,
    } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!payment_method) {
      errors.payment_method = 'Payment method is required';
    }
    if (!gateway_transaction_id) {
      errors.gateway_transaction_id = 'Transaction ID is required';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError('VALIDATION_ERROR', 'Validation failed', 400, errors);
    }

    // Get order
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      throw new ApiError('NOT_FOUND', 'Order not found', 404);
    }

    if (order.payment_status === 'paid') {
      throw new ApiError('CONFLICT', 'Order already paid', 409);
    }

    // Verify amount matches
    if (Number(amount) !== Number(order.total_amount)) {
      throw new ApiError(
        'INVALID_REQUEST',
        'Payment amount does not match order total',
        400
      );
    }

    // Create payment record
    const payment = await prisma.payments.create({
      data: {
        order_id: parseInt(id),
        payment_method,
        amount: new Prisma.Decimal(amount),
        payment_status: 'completed',
        gateway_transaction_id,
        gateway_reference: gateway_reference || null,
        paid_at: new Date(),
      },
    });

    // Update order status
    const updatedOrder = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: {
        payment_status: 'paid',
        order_status: 'processing',
      },
      include: {
        order_items: true,
      },
    });

    return NextResponse.json(
      ApiResponse.success({
        payment,
        order: updatedOrder,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/orders/[id]/payment
 * Get payment details for order
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      throw new ApiError('NOT_FOUND', 'Order not found', 404);
    }

    const payments = await prisma.payments.findMany({
      where: { order_id: parseInt(id) },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(ApiResponse.success(payments));
  } catch (error) {
    return handleError(error);
  }
}
