import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { productUpdateSchema } from '@/lib/validations';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return errorResponse('Invalid product ID', 400, 'INVALID_ID');
    }

    const product = await prisma.products.findUnique({
      where: { id: productId },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return notFoundResponse('Product');
    }

    return successResponse(product, 'Product retrieved successfully');
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return errorResponse('Invalid product ID', 400, 'INVALID_ID');
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400, 'INVALID_JSON');
    }

    // Validate update data
    const validationResult = productUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse('Validation failed', 400, 'VALIDATION_ERROR');
    }

    const data = validationResult.data;

    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return notFoundResponse('Product');
    }

    // If category_id is being updated, verify it exists
    if (data.category_id) {
      const category = await prisma.categories.findUnique({
        where: { id: data.category_id },
      });
      if (!category) {
        return errorResponse('Category not found', 404, 'NOT_FOUND');
      }
    }

    // Update product
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.sku && { sku: data.sku }),
        ...(data.price && { price: data.price }),
        ...(data.discount_percentage !== undefined && { discount_percentage: data.discount_percentage }),
        ...(data.stock_quantity !== undefined && { stock_quantity: data.stock_quantity }),
        ...(data.category_id && { category_id: data.category_id }),
        ...(data.is_featured !== undefined && { is_featured: data.is_featured }),
        ...(data.is_active !== undefined && { is_active: data.is_active }),
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return successResponse(updatedProduct, 'Product updated successfully');
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return errorResponse('Invalid product ID', 400, 'INVALID_ID');
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return notFoundResponse('Product');
    }

    // Soft delete by setting is_active to false
    const deletedProduct = await prisma.products.update({
      where: { id: productId },
      data: { is_active: false },
    });

    return successResponse(deletedProduct, 'Product deleted successfully');
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}
