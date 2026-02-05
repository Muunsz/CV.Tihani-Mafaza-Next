import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * POST /api/support/tickets/[id]/resolve
 * Resolve support ticket (admin/staff only)
 */
export async function POST(

  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const role = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');
    const body = await request.json();
    const { resolution_notes } = body;

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    // Get ticket
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(id) },
      include: { users_support_tickets_user_idTousers: true },
    });

    if (!ticket) {
      throw new ApiError(404, 'Ticket not found', 'NOT_FOUND');
    }

    // Update ticket
    const resolvedTicket = await prisma.support_tickets.update({
      where: { id: parseInt(id) },
      data: {
        status: 'resolved',
        resolved_at: new Date(),
      },
    });

    // Add resolution note as internal message
    if (resolution_notes) {
      await prisma.support_ticket_messages.create({
        data: {
          ticket_id: parseInt(id),
          user_id: parseInt(userId || '0'),
          message_text: `Resolution: ${resolution_notes}`,
          internal_note: true,
        },
      });
    }

    // Send notification to user
    if (ticket.user_id) {
      await prisma.notifications.create({
        data: {
          user_id: ticket.user_id,
          type: 'ticket_resolved',
          title: `Support Ticket Resolved: ${ticket.ticket_number}`,
          message: 'Your support ticket has been resolved. Thank you for your patience.',
          data: { ticket_id: ticket.id },
        },
      });
    }

    return NextResponse.json(
      ApiResponse.success({
        message: 'Ticket resolved successfully',
        ticket: resolvedTicket,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
