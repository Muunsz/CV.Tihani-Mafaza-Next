import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { registerSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

// Password hashing function using bcrypt
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

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
      throw new ApiError(409, 'Email already registered', 'EMAIL_EXISTS');
    }

    // Hash password
    const hashedPassword = hashPassword(validatedData.password);

    // Create user (default role: customer = 3)
    const user = await prisma.users.create({
      data: {
        email: validatedData.email,
        password_hash: hashedPassword,
        full_name: validatedData.fullName,
        phone_number: validatedData.phone_number,
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
