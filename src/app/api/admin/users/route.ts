import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

/**
 * GET /api/users
 * Get all users (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const role = request.headers.get('x-user-role');

    if (!userId || role !== 'admin') {
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    const { searchParams } = new URL(request.url);
    const params = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const skip = (params.page - 1) * params.limit;

    const [users, total] = await Promise.all([
      prisma.users.findMany({
        skip,
        take: params.limit,
        select: {
          id: true,
          email: true,
          full_name: true,
          phone_number: true,
          is_active: true,
          email_verified: true,
          roles: {
            select: {
              id: true,
              name: true,
            },
          },
          created_at: true,
        },
      }),
      prisma.users.count(),
    ]);

    return NextResponse.json(
      ApiResponse.success(
        {
          data: users,
          pagination: {
            page: params.page,
            limit: params.limit,
            total,
            pages: Math.ceil(total / params.limit),
          },
        },
        200
      )
    );
  } catch (error) {
    return handleError(error);
  }
}
