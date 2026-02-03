import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear auth cookies
    response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
    response.cookies.set('user_id', '', { maxAge: 0, path: '/' });
    response.cookies.set('user_role', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error) {
    console.error('[v0] Logout error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to logout' } },
      { status: 500 }
    );
  }
}
