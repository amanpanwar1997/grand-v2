/**
 * SITE AUDIT - REAL BACKEND
 * Crawls entire website and identifies SEO issues
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  page: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
}

interface PageAudit {
  url: string;
  title: string;
  description: string;
  h1: string[];
  images: number;
  imagesWithoutAlt: number;
  links: number;
  brokenLinks: number;
  loadTime: number;
  status: number;
  issues: AuditIssue[];
}

/**
 * Start a site audit
 */
export async function startSiteAudit(c: Context) {
  try {
    const { baseUrl, maxPages = 100 } = await c.req.json();

    if (!baseUrl) {
      return c.json({ success: false, error: 'Base URL is required' });
    }

    console.log(`🔍 Starting site audit for: ${baseUrl} (max ${maxPages} pages)`);

    // Create audit ID
    const auditId = `audit_${Date.now()}`;

    // Save audit status
    await kv.set(`site_audit:${auditId}:status`, {
      auditId,
      baseUrl,
      status: 'running',
      startedAt: new Date().toISOString(),
      progress: 0,
      pagesScanned: 0,
      maxPages
    });

    // Start crawling in background (don't await)
    crawlSite(auditId, baseUrl, maxPages).catch(error => {
      console.error('Crawl error:', error);
      kv.set(`site_audit:${auditId}:status`, {
        auditId,
        baseUrl,
        status: 'failed',
        error: error.message,
        completedAt: new Date().toISOString()
      });
    });

    return c.json({
      success: true,
      auditId,
      message: 'Audit started. Check status with GET /site-audit/status/{auditId}'
    });

  } catch (error: any) {
    console.error('Start audit error:', error);
    return c.json({
      success: false,
      error: error.message || 'Failed to start audit'
    });
  }
}

/**
 * Get audit status
 */
export async function getAuditStatus(c: Context) {
  try {
    const auditId = c.req.param('auditId');

    const status = await kv.get(`site_audit:${auditId}:status`);
    
    if (!status) {
      return c.json({ success: false, error: 'Audit not found' });
    }

    return c.json({
      success: true,
      status
    });

  } catch (error: any) {
    console.error('Get audit status error:', error);
    return c.json({
      success: false,
      error: error.message || 'Failed to get audit status'
    });
  }
}

/**
 * Get audit results
 */
export async function getAuditResults(c: Context) {
  try {
    const auditId = c.req.param('auditId');

    const status = await kv.get(`site_audit:${auditId}:status`);
    const results = await kv.get(`site_audit:${auditId}:results`);
    
    if (!status) {
      return c.json({ success: false, error: 'Audit not found' });
    }

    if (status.status === 'running') {
      return c.json({
        success: false,
        error: 'Audit still running',
        progress: status.progress
      });
    }

    return c.json({
      success: true,
      status,
      results
    });

  } catch (error: any) {
    console.error('Get audit results error:', error);
    return c.json({
      success: false,
      error: error.message || 'Failed to get audit results'
    });
  }
}

/**
 * Crawl site and collect data
 */
