import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/response';
import { ApiError, handleApiError, ValidationError } from '@/lib/api/errors';
import { productCreateSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400, 'INVALID_JSON');
    }

    // Validate request body
    const validationResult = productCreateSchema.safeParse(body);
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return errorResponse('Validation failed', 400, 'VALIDATION_ERROR');
    }

    const data = validationResult.data;

    // Check if category exists
    const category = await prisma.categories.findUnique({
      where: { id: data.category_id },
    });

    if (!category) {
      return errorResponse('Category not found', 404, 'NOT_FOUND');
    }

    // Create product
    const product = await prisma.products.create({
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku || `SKU-${Date.now()}`,
        price: data.price,
        discount_percentage: data.discount_percentage || 0,
        stock_quantity: data.stock_quantity || 0,
        category_id: data.category_id,
        is_featured: data.is_featured || false,
        is_active: data.is_active !== false,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return successResponse(
      product,
      'Product created successfully',
      201
    );
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}
