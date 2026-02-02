import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * PUT /api/admin/users/[id]/role
 * Update user role (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminRole = request.headers.get('x-user-role');
    const adminId = request.headers.get('x-user-id');
    const body = await request.json();
    const { role_id } = body;

    if (adminRole !== 'admin') {
      throw new ApiError('UNAUTHORIZED', 'Admin access required', 403);
    }

    if (!role_id) {
      throw new ApiError('VALIDATION_ERROR', 'role_id is required', 400);
    }

    const { id } = await params;

    // Get user
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
      include: { role: true },
    });

    if (!user) {
      throw new ApiError('NOT_FOUND', 'User not found', 404);
    }

    // Verify role exists
    const roleExists = await prisma.roles.findUnique({
      where: { id: role_id },
    });

    if (!roleExists) {
      throw new ApiError('NOT_FOUND', 'Role not found', 404);
    }

    // Cannot change own role
    if (parseInt(adminId || '0') === parseInt(params.id)) {
      throw new ApiError(
        'INVALID_REQUEST',
        'Cannot change your own role',
        400
      );
    }

    // Update user role
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(params.id) },
      data: { role_id },
      include: { role: true },
    });

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(adminId || '0'),
        action: 'UPDATE_USER_ROLE',
        entity_type: 'users',
        entity_id: parseInt(params.id),
        old_value: { role: user.role?.name },
        new_value: { role: roleExists.name },
      },
    });

    return NextResponse.json(ApiResponse.success(updatedUser));
  } catch (error) {
    return handleError(error);
  }
}
