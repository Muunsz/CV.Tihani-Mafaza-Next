import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

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

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.order_status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.orders.findMany({
        where,
        include: {
          users: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
          order_items: {
            include: {
              products: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.orders.count({ where }),
    ]);

    return ApiResponse.success(
      {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      200
    );
  } catch (error) {
    return handleError(error);
  }
}
