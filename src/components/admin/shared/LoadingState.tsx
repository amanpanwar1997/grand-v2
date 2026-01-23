/**
 * ============================================================================
 * LOADING STATE COMPONENTS
 * ============================================================================
 * 
 * Consistent loading states for admin panel
 */

import { Loader2 } from 'lucide-react';

/**
 * Full page loading spinner
 */
export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
        <p className="text-[15px] text-white/70">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Inline loading spinner
 */
export function InlineLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 text-white/70">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span className="text-[14px]">{message}</span>
    </div>
  );
}

/**
 * Button loading spinner
 */
export function ButtonLoading() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

/**
 * Skeleton loader for list items
 */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-white/10 rounded w-1/3"></div>
            <div className="h-8 bg-white/10 rounded w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for table
 */
export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="flex-1 h-5 bg-white/10 rounded animate-pulse"></div>
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-white/10 p-4 flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="flex-1 h-4 bg-white/10 rounded animate-pulse"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for cards grid
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-5/6"></div>
            <div className="h-4 bg-white/10 rounded w-2/3"></div>
          </div>
          <div className="mt-4 h-10 bg-white/10 rounded"></div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for form
 */
export function SkeletonForm() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-32 mb-2"></div>
          <div className="h-12 bg-white/10 rounded w-full"></div>
        </div>
      ))}
      <div className="flex gap-4">
        <div className="h-12 bg-white/10 rounded flex-1 animate-pulse"></div>
        <div className="h-12 bg-white/10 rounded w-24 animate-pulse"></div>
      </div>
    </div>
  );
}
