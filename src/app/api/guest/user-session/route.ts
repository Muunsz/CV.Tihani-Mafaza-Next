import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/guest/user-session
 * Returns the current user session with role information
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    // Get fresh user data from database with role
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: { roles: true },
    });

    if (!user) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.full_name,
        role: user.roles?.name || 'guest',
        avatar: user.avatar_url,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('[USER_SESSION] Error fetching session:', error);
    return NextResponse.json(
      { user: null, error: 'Failed to fetch session' },
      { status: 200 }
    );
  }
}
