import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

const updateOrderSchema = z.object({
  order_status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
  payment_status: z.enum(['unpaid', 'paid', 'failed', 'refunded']).optional(),
  tracking_number: z.string().optional(),
  notes: z.string().optional(),
});

async function verifyAdminAccess(userId: string | null) {
  if (!userId) {
    throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const user = await prisma.users.findUnique({
    where: { id: parseInt(userId) },
    include: { roles: true },
  });

  if (!user || !['admin', 'staff'].includes(user.roles?.name || '')) {
    throw new ApiError('Forbidden', 403, 'FORBIDDEN');
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const { id } = await params;

    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
      include: {
        users: true,
        order_items: {
          include: {
            products: true,
          },
        },
        payments: true,
        user_addresses: true,
      },
    });

    if (!order) {
      throw new ApiError('Order not found', 404, 'NOT_FOUND');
    }

    return ApiResponse.success(order, 200);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateOrderSchema.parse(body);

    const order = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: {
        ...validatedData,
        updated_at: new Date(),
      },
      include: {
        users: true,
        order_items: {
          include: {
            products: true,
          },
        },
      },
    });

    return ApiResponse.success(order, 200, 'Order updated successfully');
  } catch (error) {
    return handleError(error);
  }
}
