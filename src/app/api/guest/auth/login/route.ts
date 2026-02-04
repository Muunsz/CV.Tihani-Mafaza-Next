import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { loginSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email: validatedData.email },
      include: { roles: true },
    });

    if (!user) {
      throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new ApiError(403, 'Account is inactive', 'ACCOUNT_INACTIVE');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
    }

    // Update last login
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    // Return user data without password
    const { password_hash, ...userWithoutPassword } = user;

    return ApiResponse.success(
      {
        ...userWithoutPassword,
        role: user.roles?.name,
      },
      200,
      'Login successful'
    );
  } catch (error) {
    return handleError(error);
  }
}
