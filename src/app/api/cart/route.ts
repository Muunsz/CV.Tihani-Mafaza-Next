import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/cart
 * Get shopping cart for user or session
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const sessionId = request.headers.get('x-session-id');

    if (!userId && !sessionId) {
      throw new ApiError(
        'UNAUTHORIZED',
        'User ID or Session ID is required',
        401
      );
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: userId ? { user_id: parseInt(userId) } : { session_id: sessionId },
      include: {
        cart_items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                discount_percentage: true,
                image_url: true,
                stock_quantity: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        ApiResponse.success({
          id: null,
          total_price: 0,
          cart_items: [],
        })
      );
    }

    // Format cart items dengan harga final
    const formattedItems = cart.cart_items.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_add: item.price_at_add,
      subtotal: item.quantity * item.price_at_add,
      product: item.product,
    }));

    return NextResponse.json(
      ApiResponse.success({
        id: cart.id,
        total_price: cart.total_price,
        cart_items: formattedItems,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const sessionId = request.headers.get('x-session-id');
    const body = await request.json();

    const { product_id, quantity } = body;

    if (!product_id || !quantity) {
      throw new ApiError(
        'VALIDATION_ERROR',
        'Product ID and quantity are required'
      );
    }

    if (!userId && !sessionId) {
      throw new ApiError(
        'UNAUTHORIZED',
        'User ID or Session ID is required',
        401
      );
    }

    // Get product to verify it exists and get price
    const product = await prisma.products.findUnique({
      where: { id: parseInt(product_id) },
    });

    if (!product) {
      throw new ApiError('NOT_FOUND', 'Product not found', 404);
    }

    if (product.stock_quantity < quantity) {
      throw new ApiError(
        'INSUFFICIENT_STOCK',
        `Only ${product.stock_quantity} items available`,
        400
      );
    }

    // Get or create cart
    let cart = await prisma.shoppingCart.findFirst({
      where: userId ? { user_id: parseInt(userId) } : { session_id: sessionId },
    });

    if (!cart) {
      cart = await prisma.shoppingCart.create({
        data: {
          user_id: userId ? parseInt(userId) : null,
          session_id: sessionId,
          total_price: 0,
        },
      });
    }

    // Check if product already in cart
    const existingItem = await prisma.cart_items.findFirst({
      where: {
        cart_id: cart.id,
        product_id: parseInt(product_id),
      },
    });

    if (existingItem) {
      // Update quantity
      await prisma.cart_items.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // Create new cart item
      await prisma.cart_items.create({
        data: {
          cart_id: cart.id,
          product_id: parseInt(product_id),
          quantity,
          price_at_add: product.price,
        },
      });
    }

    // Recalculate total price
    const items = await prisma.cart_items.findMany({
      where: { cart_id: cart.id },
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price_at_add * item.quantity,
      0
    );

    await prisma.shoppingCart.update({
      where: { id: cart.id },
      data: { total_price: totalPrice },
    });

    return NextResponse.json(
      ApiResponse.success({ message: 'Item added to cart' }, 201),
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
