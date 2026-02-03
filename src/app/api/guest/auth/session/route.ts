import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    // Get fresh user data from database
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
    });
  } catch (error) {
    console.error('[SESSION] Error fetching session:', error);
    return NextResponse.json(
      { user: null },
      { status: 200 }
    );
  }
}
