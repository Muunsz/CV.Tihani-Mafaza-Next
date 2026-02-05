import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * POST /api/support/tickets/[id]/close
 * Close support ticket (admin/staff or ticket owner)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const role = request.headers.get('x-user-role');
    const body = await request.json();
    const { feedback_rating, feedback_message } = body;

    // Get ticket
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(id) },
    });

    if (!ticket) {
      throw new ApiError(404, 'Ticket not found', 'NOT_FOUND');
    }

    // Check authorization
    if (
      role !== 'admin' &&
      role !== 'staff' &&
      ticket.user_id !== parseInt(userId || '0')
    ) {
      throw new ApiError(403, 'Cannot close this ticket', 'FORBIDDEN');
    }

    // Update ticket
    const closedTicket = await prisma.support_tickets.update({
      where: { id: parseInt(id) },
      data: {
        status: 'closed',
        closed_at: new Date(),
      },
    });

    // Store feedback if provided
    if (feedback_message) {
      await prisma.support_ticket_messages.create({
        data: {
          ticket_id: parseInt(id),
          user_id: parseInt(userId || '0'),
          message_text: `Feedback (Rating: ${feedback_rating || 'N/A'}): ${feedback_message}`,
          internal_note: false,
        },
      });
    }

    return NextResponse.json(
      ApiResponse.success({
        message: 'Ticket closed successfully',
        ticket: closedTicket,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
