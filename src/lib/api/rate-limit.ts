import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Simple in-memory rate limiter
 * In production, use Redis or similar
 */
export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60 * 1000 // 1 minute
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `rate-limit:${identifier}`;

  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: limit - 1, resetTime: store[key].resetTime };
  }

  const entry = store[key];

  if (now > entry.resetTime) {
    // Window has expired, reset
    entry.count = 1;
    entry.resetTime = now + windowMs;
    return { success: true, remaining: limit - 1, resetTime: entry.resetTime };
  }

  entry.count++;

  if (entry.count > limit) {
    return { success: false, remaining: 0, resetTime: entry.resetTime };
  }

  return { success: true, remaining: limit - entry.count, resetTime: entry.resetTime };
}

/**
 * Middleware to apply rate limiting
 */
export function withRateLimit(
  limit: number = 100,
  windowMs: number = 60 * 1000
) {
  return (handler: Function) => {
    return async (request: NextRequest, ...args: any[]) => {
      const userId = request.headers.get('x-user-id');
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      const identifier = userId || ip;

      const result = rateLimit(identifier, limit, windowMs);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: 'Rate limit exceeded',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
          },
          { status: 429 }
        );
      }

      const response = await handler(request, ...args);

      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', String(limit));
      response.headers.set('X-RateLimit-Remaining', String(result.remaining));
      response.headers.set('X-RateLimit-Reset', String(result.resetTime));

      return response;
    };
  };
}
