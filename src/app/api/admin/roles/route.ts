import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/admin/roles
 * Get all roles (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin') {
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    const roles = await prisma.roles.findMany({
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    return NextResponse.json(ApiResponse.success(roles));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/admin/roles
 * Create new role (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');
    const body = await request.json();

    if (role !== 'admin') {
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    const { name, description, permissions } = body;

    if (!name) {
      throw new ApiError(400, 'Role name is required', 'VALIDATION_ERROR');
    }

    const newRole = await prisma.roles.create({
      data: {
        name,
        description: description || null,
        permissions: permissions || {},
      },
    });

    return NextResponse.json(ApiResponse.success(newRole, 201));
  } catch (error) {
    return handleError(error);
  }
}
