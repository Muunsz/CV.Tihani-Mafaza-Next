import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      user_id, // nullable for guest
      product_name,
      description,
      requested_quantity,
      notes
    } = data;

    const request = await prisma.product_requests.create({
      data: {
        user_id: user_id ?? 1, // fallback to 1 (admin/guest) if not provided
        product_name,
        description,
        requested_quantity,
        notes
      }
    });
    return NextResponse.json({ success: true, request });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : error });
  }
}
