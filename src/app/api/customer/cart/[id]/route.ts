import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * PUT /api/cart/items/[id]
 * Update cart item quantity
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');
    const body = await request.json();
    const { quantity } = body;

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    if (!quantity || quantity < 1) {
      throw new ApiError(400, 'Quantity must be at least 1', 'VALIDATION_ERROR');
    }

    const cartItem = await prisma.cart_items.findUnique({
      where: { id: parseInt(id) },
      include: {
        shopping_carts: true,
        products: true,
      },
    });

    if (!cartItem) {
      throw new ApiError(404, 'Cart item not found', 'NOT_FOUND');
    }

    // Verify ownership
    if (cartItem.shopping_carts.user_id !== parseInt(userId)) {
      throw new ApiError(403, 'Cannot access this cart', 'FORBIDDEN');
    }

    // Check stock
    if ((cartItem.products.stock_quantity || 0) < quantity) {
      throw new ApiError(
        400,
        `Only ${cartItem.products.stock_quantity || 0} items available`,
        'INSUFFICIENT_STOCK'
      );
    }

    // Update quantity
    await prisma.cart_items.update({
      where: { id: parseInt(id) },
      data: { quantity },
    });

    // Recalculate cart total
    const items = await prisma.cart_items.findMany({
      where: { cart_id: cartItem.cart_id },
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price_at_add.toNumber() * item.quantity,
      0
    );

    await prisma.shopping_carts.update({
      where: { id: cartItem.cart_id },
      data: { total_price: totalPrice },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'Cart item updated' })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/cart/items/[id]
 * Remove item from cart
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    const cartItem = await prisma.cart_items.findUnique({
      where: { id: parseInt(id) },
      include: { shopping_carts: true },
    });

    if (!cartItem) {
      throw new ApiError(404, 'Cart item not found', 'NOT_FOUND');
    }

    // Verify ownership
    if (cartItem.shopping_carts.user_id !== parseInt(userId)) {
      throw new ApiError(403, 'Cannot access this cart', 'FORBIDDEN');
    }

    // Delete item
    await prisma.cart_items.delete({
      where: { id: parseInt(id) },
    });

    // Recalculate total
    const items = await prisma.cart_items.findMany({
      where: { cart_id: cartItem.cart_id },
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price_at_add.toNumber() * item.quantity,
      0
    );

    await prisma.shopping_carts.update({
      where: { id: cartItem.cart_id },
      data: { total_price: totalPrice },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'Item removed from cart' })
    );
  } catch (error) {
    return handleError(error);
  }
}
