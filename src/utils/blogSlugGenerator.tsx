/**
 * Blog URL & Slug Generation Utility
 * Handles SEO-friendly URL generation for blog posts
 * 
 * URL Structure: /blogs/{category}/{slugified-title}
 * Example: /blogs/seo/best-seo-company-indore
 */

/**
 * Category Name to URL Slug Mapping
 * Maps full category names to short, SEO-friendly slugs
 */
export const categorySlugMap: Record<string, string> = {
  'SEO & Local SEO': 'seo',
  'PPC & Google Ads': 'ppc',
  'Social Media Marketing': 'social-media',
  'Content Marketing': 'content-marketing',
  'Web Design & Development': 'web-design',
  'Branding & Creative': 'branding',
  'Email Marketing': 'email-marketing',
  'Video & Media Production': 'video-production',
  'Analytics & Reporting': 'analytics',
  'E-commerce Marketing': 'ecommerce',
  'Legal & Compliance': 'legal',
};

/**
 * Stop words to remove from blog title slugs
 * Common words that don't add SEO value
 */
const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with'
]);

/**
 * Generate SEO-friendly slug from blog title
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Removes stop words (optional)
 * - Ensures clean, keyword-rich URLs
 * 
 * @param title - Blog post title
 * @param removeStopWords - Whether to remove common stop words (default: true)
 * @returns SEO-friendly slug
 */
export function generateSlugFromTitle(title: string, removeStopWords: boolean = true): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .trim()
    .split(/\s+/) // Split by whitespace
    .filter(word => !removeStopWords || !stopWords.has(word)) // Remove stop words
    .join('-') // Join with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end
}

/**
 * Get category slug from full category name
 * 
 * @param categoryName - Full category name (e.g., "SEO & Local SEO")
 * @returns URL-friendly category slug (e.g., "seo")
 */
export function getCategorySlug(categoryName: string): string {
  return categorySlugMap[categoryName] || generateSlugFromTitle(categoryName, true);
}

/**
 * Generate full blog URL path
 * 
 * @param categoryName - Full category name
 * @param titleSlug - Blog post slug (already generated)
 * @returns Full URL path (e.g., "/blogs/seo/best-seo-company-indore")
 */
export function generateBlogUrl(categoryName: string, titleSlug: string): string {
  const categorySlug = getCategorySlug(categoryName);
  return `/blogs/${categorySlug}/${titleSlug}`;
}

/**
 * Parse blog URL to extract category and slug
 * 
 * @param url - Blog URL path (e.g., "/blogs/seo/best-seo-company-indore")
 * @returns Object with category slug and post slug
 */
export function parseBlogUrl(url: string): { categorySlug: string; postSlug: string } | null {
  const match = url.match(/^\/blogs\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  
  return {
    categorySlug: match[1],
    postSlug: match[2],
  };
}

/**
 * Get reverse category name from slug
 * 
 * @param slug - Category slug (e.g., "seo")
 * @returns Full category name (e.g., "SEO & Local SEO") or slug if not found
 */
export function getCategoryNameFromSlug(slug: string): string {
  const entry = Object.entries(categorySlugMap).find(([_, value]) => value === slug);
  return entry ? entry[0] : slug;
}

/**
 * Legacy URL redirect mapping
 * Maps old blog URLs to new SEO-friendly URLs
 * For backward compatibility during migration
 */
export const legacyUrlRedirects: Record<string, string> = {
  // Old format: /blogs/best-seo-company-indore-2025
  // New format: /blogs/seo/best-seo-company-indore-2025
  // This mapping is generated dynamically based on blog data
};

/**
 * Check if a URL is a legacy blog URL
 * Legacy format: /blogs/{slug} (no category)
 * New format: /blogs/{category}/{slug}
 * 
 * @param url - URL path to check
 * @returns true if legacy format, false if new format
 */
export function isLegacyBlogUrl(url: string): boolean {
  // Legacy: /blogs/slug (2 segments)
  // New: /blogs/category/slug (3 segments)
  const segments = url.split('/').filter(Boolean);
  return segments.length === 2 && segments[0] === 'blogs';
}

/**
 * Get new URL from legacy URL
 * 
 * @param legacyUrl - Old blog URL
 * @param blogData - Array of blog posts to search
 * @returns New URL or null if not found
 */
export function getLegacyRedirect(legacyUrl: string, blogData: any[]): string | null {
  const oldSlug = legacyUrl.split('/').pop();
  const blog = blogData.find(b => b.slug === oldSlug);
  
  if (!blog) return null;
  
  return generateBlogUrl(blog.category, blog.slug);
}

/**
 * Validate blog slug
 * Ensures slug meets SEO best practices
 * 
 * @param slug - Slug to validate
 * @returns Validation result with status and message
 */
export function validateSlug(slug: string): { valid: boolean; message?: string } {
  if (!slug || slug.length === 0) {
    return { valid: false, message: 'Slug cannot be empty' };
  }
  
  if (slug.length > 100) {
    return { valid: false, message: 'Slug too long (max 100 characters)' };
  }
  
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { valid: false, message: 'Slug must contain only lowercase letters, numbers, and hyphens' };
  }
  
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return { valid: false, message: 'Slug cannot start or end with hyphen' };
  }
  
  if (slug.includes('--')) {
    return { valid: false, message: 'Slug cannot contain consecutive hyphens' };
  }
  
  return { valid: true };
}
