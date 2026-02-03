import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/products/recommendations
 * Get recommended products
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);

    // Get current product
    let product;
    if (productId) {
      product = await prisma.products.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        throw new ApiError('NOT_FOUND', 'Product not found', 404);
      }
    }

    // Get recommendations based on category or popular products
    const recommendations = await prisma.products.findMany({
      where: {
        is_active: true,
        ...(product && { category_id: product.category_id }),
        ...(productId && { NOT: { id: parseInt(productId) } }),
      },
      take: limit,
      include: {
        product_images: {
          where: { is_primary: true },
          select: { image_url: true },
          take: 1,
        },
        categories: {
          select: { id: true, name: true },
        },
      },
      orderBy: [{ rating: 'desc' }, { view_count: 'desc' }],
    });

    return NextResponse.json(ApiResponse.success(recommendations));
  } catch (error) {
    return handleError(error);
  }
}
