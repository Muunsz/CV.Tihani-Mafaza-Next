import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { z } from 'zod';

// Validation schema
const validatePromoCodeSchema = z.object({
  code: z.string().min(3, 'Invalid promo code').toUpperCase(),
  cartTotal: z.number().positive('Cart total must be positive'),
});

export async function GET(request: NextRequest) {
  try {
    const promotions = await prisma.promotions.findMany({
      where: {
        is_active: true,
        valid_from: { lte: new Date() },
        valid_until: { gte: new Date() },
      },
      select: {
        id: true,
        code: true,
        description: true,
        discount_type: true,
        discount_value: true,
        min_purchase_amount: true,
        valid_until: true,
      },
    });

    return ApiResponse.success(promotions, 200, 'Promotions fetched');
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = validatePromoCodeSchema.parse(body);

    // Find promotion
    const promotion = await prisma.promotions.findUnique({
      where: { code: validatedData.code },
    });

    if (!promotion) {
      throw new ApiError(404, "Invalid promotion code", "CODE_NOT_FOUND");
    }

    if (!promotion.is_active) {
      throw new ApiError(400, "Promotion is not active", "CODE_INACTIVE");
    }

    // Check date validity
    const now = new Date();
    if (promotion.valid_from > now || promotion.valid_until < now) {
      throw new ApiError(400, "Promotion code is expired", "CODE_EXPIRED");
    }

    // Check usage limit
    if (
      promotion.usage_limit &&
      (promotion.usage_count || 0) >= promotion.usage_limit
    ) {
      throw new ApiError(400, "Promotion code has reached usage limit", "LIMIT_REACHED");
    }

    // Check minimum purchase
    if (
      promotion.min_purchase_amount &&
      validatedData.cartTotal < promotion.min_purchase_amount.toNumber()
    ) {
      throw new ApiError(
        400,
        `Minimum purchase ${promotion.min_purchase_amount} required`,
        'MIN_PURCHASE_NOT_MET'
      );
    }

    // Calculate discount
    let discountAmount = 0;
    if (promotion.discount_type === 'percentage') {
      discountAmount = (validatedData.cartTotal * promotion.discount_value.toNumber()) / 100;
      if (promotion.max_discount_amount) {
        discountAmount = Math.min(
          discountAmount,
          promotion.max_discount_amount.toNumber()
        );
      }
    } else {
      discountAmount = promotion.discount_value.toNumber();
    }

    return ApiResponse.success(
      {
        code: promotion.code,
        discountType: promotion.discount_type,
        discountValue: promotion.discount_value,
        discountAmount,
        finalTotal: validatedData.cartTotal - discountAmount,
      },
      200,
      'Promotion validated'
    );
  } catch (error) {
    return handleError(error);
  }
}

