/**
 * ENTERPRISE SEO SYSTEM (RankMath Level)
 * Complete SEO management backend for admin panel
 * 
 * Features:
 * - Global SEO settings
 * - Per-page SEO management
 * - Schema builder
 * - Sitemap management
 * - Robots.txt editor
 * - Redirect manager
 * - 404 monitoring
 * - Indexing controls
 * - Social meta management
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

// ============================================================
// DATA MODELS
// ============================================================

interface GlobalSEOSettings {
  // Default Meta
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  titleSeparator: string;
  canonicalBaseUrl: string;
  
  // Homepage Override
  homepageTitle: string;
  homepageDescription: string;
  homepageKeywords: string;
  
  // Default OG
  defaultOgTitle: string;
  defaultOgDescription: string;
  defaultOgImage: string;
  
  // Default Twitter
  defaultTwitterTitle: string;
  defaultTwitterDescription: string;
  defaultTwitterCard: 'summary' | 'summary_large_image';
  
  // Indexing Controls
  globalIndex: boolean;
  globalFollow: boolean;
  indexArchives: boolean;
  indexCategories: boolean;
  indexTags: boolean;
  indexAuthors: boolean;
  indexPagination: boolean;
  
  // Search Engine Verification
  googleSearchConsole: string;
  bingWebmaster: string;
  yandexVerification: string;
  baiduVerification: string;
  pinterestVerification: string;
  facebookAppId: string;
  
  // Social Profiles
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  pinterestUrl: string;
  
  // Brand
  favicon: string;
  logo: string;
  brandName: string;
  
  // Timestamps
  updatedAt: string;
  updatedBy: string;
}

interface PageSEO {
  pageId: string;
  slug: string;
  
  // Basic Meta
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  
  // Indexing
  index: boolean;
  follow: boolean;
  archive: boolean;
  
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  
  // Twitter
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: string;
  
  // Schema
  schemaType: string;
  schemaData: any;
  
  // Sitemap
  includeSitemap: boolean;
  sitemapPriority: number;
  sitemapChangeFreq: string;
  
  // SEO Score
  score: number;
  issues: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface Redirect {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: 301 | 302 | 307;
  hits: number;
  createdAt: string;
  createdBy: string;
  enabled: boolean;
}

interface Error404 {
  id: string;
  url: string;
  referrer: string;
  hits: number;
  firstSeen: string;
  lastSeen: string;
  ignored: boolean;
}

// ============================================================
// GLOBAL SEO SETTINGS
// ============================================================

/**
 * Get global SEO settings
 */
