import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
// import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/faq
 * Get all FAQ items with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: { is_active: boolean, category?: string } = { is_active: true };
    if (category) {
      where.category = category;
    }

    // Get total count
    const total = await prisma.faq.count({ where });

    // Get paginated FAQ items
    const faqs = await prisma.faq.findMany({
      where,
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        view_count: true,
        helpful_count: true,
        unhelpful_count: true,
        display_order: true,
        created_at: true,
      },
      orderBy: [{ display_order: 'asc' }, { created_at: 'desc' }],
      skip,
      take: limit,
    });

    return NextResponse.json(
      ApiResponse.success(
        {
          data: faqs,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        }
      )
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/faq/categories
 * Get all FAQ categories
 */
export async function OPTIONS(_request: NextRequest) {
  try {
    const categories = await prisma.faq.findMany({
      where: { is_active: true },
      distinct: ['category'],
      select: { category: true },
    });

    const uniqueCategories = categories
      .map((item) => item.category)
      .filter(Boolean)
      .sort();

    return NextResponse.json(
      ApiResponse.success({
        categories: uniqueCategories,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
