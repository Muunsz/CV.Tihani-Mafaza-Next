import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/users/addresses
 * Get all addresses for user
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const addresses = await prisma.user_addresses.findMany({
      where: { user_id: parseInt(userId) },
      select: {
        id: true,
        full_name: true,
        phone_number: true,
        street_address: true,
        city: true,
        province: true,
        postal_code: true,
        is_default: true,
        created_at: true,
      },
      orderBy: { is_default: 'desc' },
    });

    return NextResponse.json(ApiResponse.success(addresses));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/users/addresses
 * Create new address
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const {
      full_name,
      phone_number,
      street_address,
      city,
      province,
      postal_code,
      is_default,
    } = body;

    // Validate required fields
    const errors: Record<string, string> = {};
    if (!full_name) errors.full_name = 'Full name is required';
    if (!phone_number) errors.phone_number = 'Phone number is required';
    if (!street_address) errors.street_address = 'Street address is required';
    if (!city) errors.city = 'City is required';
    if (!province) errors.province = 'Province is required';
    if (!postal_code) errors.postal_code = 'Postal code is required';

    if (Object.keys(errors).length > 0) {
      throw new ApiError('VALIDATION_ERROR', 'Validation failed', 400, errors);
    }

    // If setting as default, unset other addresses
    if (is_default) {
      await prisma.user_addresses.updateMany({
        where: { user_id: parseInt(userId) },
        data: { is_default: false },
      });
    }

    const address = await prisma.user_addresses.create({
      data: {
        user_id: parseInt(userId),
        full_name,
        phone_number,
        street_address,
        city,
        province,
        postal_code,
        is_default: is_default || false,
      },
      select: {
        id: true,
        full_name: true,
        phone_number: true,
        street_address: true,
        city: true,
        province: true,
        postal_code: true,
        is_default: true,
        created_at: true,
      },
    });

    return NextResponse.json(ApiResponse.success(address, 201), {
      status: 201,
    });
  } catch (error) {
    return handleError(error);
  }
}
