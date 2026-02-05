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
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    if (!role_id) {
      throw new ApiError(400, 'role_id is required', 'VALIDATION_ERROR');
    }

    const { id } = await params;

    // Get user
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
      include: { roles: true },
    });

    if (!user) {
      throw new ApiError(404, 'User not found', 'NOT_FOUND');
    }

    // Verify role exists
    const roleExists = await prisma.roles.findUnique({
      where: { id: role_id },
    });

    if (!roleExists) {
      throw new ApiError(404, 'Role not found', 'NOT_FOUND');
    }

    // Cannot change own role
    if (parseInt(adminId || '0') === parseInt(id)) {
      throw new ApiError(400, 'Cannot change your own role', 'INVALID_REQUEST');
    }

    // Update user role
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { role_id },
      include: { roles: true },
    });

    // Log activity
    await prisma.activity_logs.create({
      data: {
        user_id: parseInt(adminId || '0'),
        action: 'UPDATE_USER_ROLE',
        entity_type: 'users',
        entity_id: parseInt(id),
        old_value: { role: user.roles?.name },
        new_value: { role: roleExists.name },
      },
    });

    return NextResponse.json(ApiResponse.success(updatedUser));
  } catch (error) {
    return handleError(error);
  }
}
