/**
 * SEO Editor API
 * Handles reading and updating the seoConfig.tsx file
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

// SEO Data interface
export interface SEOFormData {
  title: string;
  description: string;
  keywords: string; // comma-separated
  h1: string;
  canonical: string;
  ogType: string;
  ogImage: string;
  schema: string;
  noindex: boolean;
}

// Version data for history
export interface VersionData {
  version: number;
  data: SEOFormData;
  changedBy: string;
  changedAt: string;
  changeType: 'created' | 'updated' | 'published';
}

/**
 * Get SEO config for a specific page
 */
export async function getSEOConfig(c: Context) {
  try {
    const { slug } = await c.req.json();
    
    if (!slug) {
      return c.json({ success: false, error: 'Slug is required' }, 400);
    }

    // For now, we'll store updates in KV store
    // This allows editing without modifying the actual file (safer)
    const override = await kv.get(`seo:override:${slug}`);
    
    if (override) {
      return c.json({
        success: true,
        data: override,
        source: 'override'
      });
    }

    return c.json({
      success: true,
      message: 'Using default seoConfig.tsx data',
      source: 'default'
    });
  } catch (error) {
    console.error('Error getting SEO config:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Update SEO config for a specific page
 */
export async function updateSEOConfig(c: Context) {
  try {
    const { slug, data, user } = await c.req.json();

    if (!slug || !data) {
      return c.json({ success: false, error: 'Slug and data are required' }, 400);
    }

    // Validate the data
    const validation = validateSEOData(data);
    if (!validation.isValid) {
      return c.json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      }, 400);
    }

    // Get current version number
    const versions = await kv.getByPrefix(`seo:version:${slug}:`);
    const nextVersion = versions.length + 1;

    // Store the update as an override in KV store
    await kv.set(`seo:override:${slug}`, data);

    // Save version history
    const versionData: VersionData = {
      version: nextVersion,
      data,
      changedBy: user || 'admin',
      changedAt: new Date().toISOString(),
      changeType: 'updated'
    };
    await kv.set(`seo:version:${slug}:${nextVersion}`, versionData);

    // Update the "current version" pointer
    await kv.set(`seo:current:${slug}`, nextVersion);

    console.log(`SEO config updated for ${slug}, version ${nextVersion}`);

    return c.json({
      success: true,
      message: 'SEO config updated successfully',
      version: nextVersion,
      data
    });
  } catch (error) {
    console.error('Error updating SEO config:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Save draft (auto-save)
 */
export async function saveDraft(c: Context) {
  try {
    const { slug, data, user } = await c.req.json();

    if (!slug || !data) {
      return c.json({ success: false, error: 'Slug and data are required' }, 400);
    }

    // Store draft with timestamp
    const timestamp = Date.now();
    await kv.set(`seo:draft:${slug}`, {
      data,
      savedAt: new Date().toISOString(),
      savedBy: user || 'admin',
      timestamp
    });

    return c.json({
      success: true,
      message: 'Draft saved',
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Get draft
 */
export async function getDraft(c: Context) {
  try {
    const { slug } = await c.req.json();

    if (!slug) {
      return c.json({ success: false, error: 'Slug is required' }, 400);
    }

    const draft = await kv.get(`seo:draft:${slug}`);

    if (!draft) {
      return c.json({
        success: true,
        hasDraft: false
      });
    }

    return c.json({
      success: true,
      hasDraft: true,
      draft
    });
  } catch (error) {
    console.error('Error getting draft:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Get version history
 */
export async function getVersionHistory(c: Context) {
  try {
    const { slug } = await c.req.json();

    if (!slug) {
      return c.json({ success: false, error: 'Slug is required' }, 400);
    }

    const versions = await kv.getByPrefix(`seo:version:${slug}:`);
    
    // Sort by version number (descending)
    versions.sort((a, b) => b.version - a.version);

    return c.json({
      success: true,
      versions
    });
  } catch (error) {
    console.error('Error getting version history:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Restore to a specific version
 */
export async function restoreVersion(c: Context) {
  try {
    const { slug, version, user } = await c.req.json();

    if (!slug || version === undefined) {
      return c.json({ success: false, error: 'Slug and version are required' }, 400);
    }

    // Get the version data
    const versionData = await kv.get(`seo:version:${slug}:${version}`);

    if (!versionData) {
      return c.json({ success: false, error: 'Version not found' }, 404);
    }

    // Restore by creating a new version with the old data
    const versions = await kv.getByPrefix(`seo:version:${slug}:`);
    const nextVersion = versions.length + 1;

    // Update current override
    await kv.set(`seo:override:${slug}`, versionData.data);

    // Save as new version
    const newVersionData: VersionData = {
      version: nextVersion,
      data: versionData.data,
      changedBy: user || 'admin',
      changedAt: new Date().toISOString(),
      changeType: 'updated'
    };
    await kv.set(`seo:version:${slug}:${nextVersion}`, newVersionData);
    await kv.set(`seo:current:${slug}`, nextVersion);

    console.log(`Restored ${slug} to version ${version}, saved as version ${nextVersion}`);

    return c.json({
      success: true,
      message: `Restored to version ${version}`,
      newVersion: nextVersion
    });
  } catch (error) {
    console.error('Error restoring version:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Validate SEO data
 */
function validateSEOData(data: SEOFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.length > 60) {
    errors.push('Title must be 60 characters or less');
  } else if (data.title.length < 30) {
    errors.push('Title should be at least 30 characters');
  }

  // Description validation
  if (!data.description || data.description.trim().length === 0) {
    errors.push('Description is required');
  } else if (data.description.length > 160) {
    errors.push('Description must be 160 characters or less');
  } else if (data.description.length < 120) {
    errors.push('Description should be at least 120 characters');
  }

  // H1 validation
  if (!data.h1 || data.h1.trim().length === 0) {
    errors.push('H1 heading is required');
  }

  // Canonical URL validation
  if (!data.canonical || data.canonical.trim().length === 0) {
    errors.push('Canonical URL is required');
  } else if (!data.canonical.startsWith('http://') && !data.canonical.startsWith('https://')) {
    errors.push('Canonical URL must start with http:// or https://');
  }

  // Keywords validation
  if (data.keywords) {
    const keywordArray = data.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (keywordArray.length < 3) {
      errors.push('At least 3 keywords are recommended');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Bulk update multiple pages
 */
export async function bulkUpdateSEO(c: Context) {
  try {
    const { updates, user } = await c.req.json();

    if (!updates || !Array.isArray(updates)) {
      return c.json({ success: false, error: 'Updates array is required' }, 400);
    }

    const results = [];

    for (const update of updates) {
      const { slug, data } = update;

      try {
        // Store the update
        await kv.set(`seo:override:${slug}`, data);

        // Save version
        const versions = await kv.getByPrefix(`seo:version:${slug}:`);
        const nextVersion = versions.length + 1;

        const versionData: VersionData = {
          version: nextVersion,
          data,
          changedBy: user || 'admin',
          changedAt: new Date().toISOString(),
          changeType: 'updated'
        };
        await kv.set(`seo:version:${slug}:${nextVersion}`, versionData);

        results.push({
          slug,
          success: true,
          version: nextVersion
        });
      } catch (error) {
        results.push({
          slug,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.success).length;

    return c.json({
      success: true,
      message: `Updated ${successCount} of ${updates.length} pages`,
      results
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Search pages by content
 */
export async function searchPages(c: Context) {
  try {
    const { query } = await c.req.json();

    if (!query || query.trim().length === 0) {
      return c.json({ success: false, error: 'Search query is required' }, 400);
    }

    // Get all overrides
    const allOverrides = await kv.getByPrefix('seo:override:');
    
    const results = allOverrides.filter((override: any) => {
      const data = override;
      const searchText = `${data.title} ${data.description} ${data.h1} ${data.keywords}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    return c.json({
      success: true,
      results,
      count: results.length
    });
  } catch (error) {
    console.error('Error searching pages:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}

/**
 * Export SEO config (for code generation)
 */
export async function exportSEOConfig(c: Context) {
  try {
    const { slug } = await c.req.json();

    if (!slug) {
      return c.json({ success: false, error: 'Slug is required' }, 400);
    }

    const data = await kv.get(`seo:override:${slug}`);

    if (!data) {
      return c.json({ success: false, error: 'No override found for this page' }, 404);
    }

    // Generate code for seoConfig.tsx
    const keywordsArray = data.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0);

    const code = `  "${slug}": {
    title: "${data.title.replace(/"/g, '\\"')}",
    description: "${data.description.replace(/"/g, '\\"')}",
    keywords: [${keywordsArray.map((k: string) => `"${k}"`).join(', ')}],
    h1: "${data.h1.replace(/"/g, '\\"')}",
    canonical: "${data.canonical}",
    ogType: "${data.ogType}",
    ogImage: "${data.ogImage}",
    schema: "${data.schema}",
    noindex: ${data.noindex},
  },`;

    return c.json({
      success: true,
      code,
      instructions: [
        '1. Copy the code above',
        '2. Open /utils/seoConfig.tsx',
        '3. Find the entry for this page',
        '4. Replace it with the new code',
        '5. Save the file'
      ]
    });
  } catch (error) {
    console.error('Error exporting SEO config:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
}
