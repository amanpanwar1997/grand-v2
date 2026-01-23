/**
 * IMAGE OPTIMIZATION UTILITIES
 * 
 * Features:
 * - WebP conversion support
 * - Blur placeholder generation
 * - Progressive loading
 * - Responsive image srcset
 * - Lazy loading helpers
 */

// ============================================================================
// IMAGE FORMATS & SIZES
// ============================================================================

export const IMAGE_FORMATS = {
  WEBP: 'webp',
  JPEG: 'jpeg',
  PNG: 'png',
  AVIF: 'avif'
} as const;

export const IMAGE_SIZES = {
  THUMBNAIL: 150,
  SMALL: 320,
  MEDIUM: 640,
  LARGE: 1024,
  XLARGE: 1920,
  FULL: 2560
} as const;

// ============================================================================
// BLUR PLACEHOLDER GENERATOR
// ============================================================================

/**
 * Generate a blur placeholder data URL for images
 * Use while image is loading for better perceived performance
 */
export function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  // Create a tiny base64 encoded SVG with blur effect
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="100%" height="100%" fill="#0a0a0a" filter="url(#blur)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate a gradient placeholder
 */
export function generateGradientPlaceholder(color1: string = '#0a0a0a', color2: string = '#1a1a1a'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// ============================================================================
// IMAGE URL BUILDERS
// ============================================================================

/**
 * Build Unsplash optimized image URL
 */
export function buildUnsplashUrl(
  imageId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'auto';
    fit?: 'crop' | 'fill' | 'scale';
  } = {}
): string {
  const {
    width = 1200,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options;

  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
    fm: format,
    fit
  });

  if (height) {
    params.append('h', height.toString());
  }

  return `https://images.unsplash.com/${imageId}?${params.toString()}`;
}

/**
 * Build responsive srcset for images
 */
export function buildSrcSet(
  baseUrl: string,
  sizes: number[] = [320, 640, 1024, 1920]
): string {
  return sizes
    .map(size => {
      const url = baseUrl.includes('?')
        ? `${baseUrl}&w=${size}`
        : `${baseUrl}?w=${size}`;
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Build sizes attribute for responsive images
 */
export function buildSizesAttr(
  breakpoints: { maxWidth: string; size: string }[] = [
    { maxWidth: '768px', size: '100vw' },
    { maxWidth: '1024px', size: '50vw' },
    { maxWidth: '1920px', size: '33vw' }
  ]
): string {
  return breakpoints
    .map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`)
    .join(', ');
}

// ============================================================================
// LAZY LOADING HELPERS
// ============================================================================

/**
 * Check if browser supports native lazy loading
 */
export function supportsNativeLazyLoading(): boolean {
  return 'loading' in HTMLImageElement.prototype;
}

/**
 * Intersection Observer for custom lazy loading
 */
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Start loading 50px before entering viewport
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

// ============================================================================
// IMAGE PRELOADING
// ============================================================================

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(urls: string[]): Promise<void> {
  await Promise.all(urls.map(url => preloadImage(url)));
}

// ============================================================================
// IMAGE COMPONENT PROPS GENERATOR
// ============================================================================

/**
 * Generate optimized image props for React components
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  options: {
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    sizes?: string;
  } = {}
): {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync';
  placeholder?: string;
  width?: number;
  height?: number;
} {
  const {
    width = 1200,
    height,
    priority = false,
    quality = 80,
    sizes
  } = options;

  const props: ReturnType<typeof getOptimizedImageProps> = {
    src,
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    placeholder: generateBlurPlaceholder()
  };

  // Add responsive srcset for Unsplash images
  if (src.includes('unsplash.com')) {
    props.srcSet = buildSrcSet(src);
    props.sizes = sizes || buildSizesAttr();
  }

  if (width) props.width = width;
  if (height) props.height = height;

  return props;
}

// ============================================================================
// CDN URL BUILDERS
// ============================================================================

/**
 * Build Cloudflare Images URL (if using Cloudflare)
 */
export function buildCloudflareImageUrl(
  imageId: string,
  variant: 'public' | 'thumbnail' | 'hero' = 'public'
): string {
  // Replace with your Cloudflare Images account hash
  const accountHash = 'YOUR_CLOUDFLARE_ACCOUNT_HASH';
  return `https://imagedelivery.net/${accountHash}/${imageId}/${variant}`;
}

/**
 * Build imgix URL (if using imgix CDN)
 */
export function buildImgixUrl(
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    fit?: 'crop' | 'fill' | 'scale';
    auto?: string;
  } = {}
): string {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop',
    auto = 'compress,format'
  } = options;

  // Replace with your imgix domain
  const domain = 'your-domain.imgix.net';
  
  const params = new URLSearchParams({
    auto,
    fm: format,
    q: quality.toString(),
    fit
  });

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());

  return `https://${domain}/${imagePath}?${params.toString()}`;
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Monitor image loading performance
 */
export function trackImagePerformance(imageUrl: string): void {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === imageUrl) {
          console.log(`Image loaded: ${imageUrl}`);
          console.log(`Duration: ${entry.duration}ms`);
          console.log(`Size: ${(entry as any).transferSize} bytes`);
          
          // Send to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'image_load', {
              url: imageUrl,
              duration: entry.duration,
              size: (entry as any).transferSize
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
}

// ============================================================================
// IMAGE COMPRESSION HELPERS
// ============================================================================

/**
 * Calculate optimal image quality based on file size
 */
export function calculateOptimalQuality(
  originalSize: number,
  targetSize: number = 100 * 1024 // 100KB default
): number {
  if (originalSize <= targetSize) return 100;
  
  const ratio = targetSize / originalSize;
  const quality = Math.round(ratio * 100);
  
  // Ensure quality is between 60-95
  return Math.max(60, Math.min(95, quality));
}

/**
 * Get recommended image format based on browser support
 */
export function getRecommendedFormat(): 'avif' | 'webp' | 'jpeg' {
  const supportsAvif = CSS.supports('image/avif');
  const supportsWebp = CSS.supports('image/webp');
  
  if (supportsAvif) return 'avif';
  if (supportsWebp) return 'webp';
  return 'jpeg';
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  generateBlurPlaceholder,
  generateGradientPlaceholder,
  buildUnsplashUrl,
  buildSrcSet,
  buildSizesAttr,
  supportsNativeLazyLoading,
  createLazyLoadObserver,
  preloadImage,
  preloadImages,
  getOptimizedImageProps,
  buildCloudflareImageUrl,
  buildImgixUrl,
  trackImagePerformance,
  calculateOptimalQuality,
  getRecommendedFormat
};
