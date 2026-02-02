import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

const addMessageSchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(id) },
      include: {
        support_messages: {
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
        },
        users: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new ApiError('Ticket not found', 404, 'NOT_FOUND');
    }

    // Verify ownership
    if (ticket.user_id !== parseInt(userId)) {
      throw new ApiError('Forbidden', 403, 'FORBIDDEN');
    }

    return ApiResponse.success(ticket, 200);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    // Verify ticket exists and ownership
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(id) },
    });

    if (!ticket) {
      throw new ApiError('Ticket not found', 404, 'NOT_FOUND');
    }

    if (ticket.user_id !== parseInt(userId)) {
      throw new ApiError('Forbidden', 403, 'FORBIDDEN');
    }

    const body = await request.json();
    const validatedData = addMessageSchema.parse(body);

    // Add message
    const message = await prisma.support_messages.create({
      data: {
        ticket_id: parseInt(id),
        user_id: parseInt(userId),
        message_text: validatedData.message,
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

    return ApiResponse.success(message, 201, 'Message added successfully');
  } catch (error) {
    return handleError(error);
  }
}
