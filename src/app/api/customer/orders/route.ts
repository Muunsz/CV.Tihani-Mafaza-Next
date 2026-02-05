import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';

/**
 * GET /api/orders
 * Get user's orders with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    // Build where clause
    const where: { user_id: number; order_status?: string } = { user_id: parseInt(userId) };
    if (status) {
      where.order_status = status;
    }

    // Get total count
    const total = await prisma.orders.count({ where });

    // Get paginated orders
    const orders = await prisma.orders.findMany({
      where,
      select: {
        id: true,
        order_number: true,
        total_amount: true,
        order_status: true,
        payment_status: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    });

    return NextResponse.json(
      ApiResponse.success({
        data: orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/orders
 * Create new order from cart
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      throw new ApiError(401, 'User ID is required', 'UNAUTHORIZED');
    }

    const {
      shipping_address_id,
      shipping_method,
      // notes removed if not used
    } = body;

    // Validate required fields
    if (!shipping_address_id) {
      throw new ApiError(
        400,
        'Shipping address is required',
        'VALIDATION_ERROR'
      );
    }

    if (!shipping_method) {
      throw new ApiError(
        400,
        'Shipping method is required',
        'VALIDATION_ERROR'
      );
    }

    // Verify address belongs to user
    const address = await prisma.user_addresses.findUnique({
      where: { id: parseInt(shipping_address_id) },
    });

    if (!address || address.user_id !== parseInt(userId)) {
      throw new ApiError(403, 'Invalid shipping address', 'FORBIDDEN');
    }

    // Get user's cart
    const cart = await prisma.shopping_carts.findFirst({
      where: { user_id: parseInt(userId) },
      include: { cart_items: true },
    });

    if (!cart || cart.cart_items.length === 0) {
      throw new ApiError(400, 'Cart is empty', 'VALIDATION_ERROR');
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items in transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.orders.create({
        data: {
          order_number: orderNumber,
          user_id: parseInt(userId),
          subtotal: cart.total_price ?? 0,
          total_amount: cart.total_price ?? 0,
          shipping_address_id: parseInt(shipping_address_id),
          shipping_method,
          order_status: 'pending',
          payment_status: 'unpaid',
        },
      });

      // Create order items from cart
      for (const item of cart.cart_items) {
        await tx.order_items.create({
          data: {
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.price_at_add,
            total_price: item.price_at_add.toNumber() * item.quantity,
          },
        });
      }

      // Clear cart
      await tx.cart_items.deleteMany({
        where: { cart_id: cart.id },
      });

      await tx.shopping_carts.update({
        where: { id: cart.id },
        data: { total_price: 0 },
      });

      return newOrder;
    });

    return NextResponse.json(
      ApiResponse.success(
        {
          id: order.id,
          order_number: order.order_number,
          total_amount: order.total_amount,
          order_status: order.order_status,
          payment_status: order.payment_status,
          created_at: order.created_at,
        },
        201
      ),
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
