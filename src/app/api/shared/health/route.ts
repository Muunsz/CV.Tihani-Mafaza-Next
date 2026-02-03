import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    await prisma.users.count();

    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('[v0] Health check error:', error);
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: String(error),
      },
      { status: 503 }
    );
  }
}
