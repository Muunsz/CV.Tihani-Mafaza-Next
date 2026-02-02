import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { Prisma } from '@prisma/client';

/**
 * POST /api/products/bulk
 * Bulk operations on products (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin') {
      throw new ApiError('UNAUTHORIZED', 'Admin access required', 403);
    }

    const body = await request.json();
    const { action, product_ids, data } = body;

    if (!action || !product_ids || !Array.isArray(product_ids)) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'action and product_ids array are required',
        400
      );
    }

    let result;

    switch (action) {
      case 'activate':
        result = await prisma.products.updateMany({
          where: { id: { in: product_ids } },
          data: { is_active: true },
        });
        break;

      case 'deactivate':
        result = await prisma.products.updateMany({
          where: { id: { in: product_ids } },
          data: { is_active: false },
        });
        break;

      case 'feature':
        result = await prisma.products.updateMany({
          where: { id: { in: product_ids } },
          data: { is_featured: true },
        });
        break;

      case 'unfeature':
        result = await prisma.products.updateMany({
          where: { id: { in: product_ids } },
          data: { is_featured: false },
        });
        break;

      case 'update-price':
        if (!data?.price) {
          throw new ApiError(
            'VALIDATION_ERROR',
            'price is required for update-price action',
            400
          );
        }
        result = await prisma.products.updateMany({
          where: { id: { in: product_ids } },
          data: { price: new Prisma.Decimal(data.price) },
        });
        break;

      case 'update-stock':
        if (data?.quantity_change === undefined) {
          throw new ApiError(
            'VALIDATION_ERROR',
            'quantity_change is required for update-stock action',
            400
          );
        }
        // Update each product individually to track changes
        const updates = await Promise.all(
          product_ids.map(async (id) => {
            const product = await prisma.products.findUnique({
              where: { id },
              select: { stock_quantity: true },
            });

            if (!product) return null;

            const newStock = (product.stock_quantity || 0) + data.quantity_change;

            if (newStock < 0) {
              throw new ApiError(
                'INVALID_REQUEST',
                `Cannot reduce stock below 0 for product ${id}`,
                400
              );
            }

            return prisma.products.update({
              where: { id },
              data: { stock_quantity: newStock },
            });
          })
        );
        result = { count: updates.length };
        break;

      case 'delete':
        result = await prisma.products.deleteMany({
          where: { id: { in: product_ids } },
        });
        break;

      default:
        throw new ApiError(
          'INVALID_REQUEST',
          `Unknown action: ${action}`,
          400
        );
    }

    return NextResponse.json(
      ApiResponse.success({
        action,
        affected: result.count || 0,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
