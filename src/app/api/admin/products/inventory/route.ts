import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/products/inventory
 * Get inventory for products
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    if (!productId) {
      throw new ApiError(400, 'Product ID is required', 'VALIDATION_ERROR');
    }

    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
      select: {
        id: true,
        name: true,
        stock_quantity: true,
        inventory_logs: {
          take: 20,
          orderBy: { created_at: 'desc' },
          include: {
            users: {
              select: {
                id: true,
                full_name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found', 'NOT_FOUND');
    }

    return NextResponse.json(ApiResponse.success(product));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/products/inventory
 * Update product inventory (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    const { product_id, quantity_change, reason, reference_id, notes } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!product_id) {
      errors.product_id = 'Product ID is required';
    }
    if (!quantity_change) {
      errors.quantity_change = 'Quantity change is required';
    }
    if (!reason) {
      errors.reason = 'Reason is required';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR');
    }

    // Update product stock
    const product = await prisma.products.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found', 'NOT_FOUND');
    }

    const newStock = (product.stock_quantity || 0) + quantity_change;

    if (newStock < 0) {
      throw new ApiError(
        400,
        'Insufficient stock for this operation',
        'INVALID_REQUEST'
      );
    }

    // Create inventory log and update product
    const [log, updatedProduct] = await Promise.all([
      prisma.inventory_logs.create({
        data: {
          product_id,
          quantity_change,
          reason,
          reference_id: reference_id || null,
          notes: notes || null,
          changed_by: parseInt(userId || '0'),
        },
      }),
      prisma.products.update({
        where: { id: product_id },
        data: { stock_quantity: newStock },
        select: {
          id: true,
          name: true,
          stock_quantity: true,
        },
      }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        log,
        product: updatedProduct,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