export async function getGlobalSEO(c: Context) {
  try {
    const settings = await kv.get('seo:global:settings');
    
    if (!settings) {
      // Return defaults
      return c.json({
        success: true,
        settings: getDefaultGlobalSettings()
      });
    }
    
    return c.json({
      success: true,
      settings
    });
  } catch (error: any) {
    console.error('Error getting global SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update global SEO settings
 */
export async function updateGlobalSEO(c: Context) {
  try {
    const settings = await c.req.json();
    
    // Validate required fields
    if (!settings.defaultTitle || !settings.defaultDescription) {
      return c.json({
        success: false,
        error: 'Default title and description are required'
      }, 400);
    }
    
    // Add timestamps
    settings.updatedAt = new Date().toISOString();
    settings.updatedBy = 'admin'; // TODO: Get from auth
    
    // Save settings
    await kv.set('seo:global:settings', settings);
    
    // Create backup
    await kv.set(`seo:global:backup:${Date.now()}`, settings);
    
    console.log('Global SEO settings updated');
    
    return c.json({
      success: true,
      message: 'Global SEO settings updated successfully',
      settings
    });
  } catch (error: any) {
    console.error('Error updating global SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get default global settings
 */
function getDefaultGlobalSettings(): GlobalSEOSettings {
  return {
    // Default Meta
    defaultTitle: 'Inchtomilez | Leading Digital Marketing Agency',
    defaultDescription: 'Expert digital marketing services including SEO, PPC, social media marketing, and web development in Indore, India.',
    defaultKeywords: 'digital marketing, seo, ppc, social media, indore',
    titleSeparator: '|',
    canonicalBaseUrl: 'https://www.inchtomilez.com',
    
    // Homepage
    homepageTitle: 'Inchtomilez | Best Digital Marketing Agency in Indore',
    homepageDescription: 'Transform your business with expert digital marketing services from Indore\'s leading agency.',
    homepageKeywords: 'digital marketing agency indore, seo services, ppc agency',
    
    // OG
    defaultOgTitle: '',
    defaultOgDescription: '',
    defaultOgImage: '/og-image.jpg',
    
    // Twitter
    defaultTwitterTitle: '',
    defaultTwitterDescription: '',
    defaultTwitterCard: 'summary_large_image',
    
    // Indexing
    globalIndex: true,
    globalFollow: true,
    indexArchives: true,
    indexCategories: true,
    indexTags: true,
    indexAuthors: false,
    indexPagination: false,
    
    // Verification
    googleSearchConsole: '',
    bingWebmaster: '',
    yandexVerification: '',
    baiduVerification: '',
    pinterestVerification: '',
    facebookAppId: '',
    
    // Social
    facebookUrl: 'https://facebook.com/inchtomilez',
    twitterUrl: 'https://twitter.com/inchtomilez',
    instagramUrl: 'https://instagram.com/inchtomilez',
    linkedinUrl: 'https://linkedin.com/company/inchtomilez',
    youtubeUrl: '',
    pinterestUrl: '',
    
    // Brand
    favicon: '/favicon.svg',
    logo: '/logo.svg',
    brandName: 'Inchtomilez',
    
    // Timestamps
    updatedAt: new Date().toISOString(),
    updatedBy: 'system'
  };
}

// ============================================================
// PER-PAGE SEO
// ============================================================

/**
 * Get SEO for specific page
 */
export async function getPageSEO(c: Context) {
  try {
    const { pageId, slug } = await c.req.json();
    
    const key = pageId ? `seo:page:${pageId}` : `seo:slug:${slug}`;
    const pageSEO = await kv.get(key);
    
    if (!pageSEO) {
      return c.json({
        success: false,
        error: 'Page SEO not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      seo: pageSEO
    });
  } catch (error: any) {
    console.error('Error getting page SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update SEO for specific page
 */
export async function updatePageSEO(c: Context) {
  try {
    const seoData = await c.req.json();
    
    // Validate
    if (!seoData.pageId && !seoData.slug) {
      return c.json({
        success: false,
        error: 'pageId or slug is required'
      }, 400);
    }
    
    // Calculate SEO score
    seoData.score = calculateSEOScore(seoData);
    seoData.issues = analyzeSEOIssues(seoData);
    
    // Add timestamps
    seoData.updatedAt = new Date().toISOString();
    if (!seoData.createdAt) {
      seoData.createdAt = seoData.updatedAt;
    }
    
    // Save by pageId and slug
    if (seoData.pageId) {
      await kv.set(`seo:page:${seoData.pageId}`, seoData);
    }
    if (seoData.slug) {
      await kv.set(`seo:slug:${seoData.slug}`, seoData);
    }
    
    // Create version history
    await kv.set(`seo:history:${seoData.pageId}:${Date.now()}`, seoData);
    
    console.log(`Page SEO updated: ${seoData.slug || seoData.pageId}`);
    
    return c.json({
      success: true,
      message: 'Page SEO updated successfully',
      seo: seoData
    });
  } catch (error: any) {
    console.error('Error updating page SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get all pages with SEO (with pagination & search)
 */
export async function getAllPagesSEO(c: Context) {
  try {
    // Get query params for pagination & search
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '25');
    const search = url.searchParams.get('search') || '';
    const sortBy = url.searchParams.get('sortBy') || 'updatedAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    
    const pagesData = await kv.getByPrefix('seo:page:');
    
    // Handle empty state - return empty array instead of error
    if (!pagesData || pagesData.length === 0) {
      console.log('⚠️  No pages found in database. Returning empty array.');
      return c.json({
        success: true,
        pages: [],
        pagination: {
          currentPage: 1,
          pageSize: limit,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        },
        message: 'No pages found. System may need initialization.'
      });
    }
    
    // Extract values from KV store results
    let pages = pagesData.map((item: any) => item.value).filter(Boolean);
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      pages = pages.filter((p: any) => 
        (p.title?.toLowerCase().includes(searchLower)) ||
        (p.slug?.toLowerCase().includes(searchLower)) ||
        (p.description?.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort
    pages.sort((a: any, b: any) => {
      let valA, valB;
      
      if (sortBy === 'updatedAt') {
        valA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        valB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      } else if (sortBy === 'score') {
        valA = a.score || 0;
        valB = b.score || 0;
      } else if (sortBy === 'title') {
        valA = a.title || '';
        valB = b.title || '';
      } else {
        valA = 0;
        valB = 0;
      }
      
      if (sortOrder === 'desc') {
        return valB > valA ? 1 : -1;
      } else {
        return valA > valB ? 1 : -1;
      }
    });
    
    // Pagination
    const totalPages = pages.length;
    const totalPagesCount = Math.ceil(totalPages / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPages = pages.slice(startIndex, endIndex);
    
    return c.json({
      success: true,
      pages: paginatedPages,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: totalPages,
        totalPages: totalPagesCount,
        hasNextPage: page < totalPagesCount,
        hasPrevPage: page > 1
      }
    });
  } catch (error: any) {
    console.error('Error getting all pages SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Bulk update SEO
 */
export async function bulkUpdatePageSEO(c: Context) {
  try {
    const { pages } = await c.req.json();
    
    if (!Array.isArray(pages)) {
      return c.json({
        success: false,
        error: 'pages must be an array'
      }, 400);
    }
    
    const results = [];
    
    for (const page of pages) {
      try {
        page.score = calculateSEOScore(page);
        page.issues = analyzeSEOIssues(page);
        page.updatedAt = new Date().toISOString();
        
        if (page.pageId) {
          await kv.set(`seo:page:${page.pageId}`, page);
        }
        if (page.slug) {
          await kv.set(`seo:slug:${page.slug}`, page);
        }
        
        results.push({ pageId: page.pageId, success: true });
      } catch (error: any) {
        results.push({ pageId: page.pageId, success: false, error: error.message });
      }
    }
    
    return c.json({
      success: true,
      message: `Updated ${results.filter(r => r.success).length} pages`,
      results
    });
  } catch (error: any) {
    console.error('Error bulk updating SEO:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// SEO ANALYZER
// ============================================================

/**
 * Calculate SEO score (0-100)
 */
function calculateSEOScore(seo: any): number {
  let score = 0;
  
  // Title (20 points)
  if (seo.title) {
    score += 10;
    if (seo.title.length >= 30 && seo.title.length <= 60) {
      score += 10;
    }
  }
  
  // Description (20 points)
  if (seo.description) {
    score += 10;
    if (seo.description.length >= 120 && seo.description.length <= 160) {
      score += 10;
    }
  }
  
  // Keywords (10 points)
  if (seo.keywords && seo.keywords.length > 0) {
    score += 10;
  }
  
  // OG Image (10 points)
  if (seo.ogImage) {
    score += 10;
  }
  
  // Schema (15 points)
  if (seo.schemaType) {
    score += 10;
    if (seo.schemaData) {
      score += 5;
    }
  }
  
  // Canonical (10 points)
  if (seo.canonical) {
    score += 10;
  }
  
  // Indexing (5 points)
  if (seo.index !== undefined) {
    score += 5;
  }
  
  // Sitemap (10 points)
  if (seo.includeSitemap) {
    score += 10;
  }
  
  return Math.min(100, score);
}

/**
 * Analyze SEO issues
 */
function analyzeSEOIssues(seo: any): string[] {
  const issues: string[] = [];
  
  // Title checks
  if (!seo.title) {
    issues.push('Missing page title');
  } else if (seo.title.length < 30) {
    issues.push('Title too short (< 30 chars)');
  } else if (seo.title.length > 60) {
    issues.push('Title too long (> 60 chars)');
  }
  
  // Description checks
  if (!seo.description) {
    issues.push('Missing meta description');
  } else if (seo.description.length < 120) {
    issues.push('Description too short (< 120 chars)');
  } else if (seo.description.length > 160) {
    issues.push('Description too long (> 160 chars)');
  }
  
  // OG checks
  if (!seo.ogImage) {
    issues.push('Missing Open Graph image');
  }
  
  // Schema checks
  if (!seo.schemaType) {
    issues.push('No schema type selected');
  }
  
  // Canonical checks
  if (!seo.canonical) {
    issues.push('Missing canonical URL');
  }
  
  return issues;
}

// ============================================================
// SITEMAP MANAGEMENT
// ============================================================

/**
 * Generate sitemap XML
 */
export async function generateSitemap(c: Context) {
  try {
    const pagesData = await kv.getByPrefix('seo:page:');
    
    // Extract values from KV store results
    const pages = pagesData.map((item: any) => item.value);
    
    // Filter pages to include in sitemap
    const sitemapPages = pages.filter((p: any) => p.includeSitemap !== false);
    
    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    for (const page of sitemapPages) {
      xml += '  <url>\n';
      xml += `    <loc>${page.canonical || `https://www.inchtomilez.com${page.slug}`}</loc>\n`;
      xml += `    <lastmod>${page.updatedAt || new Date().toISOString()}</lastmod>\n`;
      xml += `    <changefreq>${page.sitemapChangeFreq || 'weekly'}</changefreq>\n`;
      xml += `    <priority>${page.sitemapPriority || 0.5}</priority>\n`;
      xml += '  </url>\n';
    }
    
    xml += '</urlset>';
    
    // Save sitemap
    await kv.set('seo:sitemap:xml', xml);
    await kv.set('seo:sitemap:generated', new Date().toISOString());
    
    console.log(`Sitemap generated with ${sitemapPages.length} URLs`);
    
    return c.json({
      success: true,
      message: `Sitemap generated with ${sitemapPages.length} URLs`,
      xml,
      count: sitemapPages.length,
      generatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get sitemap
 */
export async function getSitemap(c: Context) {
  try {
    const xml = await kv.get('seo:sitemap:xml');
    const generated = await kv.get('seo:sitemap:generated');
    
    if (!xml) {
      return c.json({
        success: false,
        error: 'Sitemap not generated yet'
      }, 404);
    }
    
    return c.json({
      success: true,
      xml,
      generatedAt: generated
    });
  } catch (error: any) {
    console.error('Error getting sitemap:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// ROBOTS.TXT MANAGEMENT
// ============================================================

/**
 * Get robots.txt
 */
export async function getRobotsTxt(c: Context) {
  try {
    let robots = await kv.get('seo:robots:txt');
    
    if (!robots) {
      robots = getDefaultRobotsTxt();
    }
    
    return c.json({
      success: true,
      content: robots
    });
  } catch (error: any) {
    console.error('Error getting robots.txt:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update robots.txt
 */
export async function updateRobotsTxt(c: Context) {
  try {
    const { content } = await c.req.json();
    
    if (!content) {
      return c.json({
        success: false,
        error: 'Content is required'
      }, 400);
    }
    
    // Save robots.txt
    await kv.set('seo:robots:txt', content);
    await kv.set('seo:robots:updated', new Date().toISOString());
    
    // Create backup
    await kv.set(`seo:robots:backup:${Date.now()}`, content);
    
    console.log('Robots.txt updated');
    
    return c.json({
      success: true,
      message: 'Robots.txt updated successfully',
      content
    });
  } catch (error: any) {
    console.error('Error updating robots.txt:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Reset robots.txt to default
 */
export async function resetRobotsTxt(c: Context) {
  try {
    const defaultRobots = getDefaultRobotsTxt();
    
    await kv.set('seo:robots:txt', defaultRobots);
    await kv.set('seo:robots:updated', new Date().toISOString());
    
    return c.json({
      success: true,
      message: 'Robots.txt reset to default',
      content: defaultRobots
    });
  } catch (error: any) {
    console.error('Error resetting robots.txt:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

function getDefaultRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: https://www.inchtomilez.com/sitemap.xml`;
}

// ============================================================
// REDIRECT MANAGEMENT
// ============================================================

/**
 * Get all redirects
 */
export async function getAllRedirects(c: Context) {
  try {
    const redirects = await kv.getByPrefix('seo:redirect:');
    
    return c.json({
      success: true,
      count: redirects.length,
      redirects: redirects.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  } catch (error: any) {
    console.error('Error getting redirects:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Create redirect
 */
export async function createRedirect(c: Context) {
  try {
    const redirect = await c.req.json();
    
    // Validate
    if (!redirect.sourceUrl || !redirect.targetUrl) {
      return c.json({
        success: false,
        error: 'sourceUrl and targetUrl are required'
      }, 400);
    }
    
    // Generate ID
    redirect.id = `redirect_${Date.now()}`;
    redirect.hits = 0;
    redirect.createdAt = new Date().toISOString();
    redirect.createdBy = 'admin';
    redirect.enabled = true;
    redirect.type = redirect.type || 301;
    
    // Save redirect
    await kv.set(`seo:redirect:${redirect.id}`, redirect);
    
    console.log(`Redirect created: ${redirect.sourceUrl} → ${redirect.targetUrl}`);
    
    return c.json({
      success: true,
      message: 'Redirect created successfully',
      redirect
    });
  } catch (error: any) {
    console.error('Error creating redirect:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update redirect
 */
export async function updateRedirect(c: Context) {
  try {
    const { id, ...updates } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'Redirect ID is required'
      }, 400);
    }
    
    const existing = await kv.get(`seo:redirect:${id}`);
    
    if (!existing) {
      return c.json({
        success: false,
        error: 'Redirect not found'
      }, 404);
    }
    
    const updated = { ...existing, ...updates };
    await kv.set(`seo:redirect:${id}`, updated);
    
    console.log(`Redirect updated: ${id}`);
    
    return c.json({
      success: true,
      message: 'Redirect updated successfully',
      redirect: updated
    });
  } catch (error: any) {
    console.error('Error updating redirect:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Delete redirect
 */
export async function deleteRedirect(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'Redirect ID is required'
      }, 400);
    }
    
    await kv.del(`seo:redirect:${id}`);
    
    console.log(`Redirect deleted: ${id}`);
    
    return c.json({
      success: true,
      message: 'Redirect deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting redirect:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Toggle redirect enabled/disabled
 */
export async function toggleRedirect(c: Context) {
  try {
    const { id, enabled } = await c.req.json();
    
    if (!id || enabled === undefined) {
      return c.json({
        success: false,
        error: 'id and enabled fields are required'
      }, 400);
    }
    
    // Get existing redirect
    const redirect = await kv.get(`seo:redirect:${id}`);
    
    if (!redirect) {
      return c.json({
        success: false,
        error: 'Redirect not found'
      }, 404);
    }
    
    // Update enabled status
    redirect.enabled = enabled;
    redirect.updatedAt = new Date().toISOString();
    
    await kv.set(`seo:redirect:${id}`, redirect);
    
    console.log(`Redirect ${id} ${enabled ? 'enabled' : 'disabled'}`);
    
    return c.json({
      success: true,
      redirect: redirect,
      message: `Redirect ${enabled ? 'enabled' : 'disabled'} successfully`
    });
  } catch (error: any) {
    console.error('Error toggling redirect:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// 404 MONITORING
// ============================================================

/**
 * Log 404 error
 */
export async function log404(c: Context) {
  try {
    const { url, referrer } = await c.req.json();
    
    if (!url) {
      return c.json({
        success: false,
        error: 'URL is required'
      }, 400);
    }
    
    // Check if 404 already exists
    const existing = await kv.get(`seo:404:${url}`);
    
    if (existing) {
      // Update hit count
      existing.hits++;
      existing.lastSeen = new Date().toISOString();
      await kv.set(`seo:404:${url}`, existing);
    } else {
      // Create new 404 log
      const error404: Error404 = {
        id: `404_${Date.now()}`,
        url,
        referrer: referrer || 'direct',
        hits: 1,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        ignored: false
      };
      
      await kv.set(`seo:404:${url}`, error404);
    }
    
    return c.json({
      success: true,
      message: '404 logged'
    });
  } catch (error: any) {
    console.error('Error logging 404:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get all 404 errors
 */
export async function getAll404s(c: Context) {
  try {
    const errors = await kv.getByPrefix('seo:404:');
    
    return c.json({
      success: true,
      count: errors.length,
      errors: errors
        .filter((e: any) => !e.ignored)
        .sort((a: any, b: any) => b.hits - a.hits)
    });
  } catch (error: any) {
    console.error('Error getting 404s:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Mark 404 as ignored
 */
export async function ignore404(c: Context) {
  try {
    const { url } = await c.req.json();
    
    if (!url) {
      return c.json({
        success: false,
        error: 'URL is required'
      }, 400);
    }
    
    const error = await kv.get(`seo:404:${url}`);
    
    if (error) {
      error.ignored = true;
      await kv.set(`seo:404:${url}`, error);
    }
    
    return c.json({
      success: true,
      message: '404 marked as ignored'
    });
  } catch (error: any) {
    console.error('Error ignoring 404:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Delete single 404 error
 */
export async function delete404(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    // Find and delete the 404 by ID
    const errors = await kv.getByPrefix('seo:404:');
    const error404 = errors.find((e: any) => e.value?.id === id);
    
    if (error404) {
      await kv.del(error404.key);
      console.log(`404 error deleted: ${id}`);
    }
    
    return c.json({
      success: true,
      message: '404 error deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting 404:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Clear all 404 logs
 */
export async function clearAll404s(c: Context) {
  try {
    const errors = await kv.getByPrefix('seo:404:');
    
    for (const error of errors) {
      await kv.del(`seo:404:${error.url}`);
    }
    
    console.log(`Cleared ${errors.length} 404 logs`);
    
    return c.json({
      success: true,
      message: `Cleared ${errors.length} 404 logs`
    });
  } catch (error: any) {
    console.error('Error clearing 404s:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// SCHEMA MANAGEMENT
// ============================================================

/**
 * Get schema templates
 */
export async function getSchemaTemplates(c: Context) {
  try {
    const templates = {
      WebPage: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '',
        description: '',
        url: ''
      },
      Article: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '',
        description: '',
        author: {
          '@type': 'Person',
          name: ''
        },
        datePublished: '',
        dateModified: ''
      },
      LocalBusiness: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Inchtomilez',
        image: '',
        '@id': '',
        url: 'https://www.inchtomilez.com',
        telephone: '+91-9669988666',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '',
          addressLocality: 'Indore',
          postalCode: '',
          addressCountry: 'IN'
        }
      },
      Organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Inchtomilez',
        url: 'https://www.inchtomilez.com',
        logo: '',
        sameAs: []
      },
      FAQ: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: []
      },
      HowTo: {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: '',
        description: '',
        step: []
      },
      Product: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: '',
        description: '',
        offers: {
          '@type': 'Offer',
          price: '',
          priceCurrency: 'INR'
        }
      }
    };
    
    return c.json({
      success: true,
      templates
    });
  } catch (error: any) {
    console.error('Error getting schema templates:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}