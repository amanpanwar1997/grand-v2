/**
 * ============================================================================
 * ENTERPRISE CMS API - Production-Grade Content Management System
 * ============================================================================
 * 
 * Features:
 * - Page CRUD with versioning
 * - SEO management
 * - Media library
 * - Redirect management
 * - Sitemap generation
 * - i18n support
 * - Audit logging
 * 
 * Stack: Hono + Supabase + KV Store
 * ============================================================================
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const cmsApi = new Hono();

// ============================================================================
// SUPABASE CLIENT
// ============================================================================

function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );
}

// ============================================================================
// AUTH MIDDLEWARE
// ============================================================================

async function authMiddleware(c: any, next: () => Promise<void>) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const supabase = getSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }

  // Get user metadata for role
  const userMeta = await kv.get(`user:${user.id}:meta`);
  const role = userMeta?.role || 'viewer';

  c.set('user', { id: user.id, email: user.email, role });
  await next();
}

// ============================================================================
// ROLE-BASED PERMISSION CHECK
// ============================================================================

function checkPermission(requiredRole: string) {
  return async (c: any, next: () => Promise<void>) => {
    const user = c.get('user');
    const roleHierarchy = {
      'superadmin': 5,
      'seo_manager': 4,
      'content_editor': 3,
      'developer': 3,
      'auditor': 2,
      'viewer': 1
    };

    const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    if (userLevel < requiredLevel) {
      return c.json({ error: 'Forbidden - Insufficient permissions' }, 403);
    }

    await next();
  };
}

// ============================================================================
// AUDIT LOGGING
// ============================================================================

async function logAudit(action: string, userId: string, details: any) {
  const timestamp = new Date().toISOString();
  const auditKey = `audit:${timestamp}:${userId}`;
  
  await kv.set(auditKey, {
    action,
    userId,
    timestamp,
    details,
    ip: details.ip || 'unknown'
  });
}

// ============================================================================
// PAGE MANAGEMENT API
// ============================================================================

// Get all pages with filters
cmsApi.get('/pages', authMiddleware, async (c) => {
  try {
    const { status, locale, search } = c.req.query();
    
    // Get all pages
    const pages = await kv.getByPrefix('page:');
    
    // Filter pages
    let filteredPages = pages.filter((p: any) => p.value);
    
    if (status) {
      filteredPages = filteredPages.filter((p: any) => p.value.status === status);
    }
    
    if (locale) {
      filteredPages = filteredPages.filter((p: any) => p.value.locale === locale);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPages = filteredPages.filter((p: any) => 
        p.value.title?.toLowerCase().includes(searchLower) ||
        p.value.slug?.toLowerCase().includes(searchLower)
      );
    }

    const pagesData = filteredPages.map((p: any) => p.value);

    return c.json({
      success: true,
      data: pagesData,
      total: pagesData.length
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return c.json({ error: 'Failed to fetch pages' }, 500);
  }
});

// Get single page by slug
cmsApi.get('/pages/:slug', authMiddleware, async (c) => {
  try {
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';
    
    const pageKey = `page:${locale}:${slug}`;
    const page = await kv.get(pageKey);

    if (!page) {
      return c.json({ error: 'Page not found' }, 404);
    }

    return c.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching page:', error);
    return c.json({ error: 'Failed to fetch page' }, 500);
  }
});

// Create new page
cmsApi.post('/pages', authMiddleware, checkPermission('content_editor'), async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    
    const {
      slug,
      locale = 'en',
      title,
      meta_description,
      canonical,
      body_html,
      template = 'generic',
      parent_slug,
      seo_fields,
      schema_json
    } = body;

    // Validate required fields
    if (!slug || !title) {
      return c.json({ error: 'Slug and title are required' }, 400);
    }

    // Check if page already exists
    const existingPage = await kv.get(`page:${locale}:${slug}`);
    if (existingPage) {
      return c.json({ error: 'Page with this slug already exists' }, 409);
    }

    // Create page object
    const pageData = {
      slug,
      locale,
      status: 'draft',
      title,
      meta_description: meta_description || '',
      canonical: canonical || `https://www.inchtomilez.com${slug}`,
      body_html: body_html || '',
      template,
      parent_slug: parent_slug || null,
      seo_fields: seo_fields || {},
      schema_json: schema_json || null,
      created_at: new Date().toISOString(),
      created_by: user.id,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
      version: 1,
      published_at: null
    };

    // Save page
    await kv.set(`page:${locale}:${slug}`, pageData);

    // Save version history
    await kv.set(`page:${locale}:${slug}:version:1`, {
      ...pageData,
      version_created_at: new Date().toISOString()
    });

    // Audit log
    await logAudit('page_created', user.id, {
      slug,
      locale,
      title
    });

    return c.json({
      success: true,
      data: pageData,
      message: 'Page created successfully'
    }, 201);
  } catch (error) {
    console.error('Error creating page:', error);
    return c.json({ error: 'Failed to create page' }, 500);
  }
});

// Update page
cmsApi.put('/pages/:slug', authMiddleware, checkPermission('content_editor'), async (c) => {
  try {
    const user = c.get('user');
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';
    const body = await c.req.json();

    // Get existing page
    const existingPage = await kv.get(`page:${locale}:${slug}`);
    if (!existingPage) {
      return c.json({ error: 'Page not found' }, 404);
    }

    // Update page data
    const updatedPage = {
      ...existingPage,
      ...body,
      slug: existingPage.slug, // Don't allow slug change via update
      locale: existingPage.locale,
      created_at: existingPage.created_at,
      created_by: existingPage.created_by,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
      version: (existingPage.version || 1) + 1
    };

    // Save updated page
    await kv.set(`page:${locale}:${slug}`, updatedPage);

    // Save version history
    await kv.set(`page:${locale}:${slug}:version:${updatedPage.version}`, {
      ...updatedPage,
      version_created_at: new Date().toISOString()
    });

    // Audit log
    await logAudit('page_updated', user.id, {
      slug,
      locale,
      version: updatedPage.version,
      changes: body
    });

    return c.json({
      success: true,
      data: updatedPage,
      message: 'Page updated successfully'
    });
  } catch (error) {
    console.error('Error updating page:', error);
    return c.json({ error: 'Failed to update page' }, 500);
  }
});

// Publish page
cmsApi.post('/pages/:slug/publish', authMiddleware, checkPermission('content_editor'), async (c) => {
  try {
    const user = c.get('user');
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';

    const page = await kv.get(`page:${locale}:${slug}`);
    if (!page) {
      return c.json({ error: 'Page not found' }, 404);
    }

    // Update status to published
    page.status = 'published';
    page.published_at = new Date().toISOString();
    page.published_by = user.id;
    page.updated_at = new Date().toISOString();

    await kv.set(`page:${locale}:${slug}`, page);

    // Audit log
    await logAudit('page_published', user.id, {
      slug,
      locale,
      published_at: page.published_at
    });

    return c.json({
      success: true,
      data: page,
      message: 'Page published successfully'
    });
  } catch (error) {
    console.error('Error publishing page:', error);
    return c.json({ error: 'Failed to publish page' }, 500);
  }
});

// Delete page
cmsApi.delete('/pages/:slug', authMiddleware, checkPermission('seo_manager'), async (c) => {
  try {
    const user = c.get('user');
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';

    const page = await kv.get(`page:${locale}:${slug}`);
    if (!page) {
      return c.json({ error: 'Page not found' }, 404);
    }

    // Soft delete - mark as deleted
    page.status = 'deleted';
    page.deleted_at = new Date().toISOString();
    page.deleted_by = user.id;

    await kv.set(`page:${locale}:${slug}`, page);

    // Audit log
    await logAudit('page_deleted', user.id, {
      slug,
      locale
    });

    return c.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return c.json({ error: 'Failed to delete page' }, 500);
  }
});

// Bulk delete pages
cmsApi.post('/pages/bulk-delete', authMiddleware, checkPermission('seo_manager'), async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { ids } = body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ error: 'ids array is required' }, 400);
    }
    
    const results = [];
    
    for (const id of ids) {
      try {
        // Find page by ID (could be slug or pageId)
        const pages = await kv.getByPrefix('page:');
        const page = pages.find((p: any) => 
          p.value?.slug === id || 
          p.value?.pageId === id ||
          p.key.includes(id)
        );
        
        if (page) {
          // Soft delete
          page.value.status = 'deleted';
          page.value.deleted_at = new Date().toISOString();
          page.value.deleted_by = user.id;
          
          await kv.set(page.key, page.value);
          
          results.push({ id, success: true });
        } else {
          results.push({ id, success: false, error: 'Page not found' });
        }
      } catch (error) {
        results.push({ id, success: false, error: error.message });
      }
    }
    
    // Audit log
    await logAudit('pages_bulk_deleted', user.id, {
      ids,
      results,
      count: results.filter((r: any) => r.success).length
    });
    
    const successCount = results.filter((r: any) => r.success).length;
    
    return c.json({
      success: true,
      deleted: successCount,
      results: results,
      message: `Deleted ${successCount} of ${ids.length} pages`
    });
  } catch (error) {
    console.error('Error bulk deleting pages:', error);
    return c.json({ error: 'Failed to bulk delete pages' }, 500);
  }
});

// Get page version history
cmsApi.get('/pages/:slug/versions', authMiddleware, async (c) => {
  try {
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';

    const versions = await kv.getByPrefix(`page:${locale}:${slug}:version:`);
    const versionsData = versions.map((v: any) => v.value).sort((a: any, b: any) => b.version - a.version);

    return c.json({
      success: true,
      data: versionsData
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    return c.json({ error: 'Failed to fetch versions' }, 500);
  }
});

// Restore page version
cmsApi.post('/pages/:slug/restore/:version', authMiddleware, checkPermission('content_editor'), async (c) => {
  try {
    const user = c.get('user');
    const slug = c.req.param('slug');
    const version = parseInt(c.req.param('version'));
    const locale = c.req.query('locale') || 'en';

    const versionData = await kv.get(`page:${locale}:${slug}:version:${version}`);
    if (!versionData) {
      return c.json({ error: 'Version not found' }, 404);
    }

    const currentPage = await kv.get(`page:${locale}:${slug}`);
    const newVersion = (currentPage?.version || 0) + 1;

    // Restore version as new version
    const restoredPage = {
      ...versionData,
      status: 'draft',
      version: newVersion,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
      restored_from_version: version
    };

    await kv.set(`page:${locale}:${slug}`, restoredPage);
    await kv.set(`page:${locale}:${slug}:version:${newVersion}`, restoredPage);

    // Audit log
    await logAudit('page_restored', user.id, {
      slug,
      locale,
      from_version: version,
      to_version: newVersion
    });

    return c.json({
      success: true,
      data: restoredPage,
      message: `Page restored from version ${version}`
    });
  } catch (error) {
    console.error('Error restoring version:', error);
    return c.json({ error: 'Failed to restore version' }, 500);
  }
});

// ============================================================================
// SEO MANAGEMENT API
// ============================================================================

// Get SEO analysis for page
cmsApi.get('/seo/analyze/:slug', authMiddleware, async (c) => {
  try {
    const slug = c.req.param('slug');
    const locale = c.req.query('locale') || 'en';

    const page = await kv.get(`page:${locale}:${slug}`);
    if (!page) {
      return c.json({ error: 'Page not found' }, 404);
    }

    // Perform SEO analysis
    const analysis = analyzeSEO(page);

    return c.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    return c.json({ error: 'Failed to analyze SEO' }, 500);
  }
});

// SEO Analysis Function
function analyzeSEO(page: any) {
  const issues = [];
  const warnings = [];
  const successes = [];
  let score = 100;

  // Title checks
  if (!page.title) {
    issues.push('Missing title');
    score -= 20;
  } else if (page.title.length < 30) {
    warnings.push('Title is too short (< 30 characters)');
    score -= 5;
  } else if (page.title.length > 60) {
    warnings.push('Title is too long (> 60 characters)');
    score -= 5;
  } else {
    successes.push('Title length is optimal');
  }

  // Meta description checks
  if (!page.meta_description) {
    issues.push('Missing meta description');
    score -= 15;
  } else if (page.meta_description.length < 120) {
    warnings.push('Meta description is too short (< 120 characters)');
    score -= 5;
  } else if (page.meta_description.length > 160) {
    warnings.push('Meta description is too long (> 160 characters)');
    score -= 5;
  } else {
    successes.push('Meta description length is optimal');
  }

  // Canonical URL
  if (!page.canonical) {
    warnings.push('Missing canonical URL');
    score -= 5;
  } else {
    successes.push('Canonical URL is set');
  }

  // Body content checks
  if (!page.body_html || page.body_html.length < 300) {
    warnings.push('Content is too short (< 300 characters)');
    score -= 10;
  }

  // Schema.org
  if (!page.schema_json) {
    warnings.push('No structured data (Schema.org)');
    score -= 10;
  } else {
    successes.push('Structured data is present');
  }

  // Focus keywords
  if (!page.seo_fields?.focus_keywords || page.seo_fields.focus_keywords.length === 0) {
    warnings.push('No focus keywords defined');
    score -= 5;
  }

  // H1 tag
  if (!page.seo_fields?.h1) {
    warnings.push('No H1 tag defined');
    score -= 10;
  } else {
    successes.push('H1 tag is defined');
  }

  return {
    score: Math.max(0, score),
    issues,
    warnings,
    successes,
    summary: `SEO Score: ${Math.max(0, score)}/100 - ${issues.length} issues, ${warnings.length} warnings`
  };
}

// Bulk SEO update
cmsApi.post('/seo/bulk-update', authMiddleware, checkPermission('seo_manager'), async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { slugs, updates } = body;

    if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
      return c.json({ error: 'Slugs array is required' }, 400);
    }

    const results = [];

    for (const slug of slugs) {
      const locale = 'en'; // Default locale
      const page = await kv.get(`page:${locale}:${slug}`);
      
      if (page) {
        const updatedPage = {
          ...page,
          ...updates,
          updated_at: new Date().toISOString(),
          updated_by: user.id
        };
        
        await kv.set(`page:${locale}:${slug}`, updatedPage);
        results.push({ slug, success: true });
      } else {
        results.push({ slug, success: false, error: 'Page not found' });
      }
    }

    // Audit log
    await logAudit('seo_bulk_update', user.id, {
      slugs,
      updates,
      results
    });

    return c.json({
      success: true,
      data: results,
      message: `Updated ${results.filter((r: any) => r.success).length} pages`
    });
  } catch (error) {
    console.error('Error bulk updating SEO:', error);
    return c.json({ error: 'Failed to bulk update SEO' }, 500);
  }
});

// ============================================================================
// REDIRECT MANAGEMENT API
// ============================================================================

// Get all redirects
cmsApi.get('/redirects', authMiddleware, async (c) => {
  try {
    const redirects = await kv.getByPrefix('redirect:');
    const redirectsData = redirects.map((r: any) => r.value);

    return c.json({
      success: true,
      data: redirectsData
    });
  } catch (error) {
    console.error('Error fetching redirects:', error);
    return c.json({ error: 'Failed to fetch redirects' }, 500);
  }
});

// Create redirect
cmsApi.post('/redirects', authMiddleware, checkPermission('seo_manager'), async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { from_path, to_path, status_code = 301, permanent = true } = body;

    if (!from_path || !to_path) {
      return c.json({ error: 'from_path and to_path are required' }, 400);
    }

    const redirectData = {
      from_path,
      to_path,
      status_code,
      permanent,
      created_at: new Date().toISOString(),
      created_by: user.id,
      hit_count: 0
    };

    await kv.set(`redirect:${from_path}`, redirectData);

    // Audit log
    await logAudit('redirect_created', user.id, redirectData);

    return c.json({
      success: true,
      data: redirectData,
      message: 'Redirect created successfully'
    }, 201);
  } catch (error) {
    console.error('Error creating redirect:', error);
    return c.json({ error: 'Failed to create redirect' }, 500);
  }
});

// Delete redirect
cmsApi.delete('/redirects/:from_path', authMiddleware, checkPermission('seo_manager'), async (c) => {
  try {
    const user = c.get('user');
    const fromPath = c.req.param('from_path');

    await kv.del(`redirect:${fromPath}`);

    // Audit log
    await logAudit('redirect_deleted', user.id, { from_path: fromPath });

    return c.json({
      success: true,
      message: 'Redirect deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting redirect:', error);
    return c.json({ error: 'Failed to delete redirect' }, 500);
  }
});

// ============================================================================
// MEDIA LIBRARY API
// ============================================================================

// Get all media
cmsApi.get('/media', authMiddleware, async (c) => {
  try {
    const media = await kv.getByPrefix('media:');
    const mediaData = media.map((m: any) => m.value);

    return c.json({
      success: true,
      data: mediaData
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return c.json({ error: 'Failed to fetch media' }, 500);
  }
});

// Upload media metadata
cmsApi.post('/media', authMiddleware, checkPermission('content_editor'), async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { filename, url, alt_text, size, mime_type } = body;

    if (!filename || !url) {
      return c.json({ error: 'filename and url are required' }, 400);
    }

    const mediaId = `${Date.now()}-${filename}`;
    const mediaData = {
      id: mediaId,
      filename,
      url,
      alt_text: alt_text || '',
      size,
      mime_type,
      uploaded_at: new Date().toISOString(),
      uploaded_by: user.id
    };

    await kv.set(`media:${mediaId}`, mediaData);

    // Audit log
    await logAudit('media_uploaded', user.id, mediaData);

    return c.json({
      success: true,
      data: mediaData,
      message: 'Media uploaded successfully'
    }, 201);
  } catch (error) {
    console.error('Error uploading media:', error);
    return c.json({ error: 'Failed to upload media' }, 500);
  }
});

// ============================================================================
// AUDIT LOGS API
// ============================================================================

// Get audit logs
cmsApi.get('/audit', authMiddleware, checkPermission('auditor'), async (c) => {
  try {
    const { limit = 100 } = c.req.query();
    
    const logs = await kv.getByPrefix('audit:');
    const logsData = logs
      .map((l: any) => l.value)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, parseInt(limit as string));

    return c.json({
      success: true,
      data: logsData
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return c.json({ error: 'Failed to fetch audit logs' }, 500);
  }
});

export { cmsApi };