async function crawlSite(auditId: string, baseUrl: string, maxPages: number) {
  console.log(`🕷️ Starting crawl: ${baseUrl}`);
  
  const visited = new Set<string>();
  const toVisit = [baseUrl];
  const pageAudits: PageAudit[] = [];
  const allIssues: AuditIssue[] = [];

  let pagesScanned = 0;

  while (toVisit.length > 0 && pagesScanned < maxPages) {
    const url = toVisit.shift()!;
    
    if (visited.has(url)) continue;
    visited.add(url);

    try {
      console.log(`📄 Auditing: ${url}`);
      
      // Audit this page
      const audit = await auditPage(url, baseUrl);
      pageAudits.push(audit);
      allIssues.push(...audit.issues);
      
      pagesScanned++;

      // Update progress
      await kv.set(`site_audit:${auditId}:status`, {
        auditId,
        baseUrl,
        status: 'running',
        progress: Math.round((pagesScanned / maxPages) * 100),
        pagesScanned,
        maxPages
      });

      // Extract links to visit
      if (pagesScanned < maxPages) {
        const html = await fetchPage(url);
        if (html) {
          const links = extractLinks(html, baseUrl);
          links.forEach(link => {
            if (!visited.has(link) && !toVisit.includes(link)) {
              toVisit.push(link);
            }
          });
        }
      }

      // Small delay to avoid hammering server
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error: any) {
      console.error(`Error auditing ${url}:`, error.message);
      allIssues.push({
        type: 'error',
        category: 'crawl',
        page: url,
        issue: `Failed to crawl: ${error.message}`,
        impact: 'high'
      });
    }
  }

  // Calculate summary
  const summary = calculateSummary(pageAudits, allIssues);

  // Save results
  await kv.set(`site_audit:${auditId}:results`, {
    summary,
    pages: pageAudits,
    issues: allIssues,
    categories: categorizeIssues(allIssues)
  });

  // Update status
  await kv.set(`site_audit:${auditId}:status`, {
    auditId,
    baseUrl,
    status: 'completed',
    progress: 100,
    pagesScanned,
    maxPages,
    completedAt: new Date().toISOString()
  });

  console.log(`✅ Audit complete: ${pagesScanned} pages scanned`);
}

/**
 * Audit a single page
 */
async function auditPage(url: string, baseUrl: string): Promise<PageAudit> {
  const startTime = Date.now();
  const issues: AuditIssue[] = [];

  let response;
  try {
    response = await fetch(url);
  } catch (error: any) {
    return {
      url,
      title: '',
      description: '',
      h1: [],
      images: 0,
      imagesWithoutAlt: 0,
      links: 0,
      brokenLinks: 0,
      loadTime: Date.now() - startTime,
      status: 0,
      issues: [{
        type: 'error',
        category: 'access',
        page: url,
        issue: `Cannot access page: ${error.message}`,
        impact: 'high'
      }]
    };
  }

  const loadTime = Date.now() - startTime;
  const status = response.status;

  if (status !== 200) {
    issues.push({
      type: 'error',
      category: 'http',
      page: url,
      issue: `HTTP ${status}`,
      impact: 'high'
    });
  }

  const html = await response.text();

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  if (!title) {
    issues.push({
      type: 'error',
      category: 'meta',
      page: url,
      issue: 'Missing title tag',
      impact: 'high'
    });
  } else if (title.length < 30) {
    issues.push({
      type: 'warning',
      category: 'meta',
      page: url,
      issue: `Title too short (${title.length} chars)`,
      impact: 'medium'
    });
  } else if (title.length > 60) {
    issues.push({
      type: 'warning',
      category: 'meta',
      page: url,
      issue: `Title too long (${title.length} chars)`,
      impact: 'medium'
    });
  }

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';
  
  if (!description) {
    issues.push({
      type: 'error',
      category: 'meta',
      page: url,
      issue: 'Missing meta description',
      impact: 'high'
    });
  } else if (description.length < 120) {
    issues.push({
      type: 'warning',
      category: 'meta',
      page: url,
      issue: `Description too short (${description.length} chars)`,
      impact: 'medium'
    });
  } else if (description.length > 160) {
    issues.push({
      type: 'warning',
      category: 'meta',
      page: url,
      issue: `Description too long (${description.length} chars)`,
      impact: 'medium'
    });
  }

  // Extract H1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi) || [];
  const h1 = h1Matches.map(h => h.replace(/<[^>]*>/g, '').trim());
  
  if (h1.length === 0) {
    issues.push({
      type: 'error',
      category: 'headings',
      page: url,
      issue: 'Missing H1 tag',
      impact: 'high'
    });
  } else if (h1.length > 1) {
    issues.push({
      type: 'warning',
      category: 'headings',
      page: url,
      issue: `Multiple H1 tags (${h1.length})`,
      impact: 'medium'
    });
  }

  // Check images
  const imageTags = html.match(/<img[^>]*>/gi) || [];
  const images = imageTags.length;
  const imagesWithoutAlt = imageTags.filter(img => !img.includes('alt=')).length;
  
  if (imagesWithoutAlt > 0) {
    issues.push({
      type: 'warning',
      category: 'images',
      page: url,
      issue: `${imagesWithoutAlt} image(s) without alt text`,
      impact: 'medium'
    });
  }

  // Check links
  const linkMatches = html.match(/href=["']([^"']*)["']/gi) || [];
  const links = linkMatches.length;

  // Check load time
  if (loadTime > 3000) {
    issues.push({
      type: 'warning',
      category: 'performance',
      page: url,
      issue: `Slow load time (${loadTime}ms)`,
      impact: 'medium'
    });
  }

  // Check canonical
  if (!html.includes('rel="canonical"')) {
    issues.push({
      type: 'info',
      category: 'meta',
      page: url,
      issue: 'Missing canonical URL',
      impact: 'low'
    });
  }

  // Check viewport
  if (!html.includes('name="viewport"')) {
    issues.push({
      type: 'error',
      category: 'mobile',
      page: url,
      issue: 'Missing viewport meta tag',
      impact: 'high'
    });
  }

  return {
    url,
    title,
    description,
    h1,
    images,
    imagesWithoutAlt,
    links,
    brokenLinks: 0,
    loadTime,
    status,
    issues
  };
}

