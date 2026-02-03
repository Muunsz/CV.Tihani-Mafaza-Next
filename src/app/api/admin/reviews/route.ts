import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

// Validation schema
const getReviewsSchema = z.object({
  productId: z.string().optional(),
  page: z.string().transform(Number).optional().default('1'),
  limit: z.string().transform(Number).optional().default('10'),
});

const createReviewSchema = z.object({
  productId: z.number().int().positive('Product ID must be positive'),
  rating: z.number().int().min(1).max(5, 'Rating must be 1-5'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = getReviewsSchema.parse({
      productId: searchParams.get('productId'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const skip = (query.page - 1) * query.limit;

    let where: any = {};
    if (query.productId) {
      where.product_id = parseInt(query.productId);
    }

    const [reviews, total] = await Promise.all([
      prisma.product_reviews.findMany({
        where,
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
        skip,
        take: query.limit,
      }),
      prisma.product_reviews.count({ where }),
    ]);

    return ApiResponse.success(
      {
        reviews,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          pages: Math.ceil(total / query.limit),
        },
      },
      200
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const validatedData = createReviewSchema.parse(body);

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product) {
      throw new ApiError('Product not found', 404, 'NOT_FOUND');
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.product_reviews.findFirst({
      where: {
        product_id: validatedData.productId,
        user_id: parseInt(userId),
      },
    });

    if (existingReview) {
      throw new ApiError('You already reviewed this product', 409, 'DUPLICATE');
    }

    // Create review
    const review = await prisma.product_reviews.create({
      data: {
        product_id: validatedData.productId,
        user_id: parseInt(userId),
        rating: validatedData.rating,
        title: validatedData.title,
        comment: validatedData.comment,
      },
      include: {
        users: {
          select: {
            id: true,
            full_name: true,
            profile_image_url: true,
          },
        },
      },
    });

    return ApiResponse.success(review, 201, 'Review created successfully');
  } catch (error) {
    return handleError(error);
  }
}
