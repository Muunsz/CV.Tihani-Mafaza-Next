import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { paginationSchema } from '@/lib/validations';
import { Prisma } from '@prisma/client'; // Import Prisma

/**
 * GET /api/quotations
 * Get quotations
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const role = request.headers.get('x-user-role');
    const { searchParams } = new URL(request.url);

    const params = paginationSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    const skip = (params.page - 1) * params.limit;

    // Users can only see their own quotations, admin/staff can see all
    const where: { user_id?: number } = {};
    if (role !== 'admin' && role !== 'staff') {
      where.user_id = parseInt(userId || '0');
    }

    const [quotations, total] = await Promise.all([
      prisma.quotations.findMany({
        where,
        skip,
        take: params.limit,
        include: {
          users: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.quotations.count({ where }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        data: quotations,
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

/**
 * POST /api/quotations
 * Create quotation request
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    const {
      client_name,
      client_email,
      client_phone,
      items,
      notes,
    } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!client_name) {
      errors.client_name = 'Client name is required';
    }
    if (!client_email) {
      errors.client_email = 'Client email is required';
    }
    if (!Array.isArray(items) || items.length === 0) {
      errors.items = 'At least one item is required';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errors);
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      if (!item.product_id || !item.quantity) {
        throw new ApiError(
          400,
          'Each item must have product_id and quantity',
          'VALIDATION_ERROR'
        );
      }

      const product = await prisma.products.findUnique({
        where: { id: item.product_id },
        select: { price: true },
      });

      if (!product) {
        throw new ApiError(
          404,
          `Product ${item.product_id} not found`,
          'NOT_FOUND'
        );
      }

      totalAmount += Number(product.price) * item.quantity;
    }

    // Generate quotation number
    const quotationNumber = `QT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Create quotation
    const quotation = await prisma.quotations.create({
      data: {
        quotation_number: quotationNumber,
        user_id: userId ? parseInt(userId) : null,
        client_name,
        client_email,
        client_phone: client_phone || null,
        items: items, // Store as JSON
        total_amount: new Prisma.Decimal(totalAmount),
        notes: notes || null,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return NextResponse.json(ApiResponse.success(quotation, 201));
  } catch (error) {
    return handleError(error);
  }
}
