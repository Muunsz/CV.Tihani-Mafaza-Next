import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import bcrypt from 'bcryptjs';

/**
 * POST /api/users/change-password
 * Change user password
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    const { currentPassword, newPassword, confirmPassword } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!newPassword || newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR');
    }

    // Get current user
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
      select: { password_hash: true },
    });

    if (!user) {
      throw new ApiError(404, 'User not found', 'NOT_FOUND');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new ApiError(401, 'Current password is incorrect', 'INVALID_CREDENTIALS');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.users.update({
      where: { id: parseInt(userId) },
      data: { password_hash: hashedPassword },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'Password changed successfully' })
    );
  } catch (error) {
    return handleError(error);
  }
}
