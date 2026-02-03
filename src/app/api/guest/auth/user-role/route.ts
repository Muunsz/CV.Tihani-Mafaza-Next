import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user with role from database
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.full_name,
      role: user.roles.name,
      roleId: user.role_id,
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}