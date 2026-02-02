import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only admins can export users' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    const users = await prisma.users.findMany({
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (format === 'csv') {
      let csv = 'User ID,Email,Full Name,Phone,Role,Active,Created At\n';
      users.forEach((user) => {
        csv += `${user.id},"${user.email}","${user.full_name}","${user.phone_number || ''}","${user.roles?.name || 'user'}",${user.is_active},"${user.created_at}"\n`;
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="users.csv"',
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('[v0] Export users error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to export users' } },
      { status: 500 }
    );
  }
}
