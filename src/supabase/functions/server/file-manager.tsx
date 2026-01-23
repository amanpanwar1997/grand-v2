/**
 * ============================================================================
 * FILE MANAGER - Read/Write System Files
 * ============================================================================
 * 
 * Handles reading and writing to actual source files:
 * - /utils/seo-system.tsx
 * - /public/sitemap.xml
 * - /components/data/blogData.tsx
 * - /public/robots.txt
 * 
 * ⚠️ CRITICAL: These operations edit ACTUAL files!
 * Changes trigger site rebuild for SEO to take effect.
 * ============================================================================
 */

interface FileOperation {
  success: boolean;
  data?: any;
  error?: string;
}

// ============================================================================
// FILE PATHS
// ============================================================================

const BASE_PATH = '/var/task'; // Adjust based on deployment
const FILE_PATHS = {
  SEO_SYSTEM: '../../../utils/seo-system.tsx',
  SITEMAP: '../../../public/sitemap.xml',
  ROBOTS: '../../../public/robots.txt',
  BLOG_DATA: '../../../components/data/blogData.tsx',
};

// ============================================================================
// READ OPERATIONS
// ============================================================================

/**
 * Read SEO System file and parse data
 */
export async function readSEOSystem(): Promise<FileOperation> {
  try {
    const content = await Deno.readTextFile(FILE_PATHS.SEO_SYSTEM);
    const seoData = parseSEOData(content);
    
    return {
      success: true,
      data: seoData
    };
  } catch (error) {
    console.error('Error reading SEO system:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Read sitemap.xml file
 */
export async function readSitemap(): Promise<FileOperation> {
  try {
    const content = await Deno.readTextFile(FILE_PATHS.SITEMAP);
    
    return {
      success: true,
      data: content
    };
  } catch (error) {
    console.error('Error reading sitemap:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Read robots.txt file
 */
export async function readRobotsTxt(): Promise<FileOperation> {
  try {
    const content = await Deno.readTextFile(FILE_PATHS.ROBOTS);
    
    return {
      success: true,
      data: content
    };
  } catch (error) {
    console.error('Error reading robots.txt:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// WRITE OPERATIONS
// ============================================================================

/**
 * Write updated SEO data to seo-system.tsx
 */
export async function writeSEOSystem(seoData: any): Promise<FileOperation> {
  try {
    // Read current file
    const currentContent = await Deno.readTextFile(FILE_PATHS.SEO_SYSTEM);
    
    // Update SEO_PAGES object
    const updatedContent = updateSEOPagesInFile(currentContent, seoData);
    
    // Write back to file
    await Deno.writeTextFile(FILE_PATHS.SEO_SYSTEM, updatedContent);
    
    console.log('✅ SEO system file updated successfully');
    
    return {
      success: true,
      data: { message: 'SEO system updated' }
    };
  } catch (error) {
    console.error('❌ Error writing SEO system:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Write updated sitemap.xml
 */
export async function writeSitemap(sitemapContent: string): Promise<FileOperation> {
  try {
    // Validate XML format
    if (!sitemapContent.includes('<?xml version="1.0"') || 
        !sitemapContent.includes('<urlset')) {
      throw new Error('Invalid sitemap format');
    }
    
    // Write to file
    await Deno.writeTextFile(FILE_PATHS.SITEMAP, sitemapContent);
    
    console.log('✅ Sitemap updated successfully');
    
    return {
      success: true,
      data: { message: 'Sitemap updated' }
    };
  } catch (error) {
    console.error('❌ Error writing sitemap:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Write updated robots.txt
 */
export async function writeRobotsTxt(content: string): Promise<FileOperation> {
  try {
    await Deno.writeTextFile(FILE_PATHS.ROBOTS, content);
    
    console.log('✅ Robots.txt updated successfully');
    
    return {
      success: true,
      data: { message: 'Robots.txt updated' }
    };
  } catch (error) {
    console.error('❌ Error writing robots.txt:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// PARSING FUNCTIONS
// ============================================================================

/**
 * Parse SEO data from seo-system.tsx file
 * Extracts SEO_PAGES object
 */
function parseSEOData(content: string): any {
  try {
    // Find SEO_PAGES constant
    const seoRegex = /export const SEO_PAGES:\s*Record<string,\s*PageSEO>\s*=\s*\{([\s\S]*?)\n\};/;
    const match = content.match(seoRegex);
    
    if (!match) {
      throw new Error('Could not find SEO_PAGES in file');
    }
    
    const seoContent = match[1];
    
    // Parse each page entry
    const pages: any = {};
    const pageRegex = /'([^']+)':\s*\{([^}]+)\}/g;
    let pageMatch;
    
    while ((pageMatch = pageRegex.exec(seoContent)) !== null) {
      const slug = pageMatch[1];
      const pageContent = pageMatch[2];
      
      // Parse page properties
      pages[slug] = parsePageSEO(pageContent);
    }
    
    return pages;
  } catch (error) {
    console.error('Error parsing SEO data:', error);
    throw error;
  }
}

/**
 * Parse individual page SEO properties
 */
function parsePageSEO(content: string): any {
  const page: any = {};
  
  // Extract title
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  if (titleMatch) page.title = titleMatch[1];
  
  // Extract description
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  if (descMatch) page.description = descMatch[1];
  
  // Extract keywords
  const keywordsMatch = content.match(/keywords:\s*\[([^\]]+)\]/);
  if (keywordsMatch) {
    page.keywords = keywordsMatch[1]
      .split(',')
      .map(k => k.trim().replace(/['"]/g, ''));
  }
  
  // Extract h1
  const h1Match = content.match(/h1:\s*['"]([^'"]+)['"]/);
  if (h1Match) page.h1 = h1Match[1];
  
  // Extract canonical
  const canonicalMatch = content.match(/canonical:\s*['"]([^'"]+)['"]/);
  if (canonicalMatch) page.canonical = canonicalMatch[1];
  
  // Extract og_type
  const ogTypeMatch = content.match(/og_type:\s*['"]([^'"]+)['"]/);
  if (ogTypeMatch) page.og_type = ogTypeMatch[1];
  
  // Extract og_image
  const ogImageMatch = content.match(/og_image:\s*['"]([^'"]+)['"]/);
  if (ogImageMatch) page.og_image = ogImageMatch[1];
  
  return page;
}

// ============================================================================
// UPDATE FUNCTIONS
// ============================================================================

/**
 * Update SEO_PAGES object in file content
 */
function updateSEOPagesInFile(content: string, newData: any): string {
  try {
    // Find SEO_PAGES block
    const seoRegex = /(export const SEO_PAGES:\s*Record<string,\s*PageSEO>\s*=\s*\{)([\s\S]*?)(\n\};)/;
    const match = content.match(seoRegex);
    
    if (!match) {
      throw new Error('Could not find SEO_PAGES in file');
    }
    
    const prefix = match[1];
    const suffix = match[3];
    
    // Build new SEO_PAGES content
    let newSEOContent = '\n';
    
    for (const [slug, seo] of Object.entries(newData)) {
      newSEOContent += formatPageSEO(slug, seo as any);
    }
    
    // Replace in content
    const updatedContent = content.replace(
      seoRegex,
      `${prefix}${newSEOContent}${suffix}`
    );
    
    return updatedContent;
  } catch (error) {
    console.error('Error updating SEO pages:', error);
    throw error;
  }
}

/**
 * Format single page SEO entry
 */
function formatPageSEO(slug: string, seo: any): string {
  const keywords = Array.isArray(seo.keywords) 
    ? seo.keywords.map((k: string) => `'${k}'`).join(', ')
    : '';
  
  return `  '${slug}': {
    title: '${seo.title || ''}',
    description: '${seo.description || ''}',
    keywords: [${keywords}],
    h1: '${seo.h1 || ''}',
    canonical: '${seo.canonical || slug}',
    og_type: '${seo.og_type || 'website'}',
    og_image: '${seo.og_image || '/og-image.jpg'}',
  },
`;
}

// ============================================================================
// BACKUP FUNCTIONS
// ============================================================================

/**
 * Create backup of file before editing
 */
export async function createBackup(filePath: string): Promise<FileOperation> {
  try {
    const content = await Deno.readTextFile(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.backup-${timestamp}`;
    
    await Deno.writeTextFile(backupPath, content);
    
    console.log(`✅ Backup created: ${backupPath}`);
    
    return {
      success: true,
      data: { backupPath }
    };
  } catch (error) {
    console.error('Error creating backup:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Restore from backup
 */
export async function restoreBackup(backupPath: string, originalPath: string): Promise<FileOperation> {
  try {
    const content = await Deno.readTextFile(backupPath);
    await Deno.writeTextFile(originalPath, content);
    
    console.log(`✅ Restored from backup: ${backupPath}`);
    
    return {
      success: true,
      data: { message: 'Backup restored' }
    };
  } catch (error) {
    console.error('Error restoring backup:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate SEO data before writing
 */
export function validateSEOData(seoData: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [slug, seo] of Object.entries(seoData)) {
    const page = seo as any;
    
    // Check required fields
    if (!page.title || page.title.length === 0) {
      errors.push(`${slug}: Missing title`);
    }
    
    if (!page.description || page.description.length === 0) {
      errors.push(`${slug}: Missing description`);
    }
    
    // Check length limits
    if (page.title && page.title.length > 60) {
      errors.push(`${slug}: Title too long (max 60 chars)`);
    }
    
    if (page.description && page.description.length > 160) {
      errors.push(`${slug}: Description too long (max 160 chars)`);
    }
    
    // Check keywords
    if (!Array.isArray(page.keywords) || page.keywords.length === 0) {
      errors.push(`${slug}: Missing keywords`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate XML sitemap structure
 */
export function validateSitemap(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check XML declaration
  if (!content.includes('<?xml version="1.0"')) {
    errors.push('Missing XML declaration');
  }
  
  // Check urlset tag
  if (!content.includes('<urlset')) {
    errors.push('Missing urlset tag');
  }
  
  // Check for at least one URL
  if (!content.includes('<url>')) {
    errors.push('No URLs found in sitemap');
  }
  
  // Check closing tag
  if (!content.includes('</urlset>')) {
    errors.push('Missing closing urlset tag');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  // Read operations
  readSEOSystem,
  readSitemap,
  readRobotsTxt,
  
  // Write operations
  writeSEOSystem,
  writeSitemap,
  writeRobotsTxt,
  
  // Backup operations
  createBackup,
  restoreBackup,
  
  // Validation
  validateSEOData,
  validateSitemap,
};
