import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

/**
 * GET /api/products/search
 * Search products
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const params = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    if (!query || query.length < 2) {
      throw new ApiError(
        400,
        'Search query must be at least 2 characters',
        'VALIDATION_ERROR'
      );
    }

    const skip = (params.page - 1) * params.limit;

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where: {
          is_active: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: params.limit,
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
        orderBy: [{ view_count: 'desc' }, { rating: 'desc' }],
      }),
      prisma.products.count({
        where: {
          is_active: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        query,
        data: products,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          pages: Math.ceil(total / params.limit),
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
