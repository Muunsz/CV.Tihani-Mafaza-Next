import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code, purchase_amount } = await request.json();
    const userId = request.headers.get('x-user-id');

    if (!code) {
      return NextResponse.json(
        { error: { code: 'INVALID_CODE', message: 'Coupon code is required' } },
        { status: 400 }
      );
    }

    const promotion = await prisma.promotions.findUnique({
      where: { code },
    });

    if (!promotion) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Coupon not found' } },
        { status: 404 }
      );
    }

    const now = new Date();
    if (!promotion.is_active || promotion.valid_from > now || promotion.valid_until < now) {
      return NextResponse.json(
        { error: { code: 'EXPIRED', message: 'Coupon is not valid' } },
        { status: 400 }
      );
    }

    if (promotion.usage_limit && promotion.usage_count >= promotion.usage_limit) {
      return NextResponse.json(
        { error: { code: 'LIMIT_EXCEEDED', message: 'Coupon usage limit exceeded' } },
        { status: 400 }
      );
    }

    if (promotion.min_purchase_amount && purchase_amount < promotion.min_purchase_amount.toNumber()) {
      return NextResponse.json(
        { error: { code: 'MIN_PURCHASE', message: `Minimum purchase amount is ${promotion.min_purchase_amount}` } },
        { status: 400 }
      );
    }

    let discount = promotion.discount_value.toNumber();
    if (promotion.discount_type === 'percentage') {
      discount = (purchase_amount * discount) / 100;
      if (promotion.max_discount_amount) {
        discount = Math.min(discount, promotion.max_discount_amount.toNumber());
      }
    }

    return NextResponse.json({
      success: true,
      promotion: {
        code: promotion.code,
        discount_type: promotion.discount_type,
        discount_value: promotion.discount_value,
        discount_amount: discount,
        description: promotion.description,
      },
    });
  } catch (error) {
    console.error('[v0] Coupon verification error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to verify coupon' } },
      { status: 500 }
    );
  }
}
