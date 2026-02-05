import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse and validate query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const categoryId = searchParams.get('category_id');
    const isFeatured = searchParams.get('is_featured');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate pagination
    const paginationResult = paginationSchema.safeParse({ page, limit });
    if (!paginationResult.success) {
      return errorResponse(
        'Invalid pagination parameters',
        400,
        'VALIDATION_ERROR'
      );
    }

    const { page: validPage, limit: validLimit } = paginationResult.data;
    const skip = (validPage - 1) * validLimit;

    // Build where clause
    const where: { is_active: boolean; category_id?: number; is_featured?: boolean; OR?: { name?: { contains: string; mode: 'insensitive' }; description?: { contains: string; mode: 'insensitive' } }[] } = { is_active: true };

    if (categoryId) {
      where.category_id = parseInt(categoryId);
    }

    if (isFeatured === 'true') {
      where.is_featured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build order by
    const orderByMap: Record<string, Record<string, string>> = {
      name: { name: sortOrder },
      price: { price: sortOrder },
      created_at: { created_at: sortOrder },
      rating: { rating: sortOrder },
    };

    const orderBy = orderByMap[sortBy] || { created_at: sortOrder };

    // Get total count
    const total = await prisma.products.count({ where });

    // Get products
    const products = await prisma.products.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount_percentage: true,
        stock_quantity: true,
        is_featured: true,
        rating: true,
        review_count: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy,
      skip,
      take: validLimit,
    });

    return successResponse(
      {
        products,
        pagination: {
          page: validPage,
          limit: validLimit,
          total,
          totalPages: Math.ceil(total / validLimit),
        },
      },
      'Products retrieved successfully'
    );
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}
