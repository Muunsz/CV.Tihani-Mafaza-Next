import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

/**
 * GET /api/admin/activity-logs
 * Get activity logs
 */
export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError('UNAUTHORIZED', 'Admin or staff access required', 403);
    }

    const { searchParams } = new URL(request.url);
    const params = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const action = searchParams.get('action');
    const entityType = searchParams.get('entity_type');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const skip = (params.page - 1) * params.limit;
    const where: any = {
      created_at: { gte: startDate },
    };

    if (action) {
      where.action = action;
    }
    if (entityType) {
      where.entity_type = entityType;
    }

    const [logs, total] = await Promise.all([
      prisma.activity_logs.findMany({
        where,
        skip,
        take: params.limit,
        include: {
          users: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.activity_logs.count({ where }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        data: logs,
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
 * POST /api/admin/activity-logs
 * Create activity log entry
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    const {
      action,
      entity_type,
      entity_id,
      old_value,
      new_value,
      ip_address,
      user_agent,
    } = body;

    if (!action || !entity_type) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Action and entity_type are required',
        400
      );
    }

    const log = await prisma.activity_logs.create({
      data: {
        user_id: userId ? parseInt(userId) : null,
        action,
        entity_type,
        entity_id,
        old_value: old_value || null,
        new_value: new_value || null,
        ip_address: ip_address || null,
        user_agent: user_agent || null,
      },
    });

    return NextResponse.json(ApiResponse.success(log, 201));
  } catch (error) {
    return handleError(error);
  }
}
