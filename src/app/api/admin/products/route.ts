import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock_quantity: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
});

// Middleware-like check for admin role
async function verifyAdminAccess(userId: string | null) {
  if (!userId) {
    throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
  }

  const user = await prisma.users.findUnique({
    where: { id: parseInt(userId) },
    include: { roles: true },
  });

  if (!user || user.roles?.name !== 'admin') {
    throw new ApiError(403, "Forbidden - Admin access required", "FORBIDDEN");
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        include: {
          categories: true,
          product_images: {
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.products.count(),
    ]);

    return ApiResponse.success(
      {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      200
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    await verifyAdminAccess(userId);

    const body = await request.json();
    const { productId, ...updateData } = body;

    if (!productId) {
      throw new ApiError(400, "Product ID is required", "MISSING_ID");
    }

    const validatedData = updateProductSchema.parse(updateData);

    // Check stock doesn't exceed warehouse capacity
    if (
      validatedData.stock_quantity !== undefined &&
      validatedData.stock_quantity > 10000
    ) {
      throw new ApiError(400, "Stock quantity exceeds warehouse capacity", "INVALID_STOCK");
    }

    const product = await prisma.products.update({
      where: { id: productId },
      data: {
        ...validatedData,
        updated_at: new Date(),
      },
      include: {
        categories: true,
        product_images: true,
      },
    });

    return ApiResponse.success(product, 200, 'Product updated successfully');
  } catch (error) {
    return handleError(error);
  }
}

