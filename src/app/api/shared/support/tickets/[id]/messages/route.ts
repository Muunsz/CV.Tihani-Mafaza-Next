import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/support/tickets/[id]/messages
 * Get ticket messages
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    // Get ticket
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!ticket) {
      throw new ApiError('NOT_FOUND', 'Ticket not found', 404);
    }

    // Verify user has access
    if (ticket.user_id !== parseInt(userId || '0')) {
      const role = request.headers.get('x-user-role');
      if (role !== 'admin' && role !== 'staff') {
        throw new ApiError('FORBIDDEN', 'Access denied', 403);
      }
    }

    const messages = await prisma.support_ticket_messages.findMany({
      where: { ticket_id: parseInt(params.id) },
      include: {
        users: {
          select: {
            id: true,
            full_name: true,
            profile_image_url: true,
          },
        },
      },
      orderBy: { created_at: 'asc' },
    });

    return NextResponse.json(ApiResponse.success(messages));
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/support/tickets/[id]/messages
 * Add message to ticket
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const { message_text, attachment_url, internal_note } = body;

    if (!message_text) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Message text is required',
        400
      );
    }

    // Get ticket
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!ticket) {
      throw new ApiError('NOT_FOUND', 'Ticket not found', 404);
    }

    // Verify user has access
    if (ticket.user_id !== parseInt(userId)) {
      const role = request.headers.get('x-user-role');
      if (role !== 'admin' && role !== 'staff') {
        throw new ApiError('FORBIDDEN', 'Access denied', 403);
      }
    }

    // Create message
    const message = await prisma.support_ticket_messages.create({
      data: {
        ticket_id: parseInt(params.id),
        user_id: parseInt(userId),
        message_text,
        attachment_url: attachment_url || null,
        internal_note: internal_note || false,
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

    return NextResponse.json(ApiResponse.success(message, 201));
  } catch (error) {
    return handleError(error);
  }
}
