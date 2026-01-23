/**
 * ============================================================================
 * DASHBOARD API - Optimized Stats Endpoint
 * ============================================================================
 * 
 * Fast dashboard stats without loading full page data
 * Returns only summary statistics
 * 
 * 🚀 Performance: < 200ms response time
 * ============================================================================
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ============================================================================
// DASHBOARD STATS (FAST!)
// ============================================================================

/**
 * GET /dashboard/stats
 * Returns summary stats without loading all data
 */
app.get('/make-server-9c8e64e4/dashboard/stats', async (c) => {
  try {
    const startTime = Date.now();
    
    // Get counts only (fast!)
    const [pagesResult, leadsResult, mediaResult] = await Promise.all([
      kv.getByPrefix('page:'),
      kv.getByPrefix('chatbot_lead:'),
      kv.getByPrefix('media:')
    ]);
    
    const pages = pagesResult.map(p => p.value);
    const leads = leadsResult.map(l => l.value);
    
    // Calculate stats
    const stats = {
      // Pages
      totalPages: pages.length,
      publishedPages: pages.filter((p: any) => p.status === 'published').length,
      draftPages: pages.filter((p: any) => p.status === 'draft').length,
      avgSeoScore: pages.length > 0 
        ? Math.round(pages.reduce((acc: number, p: any) => acc + (p.score || 0), 0) / pages.length)
        : 0,
      pagesNeedingAttention: pages.filter((p: any) => (p.score || 0) < 80).length,
      
      // Leads
      totalLeads: leads.length,
      newLeads: leads.filter((l: any) => l.status === 'new').length,
      contactedLeads: leads.filter((l: any) => l.status === 'contacted').length,
      
      // Media
      totalMedia: mediaResult.length,
      
      // Recent activity (last 7 days)
      recentPages: pages.filter((p: any) => {
        const created = new Date(p.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return created > weekAgo;
      }).length,
      
      recentLeads: leads.filter((l: any) => {
        const created = new Date(l.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return created > weekAgo;
      }).length,
    };
    
    const responseTime = Date.now() - startTime;
    
    return c.json({
      success: true,
      stats,
      meta: {
        responseTime: `${responseTime}ms`,
        cached: false,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// ============================================================================
// RECENT ACTIVITY (LIMITED)
// ============================================================================

/**
 * GET /dashboard/recent-activity
 * Returns last 10 activities
 */
app.get('/make-server-9c8e64e4/dashboard/recent-activity', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '10');
    
    const activities = await kv.getByPrefix('activity:');
    
    // Sort by timestamp and limit
    const recentActivities = activities
      .map(a => a.value)
      .filter(a => a)
      .sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, limit);
    
    return c.json({
      success: true,
      activities: recentActivities
    });
    
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// ============================================================================
// RECENT LEADS (LIMITED)
// ============================================================================

/**
 * GET /dashboard/recent-leads
 * Returns last 5 leads
 */
app.get('/make-server-9c8e64e4/dashboard/recent-leads', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '5');
    
    const leadsResult = await kv.getByPrefix('chatbot_lead:');
    const leads = leadsResult.map(l => l.value);
    
    // Sort by most recent
    const recentLeads = leads
      .sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
    
    return c.json({
      success: true,
      leads: recentLeads
    });
    
  } catch (error) {
    console.error('Error fetching recent leads:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// ============================================================================
// PAGES NEEDING ATTENTION
// ============================================================================

/**
 * GET /dashboard/pages-attention
 * Returns pages with low SEO scores
 */
app.get('/make-server-9c8e64e4/dashboard/pages-attention', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '5');
    
    const pagesResult = await kv.getByPrefix('page:');
    const pages = pagesResult.map(p => p.value);
    
    // Filter low scoring pages
    const lowScorePages = pages
      .filter((p: any) => (p.score || 0) < 80)
      .sort((a: any, b: any) => (a.score || 0) - (b.score || 0))
      .slice(0, limit)
      .map((p: any) => ({
        slug: p.slug,
        title: p.title,
        score: p.score || 0,
        issues: identifySEOIssues(p)
      }));
    
    return c.json({
      success: true,
      pages: lowScorePages
    });
    
  } catch (error) {
    console.error('Error fetching pages needing attention:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Identify SEO issues for a page
 */
function identifySEOIssues(page: any): string[] {
  const issues: string[] = [];
  
  if (!page.title) {
    issues.push('Missing title');
  } else if (page.title.length < 30 || page.title.length > 60) {
    issues.push('Title length not optimal');
  }
  
  if (!page.description) {
    issues.push('Missing description');
  } else if (page.description.length < 120 || page.description.length > 160) {
    issues.push('Description length not optimal');
  }
  
  if (!page.keywords || page.keywords.length === 0) {
    issues.push('Missing keywords');
  }
  
  if (!page.h1) {
    issues.push('Missing H1');
  }
  
  if (!page.canonical) {
    issues.push('Missing canonical URL');
  }
  
  if (!page.schema) {
    issues.push('Missing schema markup');
  }
  
  return issues;
}

// ============================================================================
// EXPORT
// ============================================================================

export default app;
