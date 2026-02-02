import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');

    if (!['admin', 'staff'].includes(userRole || '')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Only admins and staff can import products' } },
        { status: 403 }
      );
    }

    const { products } = await request.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: { code: 'INVALID_DATA', message: 'Products array is required' } },
        { status: 400 }
      );
    }

    const createdProducts = [];
    const errors = [];

    for (let i = 0; i < products.length; i++) {
      try {
        const product = products[i];

        const category = await prisma.categories.findFirst({
          where: { slug: product.category_slug },
        });

        if (!category) {
          errors.push({ index: i, message: `Category "${product.category_slug}" not found` });
          continue;
        }

        const created = await prisma.products.create({
          data: {
            category_id: category.id,
            name: product.name,
            slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
            description: product.description,
            detailed_description: product.detailed_description,
            price: product.price,
            cost_price: product.cost_price,
            discount_price: product.discount_price,
            discount_percentage: product.discount_percentage,
            stock_quantity: product.stock_quantity || 0,
            sku: product.sku,
            weight: product.weight,
            dimensions: product.dimensions,
            is_featured: product.is_featured || false,
            is_active: product.is_active !== false,
          },
        });

        createdProducts.push(created);
      } catch (error) {
        errors.push({ index: i, message: String(error) });
      }
    }

    return NextResponse.json({
      success: true,
      created: createdProducts.length,
      total: products.length,
      errors,
      products: createdProducts,
    });
  } catch (error) {
    console.error('[v0] Bulk import error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Failed to import products' } },
      { status: 500 }
    );
  }
}
