import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse, handleError } from '@/lib/api/response';

/**
 * GET /api/products/filters
 * Get available product filters
 */
export async function GET(request: NextRequest) {
  try {
    // Get price range
    const priceStats = await prisma.products.aggregate({
      where: { is_active: true },
      _min: { price: true },
      _max: { price: true },
    });

    // Get categories
    const categories = await prisma.categories.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        _count: {
          select: { products: true },
        },
      },
    });

    // Get price buckets
    const priceBuckets = [
      { min: 0, max: 100000, label: 'Under 100K' },
      { min: 100000, max: 500000, label: '100K - 500K' },
      { min: 500000, max: 1000000, label: '500K - 1M' },
      { min: 1000000, max: 5000000, label: '1M - 5M' },
      { min: 5000000, max: null, label: 'Over 5M' },
    ];

    return NextResponse.json(
      ApiResponse.success({
        priceRange: {
          min: Number(priceStats._min.price) || 0,
          max: Number(priceStats._max.price) || 0,
          buckets: priceBuckets,
        },
        categories: categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          count: cat._count.products,
        })),
        sortOptions: [
          { value: 'name', label: 'Name (A-Z)' },
          { value: 'price', label: 'Price' },
          { value: 'created_at', label: 'Newest' },
          { value: 'rating', label: 'Rating' },
          { value: 'view_count', label: 'Popular' },
        ],
      })
    );
  } catch (error) {
    return handleError(error);
  }
}
