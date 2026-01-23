/**
 * ROUTE & SLUG MANAGEMENT SYSTEM
 * Centralized control of all routes, slugs, and redirects
 * Admin Panel can modify routes and auto-create redirects
 */

import * as kv from './kv_store.tsx';
import { Context } from 'npm:hono';

// ============================================================
// ROUTE SCHEMA
// ============================================================

export interface Route {
  id: string;
  slug: string;
  oldSlugs: string[]; // For redirect history
  title: string;
  component: string;
  template: string;
  parent: string | null;
  children: string[];
  order: number;
  status: 'published' | 'draft' | 'archived';
  type: 'page' | 'post' | 'custom';
  seoId: string; // Link to SEO data
  contentId: string; // Link to content data
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ============================================================
// ROUTE OPERATIONS
// ============================================================

/**
 * Get all routes
 */
export async function getAllRoutes(c: Context) {
  try {
    const routes = await kv.getByPrefix('route:');
    
    return c.json({
      success: true,
      routes: routes.map(r => r.value).sort((a, b) => a.slug.localeCompare(b.slug))
    });
  } catch (error: any) {
    console.error('Error getting routes:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get single route
 */
export async function getRoute(c: Context) {
  try {
    const { id, slug } = await c.req.json();
    
    let route;
    
    if (id) {
      route = await kv.get(`route:${id}`);
    } else if (slug) {
      // Find by slug
      const routes = await kv.getByPrefix('route:');
      route = routes.find(r => r.value.slug === slug)?.value;
    } else {
      return c.json({
        success: false,
        error: 'Route ID or slug is required'
      }, 400);
    }
    
    if (!route) {
      return c.json({
        success: false,
        error: 'Route not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      route
    });
  } catch (error: any) {
    console.error('Error getting route:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Create new route
 */
export async function createRoute(c: Context) {
  try {
    const routeData = await c.req.json();
    
    // Validate required fields
    if (!routeData.slug || !routeData.title) {
      return c.json({
        success: false,
        error: 'Slug and title are required'
      }, 400);
    }
    
    // Check for slug conflicts
    const existingRoutes = await kv.getByPrefix('route:');
    const slugExists = existingRoutes.some(r => r.value.slug === routeData.slug);
    
    if (slugExists) {
      return c.json({
        success: false,
        error: `Slug '${routeData.slug}' already exists`
      }, 409);
    }
    
    // Generate route ID
    const routeId = `route_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create route object
    const route: Route = {
      id: routeId,
      slug: routeData.slug,
      oldSlugs: [],
      title: routeData.title,
      component: routeData.component || 'DefaultPage',
      template: routeData.template || 'default',
      parent: routeData.parent || null,
      children: [],
      order: routeData.order || 0,
      status: routeData.status || 'draft',
      type: routeData.type || 'page',
      seoId: routeData.seoId || '',
      contentId: routeData.contentId || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: routeData.status === 'published' ? new Date().toISOString() : null
    };
    
    // Save route
    await kv.set(`route:${routeId}`, route);
    
    // Update parent's children if exists
    if (route.parent) {
      const parent = await kv.get(`route:${route.parent}`);
      if (parent) {
        parent.children.push(routeId);
        await kv.set(`route:${route.parent}`, parent);
      }
    }
    
    // Create route mapping for quick lookup
    await kv.set(`route:slug:${route.slug}`, routeId);
    
    console.log(`✅ Route created: ${route.slug}`);
    
    return c.json({
      success: true,
      message: 'Route created successfully',
      route
    });
  } catch (error: any) {
    console.error('Error creating route:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update route
 */
export async function updateRoute(c: Context) {
  try {
    const { id, updates } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'Route ID is required'
      }, 400);
    }
    
    // Get existing route
    const route = await kv.get(`route:${id}`);
    
    if (!route) {
      return c.json({
        success: false,
        error: 'Route not found'
      }, 404);
    }
    
    const oldSlug = route.slug;
    const newSlug = updates.slug;
    
    // If slug is changing, handle redirect
    if (newSlug && newSlug !== oldSlug) {
      // Check for conflicts
      const existingRoutes = await kv.getByPrefix('route:');
      const slugExists = existingRoutes.some(r => r.value.slug === newSlug && r.value.id !== id);
      
      if (slugExists) {
        return c.json({
          success: false,
          error: `Slug '${newSlug}' already exists`
        }, 409);
      }
      
      // Add old slug to history
      route.oldSlugs.push(oldSlug);
      
      // Create 301 redirect
      await createAutoRedirect(oldSlug, newSlug, 'slug-change');
      
      // Update slug mapping
      await kv.del(`route:slug:${oldSlug}`);
      await kv.set(`route:slug:${newSlug}`, id);
      
      // Update sitemap
      await updateSitemapForSlugChange(oldSlug, newSlug);
      
      console.log(`✅ Slug changed: ${oldSlug} → ${newSlug}`);
    }
    
    // Update route
    const updatedRoute = {
      ...route,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // If publishing, set publishedAt
    if (updates.status === 'published' && route.status !== 'published') {
      updatedRoute.publishedAt = new Date().toISOString();
    }
    
    await kv.set(`route:${id}`, updatedRoute);
    
    console.log(`✅ Route updated: ${updatedRoute.slug}`);
    
    return c.json({
      success: true,
      message: 'Route updated successfully',
      route: updatedRoute,
      redirectCreated: newSlug && newSlug !== oldSlug
    });
  } catch (error: any) {
    console.error('Error updating route:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Delete route
 */
export async function deleteRoute(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'Route ID is required'
      }, 400);
    }
    
    // Get route
    const route = await kv.get(`route:${id}`);
    
    if (!route) {
      return c.json({
        success: false,
        error: 'Route not found'
      }, 404);
    }
    
    // Check for children
    if (route.children && route.children.length > 0) {
      return c.json({
        success: false,
        error: 'Cannot delete route with children. Delete children first or reassign them.'
      }, 400);
    }
    
    // Backup before delete
    await kv.set(`route:deleted:${id}:${Date.now()}`, route);
    
    // Remove from parent's children
    if (route.parent) {
      const parent = await kv.get(`route:${route.parent}`);
      if (parent) {
        parent.children = parent.children.filter((cid: string) => cid !== id);
        await kv.set(`route:${route.parent}`, parent);
      }
    }
    
    // Delete route
    await kv.del(`route:${id}`);
    await kv.del(`route:slug:${route.slug}`);
    
    console.log(`✅ Route deleted: ${route.slug}`);
    
    return c.json({
      success: true,
      message: 'Route deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting route:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// SLUG OPERATIONS
// ============================================================

/**
 * Check slug availability
 */
export async function checkSlugAvailability(c: Context) {
  try {
    const { slug, excludeId } = await c.req.json();
    
    if (!slug) {
      return c.json({
        success: false,
        error: 'Slug is required'
      }, 400);
    }
    
    const routes = await kv.getByPrefix('route:');
    const exists = routes.some(r => r.value.slug === slug && r.value.id !== excludeId);
    
    return c.json({
      success: true,
      slug,
      available: !exists,
      suggestions: exists ? await generateSlugSuggestions(slug) : []
    });
  } catch (error: any) {
    console.error('Error checking slug:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Generate slug suggestions
 */
async function generateSlugSuggestions(slug: string): Promise<string[]> {
  const suggestions: string[] = [];
  
  // Add numeric suffixes
  for (let i = 1; i <= 5; i++) {
    suggestions.push(`${slug}-${i}`);
  }
  
  // Add date suffix
  const date = new Date();
  suggestions.push(`${slug}-${date.getFullYear()}`);
  suggestions.push(`${slug}-${date.getMonth() + 1}-${date.getFullYear()}`);
  
  return suggestions;
}

// ============================================================
// REDIRECT OPERATIONS
// ============================================================

/**
 * Create automatic redirect when slug changes
 */
async function createAutoRedirect(fromSlug: string, toSlug: string, reason: string) {
  const redirectId = `redirect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const redirect = {
    id: redirectId,
    from: fromSlug,
    to: toSlug,
    type: '301',
    reason,
    automatic: true,
    hits: 0,
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  };
  
  await kv.set(`redirect:${redirectId}`, redirect);
  await kv.set(`redirect:from:${fromSlug}`, redirectId);
  
  console.log(`✅ Auto-redirect created: ${fromSlug} → ${toSlug}`);
}

/**
 * Update sitemap when slug changes
 */
async function updateSitemapForSlugChange(oldSlug: string, newSlug: string) {
  // Get sitemap
  const sitemap = await kv.get('sitemap:xml');
  
  if (sitemap) {
    // Replace old slug with new slug
    const updatedSitemap = sitemap.replace(
      new RegExp(oldSlug, 'g'),
      newSlug
    );
    
    await kv.set('sitemap:xml', updatedSitemap);
    await kv.set('sitemap:updated', new Date().toISOString());
    
    console.log(`✅ Sitemap updated for slug change`);
  }
}

// ============================================================
// ROUTE HIERARCHY
// ============================================================

/**
 * Get route tree (hierarchical structure)
 */
export async function getRouteTree(c: Context) {
  try {
    const routes = await kv.getByPrefix('route:');
    const routeMap = new Map(routes.map(r => [r.value.id, r.value]));
    
    // Build tree
    const tree: any[] = [];
    
    // Find root routes (no parent)
    const rootRoutes = routes.filter(r => !r.value.parent);
    
    // Recursively build tree
    const buildNode = (route: any): any => {
      return {
        ...route,
        children: route.children.map((childId: string) => {
          const child = routeMap.get(childId);
          return child ? buildNode(child) : null;
        }).filter(Boolean)
      };
    };
    
    for (const route of rootRoutes) {
      tree.push(buildNode(route.value));
    }
    
    return c.json({
      success: true,
      tree: tree.sort((a, b) => a.order - b.order)
    });
  } catch (error: any) {
    console.error('Error getting route tree:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Reorder routes
 */
export async function reorderRoutes(c: Context) {
  try {
    const { updates } = await c.req.json();
    
    // updates is array of { id, order }
    if (!Array.isArray(updates)) {
      return c.json({
        success: false,
        error: 'Updates must be an array'
      }, 400);
    }
    
    // Update each route's order
    for (const update of updates) {
      const route = await kv.get(`route:${update.id}`);
      if (route) {
        route.order = update.order;
        route.updatedAt = new Date().toISOString();
        await kv.set(`route:${update.id}`, route);
      }
    }
    
    console.log(`✅ Routes reordered: ${updates.length} routes`);
    
    return c.json({
      success: true,
      message: 'Routes reordered successfully',
      updated: updates.length
    });
  } catch (error: any) {
    console.error('Error reordering routes:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// BULK OPERATIONS
// ============================================================

/**
 * Bulk update route status
 */
export async function bulkUpdateRoutes(c: Context) {
  try {
    const { routeIds, updates } = await c.req.json();
    
    if (!Array.isArray(routeIds) || !updates) {
      return c.json({
        success: false,
        error: 'Route IDs array and updates object are required'
      }, 400);
    }
    
    let updated = 0;
    
    for (const id of routeIds) {
      const route = await kv.get(`route:${id}`);
      if (route) {
        Object.assign(route, updates);
        route.updatedAt = new Date().toISOString();
        await kv.set(`route:${id}`, route);
        updated++;
      }
    }
    
    console.log(`✅ Bulk update: ${updated} routes`);
    
    return c.json({
      success: true,
      message: `${updated} routes updated successfully`,
      updated
    });
  } catch (error: any) {
    console.error('Error bulk updating routes:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}
