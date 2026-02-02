import { NextResponse } from 'next/server';
import { ApiError } from './errors';
import { ZodError } from 'zod';

// Standard API Response Type
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: string;
}

// Success Response
export function successResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    } as ApiResponse<T>,
    { status }
  );
}

// Error Response
export function errorResponse(
  message: string,
  status: number = 500,
  code?: string,
  error?: string
) {
  return NextResponse.json(
    {
      success: false,
      message,
      code,
      error,
    } as ApiResponse,
    { status }
  );
}

// Validation Error Response
export function validationErrorResponse(errors: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      error: errors,
    },
    { status: 400 }
  );
}

// Not Found Response
export function notFoundResponse(resource: string = 'Resource') {
  return errorResponse(`${resource} not found`, 404, 'NOT_FOUND');
}

// Unauthorized Response
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

// Forbidden Response
export function forbiddenResponse(message: string = 'Forbidden') {
  return errorResponse(message, 403, 'FORBIDDEN');
}

// Already Exists Response
export function alreadyExistsResponse(resource: string = 'Resource') {
  return errorResponse(`${resource} already exists`, 409, 'CONFLICT');
}

// ApiResponse Helper
export const ApiResponse = {
  success: <T,>(data: T, status: number = 200, message: string = 'Success') => {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      } as ApiResponse<T>,
      { status }
    );
  },
  error: (
    message: string,
    status: number = 500,
    code: string = 'ERROR',
    error?: any
  ) => {
    return NextResponse.json(
      {
        success: false,
        message,
        code,
        ...(error && { error }),
      } as ApiResponse,
      { status }
    );
  },
};

// Central Error Handler
export function handleError(error: unknown): NextResponse {
  console.error('[API Error]', error);

  // Handle ApiError
  if (error instanceof ApiError) {
    return ApiResponse.error(
      error.message,
      error.status,
      error.code,
      error.details
    );
  }

  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const details = error.errors.reduce(
      (acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      },
      {} as Record<string, string>
    );

    return ApiResponse.error(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      details
    );
  }

  // Handle standard Error
  if (error instanceof Error) {
    return ApiResponse.error(
      error.message || 'Internal server error',
      500,
      'INTERNAL_ERROR'
    );
  }

  // Fallback
  return ApiResponse.error(
    'An unexpected error occurred',
    500,
    'UNKNOWN_ERROR'
  );
}
