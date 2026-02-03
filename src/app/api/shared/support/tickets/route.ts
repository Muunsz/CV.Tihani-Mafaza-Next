import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

const createTicketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['general', 'product', 'order', 'technical', 'billing']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

function generateTicketNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TKT-${timestamp}-${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const tickets = await prisma.support_tickets.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        support_messages: {
          select: {
            id: true,
            message_text: true,
            created_at: true,
          },
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return ApiResponse.success(tickets, 200);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const body = await request.json();
    const validatedData = createTicketSchema.parse(body);

    // Create ticket with first message
    const ticket = await prisma.support_tickets.create({
      data: {
        ticket_number: generateTicketNumber(),
        user_id: parseInt(userId),
        subject: validatedData.subject,
        category: validatedData.category,
        status: 'open',
        priority: 'medium',
        support_messages: {
          create: {
            user_id: parseInt(userId),
            message_text: validatedData.message,
          },
        },
      },
      include: {
        support_messages: true,
      },
    });

    return ApiResponse.success(ticket, 201, 'Ticket created successfully');
  } catch (error) {
    return handleError(error);
  }
}
