import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * POST /api/support/tickets/[id]/assign
 * Assign ticket to staff member (admin/staff only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const role = request.headers.get('x-user-role');
    const body = await request.json();
    const { assigned_to, priority } = body;

    if (role !== 'admin' && role !== 'staff') {
      throw new ApiError(403, 'Admin or staff access required', 'UNAUTHORIZED');
    }

    // Get ticket
    const ticket = await prisma.support_tickets.findUnique({
      where: { id: parseInt(id) },
    });

    if (!ticket) {
      throw new ApiError(404, 'Ticket not found', 'NOT_FOUND');
    }

    // Verify assigned user is staff
    if (assigned_to) {
      const user = await prisma.users.findUnique({
        where: { id: assigned_to },
        include: { roles: true },
      });

      if (!user || (user.roles?.name !== 'staff' && user.roles?.name !== 'admin')) {
        throw new ApiError(400, 'User is not staff member', 'INVALID_REQUEST');
      }
    }

    // Update ticket
    const updatedTicket = await prisma.support_tickets.update({
      where: { id: parseInt(id) },
      data: {
        assigned_to: assigned_to || null,
        ...(priority && { priority }),
        status: 'in_progress',
      },
      include: {
        support_ticket_messages: true,
        users_support_tickets_assigned_toTousers: {
          select: { full_name: true, email: true },
        },
      },
    });

    // Send notification to assigned staff
    if (assigned_to) {
      await prisma.notifications.create({
        data: {
          user_id: assigned_to,
          type: 'ticket_assigned',
          title: `New Support Ticket Assigned: ${updatedTicket.ticket_number}`,
          message: updatedTicket.subject,
          data: { ticket_id: updatedTicket.id },
        },
      });
    }

    return NextResponse.json(ApiResponse.success(updatedTicket));
  } catch (error) {
    return handleError(error);
  }
}
