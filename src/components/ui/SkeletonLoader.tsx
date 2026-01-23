/**
 * ============================================================================
 * SKELETON LOADERS
 * ============================================================================
 * 
 * Loading placeholders for better UX
 * Prevents content jumping
 * Shows users content is loading
 * 
 * ============================================================================
 */

interface SkeletonProps {
  className?: string;
}

/**
 * Base Skeleton
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-white/10 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton Card
 */
export function SkeletonCard() {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

/**
 * Skeleton Blog Post
 */
export function SkeletonBlogPost() {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
      {/* Icon */}
      <Skeleton className="h-12 w-12 rounded-full mb-4" />
      
      {/* Category */}
      <Skeleton className="h-4 w-24 mb-3" />
      
      {/* Title */}
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-4/5 mb-4" />
      
      {/* Meta */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

/**
 * Skeleton Service Card
 */
export function SkeletonServiceCard() {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
      {/* Icon */}
      <Skeleton className="h-16 w-16 rounded-xl mb-6" />
      
      {/* Badge */}
      <Skeleton className="h-5 w-20 rounded-lg mb-4" />
      
      {/* Title */}
      <Skeleton className="h-8 w-3/4 mb-3" />
      
      {/* Description */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/5 mb-6" />
      
      {/* Stats */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      {/* Button */}
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}

/**
 * Skeleton Table Row
 */
export function SkeletonTableRow() {
  return (
    <tr className="border-b border-white/10">
      <td className="p-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-20" />
      </td>
    </tr>
  );
}

/**
 * Skeleton Dashboard Stats
 */
export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Page
 */
export function SkeletonPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-40 mx-auto rounded-lg" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Text (for paragraphs)
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Image
 */
export function SkeletonImage({ 
  width = '100%', 
  height = '300px',
  className = ''
}: { 
  width?: string; 
  height?: string;
  className?: string;
}) {
  return (
    <Skeleton 
      className={`rounded-xl ${className}`}
      style={{ width, height }}
    />
  );
}

/**
 * Skeleton List
 */
export function SkeletonList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * // Simple skeleton
 * <Skeleton className="h-4 w-32" />
 * 
 * // Card skeleton
 * {loading ? <SkeletonCard /> : <Card data={data} />}
 * 
 * // Blog post skeleton
 * {loading ? <SkeletonBlogPost /> : <BlogPost post={post} />}
 * 
 * // Dashboard stats
 * {loading ? <SkeletonStats /> : <Stats data={stats} />}
 * 
 * // Full page skeleton
 * {loading ? <SkeletonPage /> : <PageContent />}
 */
