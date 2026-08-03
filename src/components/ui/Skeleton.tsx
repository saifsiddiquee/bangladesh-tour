import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'card';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  if (variant === 'image') {
    return <div className={cn('aspect-video w-full rounded-xl bg-gray-200 animate-shimmer', className)} />;
  }

  if (variant === 'card') {
    return (
      <div className={cn('bg-white rounded-2xl overflow-hidden shadow-card p-4 w-full', className)}>
        <div className="aspect-video w-full rounded-xl bg-gray-200 animate-shimmer mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-3/4 rounded bg-gray-200 animate-shimmer" />
          <div className="h-4 w-full rounded bg-gray-200 animate-shimmer" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-shimmer" />
        </div>
      </div>
    );
  }

  return <div className={cn('h-4 w-full rounded bg-gray-200 animate-shimmer', className)} />;
}