/**
 * Fetch page HTML
 */
async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Extract internal links from HTML
 */
function extractLinks(html: string, baseUrl: string): string[] {
  const links: string[] = [];
  const linkMatches = html.match(/href=["']([^"']*)["']/gi) || [];
  
  linkMatches.forEach(match => {
    const href = match.match(/href=["']([^"']*)["']/i)?.[1];
    if (!href) return;
    
    // Skip external links, anchors, mailto, tel
    if (href.startsWith('http') && !href.startsWith(baseUrl)) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:')) return;
    if (href.startsWith('tel:')) return;
    
    // Convert relative to absolute
    let absoluteUrl = href;
    if (href.startsWith('/')) {
      absoluteUrl = baseUrl + href;
    } else if (!href.startsWith('http')) {
      absoluteUrl = baseUrl + '/' + href;
    }
    
    // Remove trailing slash and hash
    absoluteUrl = absoluteUrl.replace(/\/$/, '').split('#')[0];
    
    if (!links.includes(absoluteUrl)) {
      links.push(absoluteUrl);
    }
  });
  
  return links;
}

/**
 * Calculate summary statistics
 */
function calculateSummary(pages: PageAudit[], issues: AuditIssue[]) {
  const errors = issues.filter(i => i.type === 'error').length;
  const warnings = issues.filter(i => i.type === 'warning').length;
  const info = issues.filter(i => i.type === 'info').length;
  
  const pagesWithIssues = new Set(issues.map(i => i.page)).size;
  const healthyPages = pages.length - pagesWithIssues;
  
  const avgLoadTime = pages.reduce((sum, p) => sum + p.loadTime, 0) / pages.length;
  
  const score = Math.max(0, 100 - (errors * 5) - (warnings * 2) - (info * 0.5));
  
  return {
    totalPages: pages.length,
    pagesChecked: pages.length,
    healthyPages,
    pagesWithIssues,
    errors,
    warnings,
    info,
    totalIssues: issues.length,
    avgLoadTime: Math.round(avgLoadTime),
    score: Math.round(score),
    grade: getScoreGrade(score)
  };
}

/**
 * Categorize issues
 */
function categorizeIssues(issues: AuditIssue[]) {
  const categories: Record<string, any> = {};
  
  issues.forEach(issue => {
    if (!categories[issue.category]) {
      categories[issue.category] = {
        errors: 0,
        warnings: 0,
        info: 0,
        total: 0
      };
    }
    
    categories[issue.category][issue.type]++;
    categories[issue.category].total++;
  });
  
  return categories;
}

/**
 * Get score grade
 */
function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
