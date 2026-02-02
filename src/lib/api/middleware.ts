import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './errors';
import { handleError } from './response';

/**
 * Middleware to require authentication
 */
export function requireAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      const userId = request.headers.get('x-user-id');

      if (!userId) {
        throw new ApiError('UNAUTHORIZED', 'Authentication required', 401);
      }

      return handler(request, ...args);
    } catch (error) {
      return handleError(error);
    }
  };
}

/**
 * Middleware to require specific role
 */
export function requireRole(...roles: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest, ...args: any[]) => {
      try {
        const userRole = request.headers.get('x-user-role');

        if (!userRole || !roles.includes(userRole)) {
          throw new ApiError(
            'FORBIDDEN',
            `This action requires one of: ${roles.join(', ')}`,
            403
          );
        }

        return handler(request, ...args);
      } catch (error) {
        return handleError(error);
      }
    };
  };
}

/**
 * Middleware to validate request method
 */
export function validateMethod(...methods: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest, ...args: any[]) => {
      try {
        if (!methods.includes(request.method)) {
          throw new ApiError(
            'METHOD_NOT_ALLOWED',
            `Method ${request.method} not allowed`,
            405
          );
        }

        return handler(request, ...args);
      } catch (error) {
        return handleError(error);
      }
    };
  };
}

/**
 * Middleware to log activity
 */
export async function logActivity(
  userId: number | null,
  action: string,
  entityType: string,
  entityId: number | null,
  oldValue?: any,
  newValue?: any
) {
  try {
    const { prisma } = await import('./../../lib/prisma');

    await prisma.activity_logs.create({
      data: {
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        old_value: oldValue || null,
        new_value: newValue || null,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
