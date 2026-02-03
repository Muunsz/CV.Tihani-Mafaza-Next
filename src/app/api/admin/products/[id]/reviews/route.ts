import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';

/**
 * GET /api/products/[id]/reviews
 * Get product reviews
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const params_obj = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const skip = (params_obj.page - 1) * params_obj.limit;

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product) {
      throw new ApiError('NOT_FOUND', 'Product not found', 404);
    }

    const [reviews, total] = await Promise.all([
      prisma.product_reviews.findMany({
        where: {
          product_id: parseInt(params.id),
          is_approved: true,
        },
        skip,
        take: params_obj.limit,
        include: {
          users: {
            select: {
              id: true,
              full_name: true,
              profile_image_url: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.product_reviews.count({
        where: {
          product_id: parseInt(params.id),
          is_approved: true,
        },
      }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        data: reviews,
        pagination: {
          page: params_obj.page,
          limit: params_obj.limit,
          total,
          pages: Math.ceil(total / params_obj.limit),
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/products/[id]/reviews
 * Add review to product
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const { rating, title, review_text } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!rating || rating < 1 || rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }
    if (!title || title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    if (!review_text || review_text.length < 20) {
      errors.review_text = 'Review must be at least 20 characters';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError('VALIDATION_ERROR', 'Validation failed', 400, errors);
    }

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product) {
      throw new ApiError('NOT_FOUND', 'Product not found', 404);
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.product_reviews.findFirst({
      where: {
        product_id: parseInt(params.id),
        user_id: parseInt(userId),
      },
    });

    if (existingReview) {
      throw new ApiError(
        'CONFLICT',
        'You have already reviewed this product',
        409
      );
    }

    // Create review
    const review = await prisma.product_reviews.create({
      data: {
        product_id: parseInt(params.id),
        user_id: parseInt(userId),
        rating,
        title,
        review_text,
        is_verified_purchase: true, // Assume true if user is authenticated
      },
    });

    return NextResponse.json(ApiResponse.success(review, 201));
  } catch (error) {
    return handleError(error);
  }
}
