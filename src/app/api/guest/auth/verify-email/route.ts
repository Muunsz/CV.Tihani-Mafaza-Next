import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: { code: 'INVALID_TOKEN', message: 'Verification token is required' } },
        { status: 400 }
      );
    }

    // In a real app, verify the token with your email service
    // For now, we'll just mark the user as verified if they have the token
    const user = await prisma.users.findFirst({
      where: {
        email_verified: false,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found or already verified' } },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        email_verified: true,
        email_verified_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
      },
    });
  } catch (error) {
    console.error('[v0] Email verification error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to verify email' } },
      { status: 500 }
    );
  }
}
