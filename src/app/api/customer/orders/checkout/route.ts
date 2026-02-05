import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';
import { ApiError } from '@/lib/api/errors';
import { Prisma } from '@prisma/client';

/**
 * POST /api/orders/checkout
 * Create order from cart
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    const {
      cart_id,
      shipping_address_id,
      shipping_method,
      coupon_code,
      customer_notes,
    } = body;

    // Validate input
    const errors: Record<string, string> = {};
    if (!cart_id) {
      errors.cart_id = 'Cart ID is required';
    }
    if (!shipping_address_id) {
      errors.shipping_address_id = 'Shipping address is required';
    }
    if (!shipping_method) {
      errors.shipping_method = 'Shipping method is required';
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errors);
    }

    // Get cart with items
    const cart = await prisma.shopping_carts.findUnique({
      where: { id: cart_id },
      include: {
        cart_items: {
          include: { products: true },
        },
      },
    });

    if (!cart || cart.cart_items.length === 0) {
      throw new ApiError(400, 'Cart is empty', 'NOT_FOUND');
    }

    // Verify shipping address
    const address = await prisma.user_addresses.findUnique({
      where: { id: shipping_address_id },
    });

    if (!address) {
      throw new ApiError(404, 'Shipping address not found', 'NOT_FOUND');
    }

    // Calculate totals
    let subtotal = 0;
    cart.cart_items.forEach((item) => {
      subtotal += Number(item.price_at_add) * item.quantity;
    });

    // Apply coupon if provided
    let discount = 0;
    if (coupon_code) {
      const coupon = await prisma.promotions.findUnique({
        where: { code: coupon_code },
      });

      if (coupon && coupon.is_active) {
        if (coupon.discount_type === 'percentage') {
          discount = (subtotal * Number(coupon.discount_value)) / 100;
          if (coupon.max_discount_amount) {
            discount = Math.min(discount, Number(coupon.max_discount_amount));
          }
        } else {
          discount = Number(coupon.discount_value);
        }
      }
    }

    // Calculate final total
    const shippingCost = 50000; // 50k default
    const taxAmount = (subtotal - discount) * 0.1; // 10% tax
    const total = subtotal + shippingCost + taxAmount - discount;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Create order
    const order = await prisma.orders.create({
      data: {
        order_number: orderNumber,
        user_id: userId ? parseInt(userId) : null,
        subtotal: new Prisma.Decimal(subtotal),
        shipping_cost: new Prisma.Decimal(shippingCost),
        tax_amount: new Prisma.Decimal(taxAmount),
        discount_amount: new Prisma.Decimal(discount),
        total_amount: new Prisma.Decimal(total),
        shipping_address_id,
        shipping_method,
        customer_notes: customer_notes || null,
        order_items: {
          create: cart.cart_items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.price_at_add,
            total_price: new Prisma.Decimal(
              Number(item.price_at_add) * item.quantity
            ),
          })),
        },
      },
      include: {
        order_items: {
          include: { products: true },
        },
      },
    });

    // Clear cart
    await prisma.cart_items.deleteMany({
      where: { cart_id },
    });

    return NextResponse.json(ApiResponse.success(order, 201));
  } catch (error) {
    return handleError(error);
  }
}
