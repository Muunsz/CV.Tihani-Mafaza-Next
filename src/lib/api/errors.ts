// Custom API Error Class
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string = 'INTERNAL_ERROR',
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Common Error Classes
export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(404, `${resource} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(403, message, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(409, `${resource} already exists`, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message, 'BAD_REQUEST');
    this.name = 'BadRequestError';
  }
}

// Error Handler Middleware
export function handleApiError(error: unknown) {
  console.error('[API Error]', error);

  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message || 'Internal server error',
      code: 'INTERNAL_ERROR',
    };
  }

  return {
    statusCode: 500,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  };
}
