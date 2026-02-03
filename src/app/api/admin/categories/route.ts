import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { categoryCreateSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const includeInactive = request.nextUrl.searchParams.get('includeInactive') === 'true';

    const where = includeInactive ? {} : { is_active: true };

    const categories = await prisma.categories.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(categories, 'Categories retrieved successfully');
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON body', 400, 'INVALID_JSON');
    }

    const validationResult = categoryCreateSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse('Validation failed', 400, 'VALIDATION_ERROR');
    }

    const data = validationResult.data;

    // Generate slug if not provided
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Check if category with same slug exists
    const existingCategory = await prisma.categories.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return errorResponse('Category slug already exists', 409, 'CONFLICT');
    }

    const category = await prisma.categories.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        image_url: data.image_url,
        parent_category_id: data.parent_category_id,
        is_active: data.is_active !== false,
      },
    });

    return successResponse(category, 'Category created successfully', 201);
  } catch (error) {
    const { statusCode, message, code } = handleApiError(error);
    return errorResponse(message, statusCode, code);
  }
}
