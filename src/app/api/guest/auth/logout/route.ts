import { NextRequest, NextResponse } from 'next/server';
import { auth, signOut } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('[LOGOUT_API] Logout request received');
    
    // Get current session
    const session = await auth();
    if (!session) {
      console.log('[LOGOUT_API] No active session');
      return NextResponse.json(
        { success: true, message: 'No active session' },
        { status: 200 }
      );
    }

    // Sign out user
    await signOut({
      redirect: false,
    });

    console.log('[LOGOUT_API] User signed out successfully');

    // Create response with cleared cookies
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear NextAuth cookies
    const isDev = process.env.NODE_ENV === 'development';
    const cookieNames = [
      isDev ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
      isDev ? 'next-auth.callback-url' : '__Secure-next-auth.callback-url',
      isDev ? 'next-auth.csrf-token' : '__Secure-next-auth.csrf-token',
    ];

    cookieNames.forEach((name) => {
      response.cookies.set(name, '', {
        maxAge: 0,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: !isDev,
      });
    });

    return response;
  } catch (error) {
    console.error('[LOGOUT_API] Error during logout:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
