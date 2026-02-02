import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/users/profile
 * Get user profile information
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone_number: true,
        profile_image_url: true,
        is_active: true,
        email_verified: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new ApiError('NOT_FOUND', 'User not found', 404);
    }

    return NextResponse.json(ApiResponse.success(user));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/users/profile
 * Update user profile
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const { full_name, phone_number, profile_image_url } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (full_name && full_name.length < 2) {
      errors.full_name = 'Name must be at least 2 characters';
    }
    if (phone_number && !/^[\d\-\+\(\)\s]+$/.test(phone_number)) {
      errors.phone_number = 'Invalid phone number format';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError('VALIDATION_ERROR', 'Validation failed', 400, errors);
    }

    const updated = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: {
        ...(full_name && { full_name }),
        ...(phone_number && { phone_number }),
        ...(profile_image_url && { profile_image_url }),
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone_number: true,
        profile_image_url: true,
        updated_at: true,
      },
    });

    return NextResponse.json(ApiResponse.success(updated));
  } catch (error) {
    return handleError(error);
  }
}
