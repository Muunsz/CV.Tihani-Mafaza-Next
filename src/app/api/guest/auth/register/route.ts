import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { registerSchema } from '@/lib/validations';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new ApiError('Email already registered', 409, 'EMAIL_EXISTS');
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 10);

    // Create user (default role: customer = 3)
    const user = await prisma.users.create({
      data: {
        email: validatedData.email,
        password_hash: hashedPassword,
        full_name: validatedData.fullName,
        phone_number: validatedData.phone,
        role_id: 3, // Customer
        email_verified: false,
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone_number: true,
        created_at: true,
      },
    });

    return ApiResponse.success(user, 201, 'Registration successful');
  } catch (error) {
    return handleError(error);
  }
}
