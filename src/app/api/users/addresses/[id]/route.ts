import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * PUT /api/users/addresses/[id]
 * Update address
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    // Verify ownership
    const address = await prisma.user_addresses.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!address) {
      throw new ApiError('NOT_FOUND', 'Address not found', 404);
    }

    if (address.user_id !== parseInt(userId)) {
      throw new ApiError('FORBIDDEN', 'Cannot access this address', 403);
    }

    // If setting as default, unset others
    if (body.is_default) {
      await prisma.user_addresses.updateMany({
        where: {
          user_id: parseInt(userId),
          id: { not: parseInt(params.id) },
        },
        data: { is_default: false },
      });
    }

    const updated = await prisma.user_addresses.update({
      where: { id: parseInt(params.id) },
      data: body,
      select: {
        id: true,
        full_name: true,
        phone_number: true,
        street_address: true,
        city: true,
        province: true,
        postal_code: true,
        is_default: true,
        updated_at: true,
      },
    });

    return NextResponse.json(ApiResponse.success(updated));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/users/addresses/[id]
 * Delete address
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    // Verify ownership
    const address = await prisma.user_addresses.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!address) {
      throw new ApiError('NOT_FOUND', 'Address not found', 404);
    }

    if (address.user_id !== parseInt(userId)) {
      throw new ApiError('FORBIDDEN', 'Cannot access this address', 403);
    }

    await prisma.user_addresses.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'Address deleted' })
    );
  } catch (error) {
    return handleError(error);
  }
}
