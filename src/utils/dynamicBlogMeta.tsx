/**
 * Dynamic Blog Meta Utilities
 * Validates and generates blog slug metadata
 */

/**
 * Validates if a slug is in the correct format
 * Valid format: lowercase letters, numbers, and hyphens only
 * Must not start or end with a hyphen
 * @param slug - The slug to validate
 * @returns boolean - true if valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') {
    return false;
  }

  // Check if slug matches pattern: lowercase letters, numbers, hyphens
  // Must not start or end with hyphen
  const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 200;
}

/**
 * Validates if a category slug is valid
 * @param category - The category slug to validate
 * @returns boolean - true if valid, false otherwise
 */
export function isValidCategorySlug(category: string): boolean {
  if (!category || typeof category !== 'string') {
    return false;
  }

  const validCategories = [
    'digital-marketing',
    'seo',
    'social-media',
    'content-marketing',
    'ppc',
    'email-marketing',
    'analytics',
    'branding',
    'web-design',
    'video-marketing'
  ];

  return validCategories.includes(category);
}

/**
 * Sanitizes a slug by removing invalid characters
 * @param slug - The slug to sanitize
 * @returns string - The sanitized slug
 */
export function sanitizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }

  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-') // Replace invalid chars with hyphen
    .replace(/--+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
}

/**
 * Generates a slug from a title
 * @param title - The title to convert to slug
 * @returns string - The generated slug
 */
export function generateSlugFromTitle(title: string): string {
  if (!title || typeof title !== 'string') {
    return '';
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove special chars
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/--+/g, '-')         // Replace multiple hyphens
    .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
}

/**
 * Converts a slug to title case
 * @param slug - The slug to convert
 * @returns string - The title
 */
export function slugToTitle(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extracts category from URL path
 * @param path - The URL path
 * @returns string | null - The category slug or null
 */
export function extractCategoryFromPath(path: string): string | null {
  if (!path || typeof path !== 'string') {
    return null;
  }

  const match = path.match(/\/blogs\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Extracts slug from URL path
 * @param path - The URL path
 * @returns string | null - The blog slug or null
 */
export function extractSlugFromPath(path: string): string | null {
  if (!path || typeof path !== 'string') {
    return null;
  }

  const match = path.match(/\/blogs\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}
