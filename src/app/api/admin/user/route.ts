import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

const updateUserSchema = z.object({
  full_name: z.string().optional(),
  is_active: z.boolean().optional(),
  role_id: z.number().int().optional(),
});

async function verifyAdminAccess(userId: string | null) {
  if (!userId) {
    throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const user = await prisma.users.findUnique({
    where: { id: parseInt(userId) },
    include: { roles: true },
  });

  if (!user || user.roles?.name !== 'admin') {
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
    const role = searchParams.get('role');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (role) {
      where.roles = { name: role };
    }

    const [users, total] = await Promise.all([
      prisma.users.findMany({
        where,
        include: {
          roles: {
            select: { name: true },
          },
        },
        select: {
          id: true,
          email: true,
          full_name: true,
          is_active: true,
          created_at: true,
          last_login: true,
          roles: true,
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.users.count({ where }),
    ]);

    return ApiResponse.success(
      {
        users,
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

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const body = await request.json();
    const { userId: targetUserId, ...updateData } = body;

    if (!targetUserId) {
      throw new ApiError('User ID is required', 400, 'MISSING_ID');
    }

    // Prevent self-modification of role
    if (parseInt(userId) === targetUserId && updateData.role_id) {
      throw new ApiError('Cannot change your own role', 400, 'INVALID_ACTION');
    }

    const validatedData = updateUserSchema.parse(updateData);

    const user = await prisma.users.update({
      where: { id: targetUserId },
      data: {
        ...validatedData,
        updated_at: new Date(),
      },
      include: {
        roles: {
          select: { name: true },
        },
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        is_active: true,
        roles: true,
      },
    });

    return ApiResponse.success(user, 200, 'User updated successfully');
  } catch (error) {
    return handleError(error);
  }
}
