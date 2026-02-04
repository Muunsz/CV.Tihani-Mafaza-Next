import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * POST /api/faq/manage
 * Create or update FAQ (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'admin') {
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    const body = await request.json();
    const { id, category, question, answer, is_active, display_order } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!question || question.length < 5) {
      errors.question = 'Question must be at least 5 characters';
    }
    if (!answer || answer.length < 10) {
      errors.answer = 'Answer must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errors);
    }

    let faq;

    if (id) {
      // Update existing FAQ
      faq = await prisma.faq.update({
        where: { id },
        data: {
          question,
          answer,
          category: category || null,
          is_active: is_active !== undefined ? is_active : true,
          display_order: display_order || 0,
        },
      });
    } else {
      // Create new FAQ
      faq = await prisma.faq.create({
        data: {
          question,
          answer,
          category: category || null,
          is_active: is_active !== undefined ? is_active : true,
          display_order: display_order || 0,
        },
      });
    }

    return NextResponse.json(ApiResponse.success(faq, id ? 200 : 201));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/faq/manage
 * Delete FAQ (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const role = request.headers.get('x-user-role');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (role !== 'admin') {
      throw new ApiError(403, 'Admin access required', 'UNAUTHORIZED');
    }

    if (!id) {
      throw new ApiError(400, 'FAQ ID is required', 'VALIDATION_ERROR');
    }

    await prisma.faq.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'FAQ deleted successfully' })
    );
  } catch (error) {
    return handleError(error);
  }
}
