import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/admin/settings
 * Get application settings
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin') {
      throw new ApiError('UNAUTHORIZED', 'Admin access required', 403);
    }

    const settings = await prisma.application_settings.findMany();

    const settingsMap = Object.fromEntries(
      settings.map((s) => [s.setting_key, s.setting_value])
    );

    return NextResponse.json(ApiResponse.success(settingsMap));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PUT /api/admin/settings
 * Update application settings
 */
export async function PUT(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin') {
      throw new ApiError('UNAUTHORIZED', 'Admin access required', 403);
    }

    const body = await request.json();

    // Update or create settings
    const updates = await Promise.all(
      Object.entries(body).map(async ([key, value]) => {
        return prisma.application_settings.upsert({
          where: { setting_key: key },
          update: { setting_value: String(value) },
          create: {
            setting_key: key,
            setting_value: String(value),
            setting_type: typeof value,
          },
        });
      })
    );

    return NextResponse.json(ApiResponse.success(updates));
  } catch (error) {
    return handleError(error);
  }
}
