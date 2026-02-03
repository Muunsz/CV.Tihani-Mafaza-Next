'use client';

import React from 'react';
import { Skeleton, Card, CardBody } from '@heroui/react';

export function ProductCardSkeleton() {
  return (
    <Card className="w-full">
      <CardBody className="gap-3 p-0">
        <Skeleton className="w-full h-48 rounded-lg" />
        <div className="px-3 py-2 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-6 w-2/3 rounded-lg" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 flex-1 rounded-lg" />
            <Skeleton className="h-8 w-12 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image */}
      <div className="space-y-4">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-full rounded-lg" />
          <Skeleton className="h-6 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex gap-3 p-3 border-b border-gray-200">
      {[...Array(columns)].map((_, i) => (
        <Skeleton key={i} className="h-6 flex-1 rounded-lg" />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <Card>
      <CardBody className="gap-0 p-0">
        {/* Header */}
        <div className="flex gap-3 p-3 bg-gray-50 border-b border-gray-200">
          {[...Array(columns)].map((_, i) => (
            <Skeleton key={i} className="h-6 flex-1 rounded-lg" />
          ))}
        </div>
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </CardBody>
    </Card>
  );
}

export function UserProfileSkeleton() {
  return (
    <Card>
      <CardBody className="gap-4 p-6">
        {/* Avatar and Name */}
        <div className="flex gap-4 items-center">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 pt-4 border-t">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/4 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(fields)].map((_, i) => (
        <FormFieldSkeleton key={i} />
      ))}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
