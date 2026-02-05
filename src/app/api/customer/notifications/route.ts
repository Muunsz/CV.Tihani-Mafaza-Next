import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

/**
 * GET /api/notifications
 * Get user notifications
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    const { searchParams } = new URL(request.url);
    const params = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });
    const isRead = searchParams.get('is_read');

    const skip = (params.page - 1) * params.limit;
    const where: { user_id: number; is_read?: boolean } = { user_id: parseInt(userId) };

    if (isRead !== null) {
      where.is_read = isRead === 'true';
    }

    const [notifications, total] = await Promise.all([
      prisma.notifications.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.notifications.count({ where }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        data: notifications,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          pages: Math.ceil(total / params.limit),
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/notifications/mark-as-read
 * Mark notifications as read
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();
    const { notification_ids } = body;

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    if (!Array.isArray(notification_ids) || notification_ids.length === 0) {
      throw new ApiError(
        400,
        'Notification IDs array is required',
        'VALIDATION_ERROR'
      );
    }

    // Verify notifications belong to user
    const notifications = await prisma.notifications.findMany({
      where: {
        id: { in: notification_ids },
        user_id: parseInt(userId),
      },
    });

    if (notifications.length === 0) {
      throw new ApiError(404, 'Notifications not found', 'NOT_FOUND');
    }

    // Mark as read
    const updated = await prisma.notifications.updateMany({
      where: {
        id: { in: notification_ids },
        user_id: parseInt(userId),
      },
      data: {
        is_read: true,
        read_at: new Date(),
      },
    });

    return NextResponse.json(
      ApiResponse.success({
        message: `${updated.count} notification(s) marked as read`,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
