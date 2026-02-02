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
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    if (!quantity || quantity < 1) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Quantity must be at least 1'
      );
    }

    const cartItem = await prisma.cart_items.findUnique({
      where: { id: parseInt(id) },
      include: {
        shopping_cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new ApiError('NOT_FOUND', 'Cart item not found', 404);
    }

    // Verify ownership
    if (cartItem.shopping_cart.user_id !== parseInt(userId)) {
      throw new ApiError('FORBIDDEN', 'Cannot access this cart', 403);
    }

    // Check stock
    if (cartItem.product.stock_quantity < quantity) {
      throw new ApiError(
        'INSUFFICIENT_STOCK',
        `Only ${cartItem.product.stock_quantity} items available`,
        400
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
      (sum, item) => sum + item.price_at_add * item.quantity,
      0
    );

    await prisma.shoppingCart.update({
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
      throw new ApiError('UNAUTHORIZED', 'User ID is required', 401);
    }

    const cartItem = await prisma.cart_items.findUnique({
      where: { id: parseInt(id) },
      include: { shopping_cart: true },
    });

    if (!cartItem) {
      throw new ApiError('NOT_FOUND', 'Cart item not found', 404);
    }

    // Verify ownership
    if (cartItem.shopping_cart.user_id !== parseInt(userId)) {
      throw new ApiError('FORBIDDEN', 'Cannot access this cart', 403);
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
      (sum, item) => sum + item.price_at_add * item.quantity,
      0
    );

    await prisma.shoppingCart.update({
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
