/**
 * ⚠️ DEPRECATED - USE seo-master.tsx INSTEAD
 * 
 * This file is kept for backwards compatibility only.
 * It redirects to the new master SEO system.
 * 
 * Migration:
 * OLD: import { useSEO } from './utils/seoConfig';
 * NEW: import { useSEO } from './utils/seo-master';
 */

export { 
  useSEO, 
  SITE_CONFIG, 
  SEO_DATABASE,
  generateBreadcrumbs,
  SITELINKS_SEARCH_BOX,
  ORGANIZATION_SCHEMA
} from './seo-master';

// Backward compatibility aliases
import { SEO_DATABASE, SITE_CONFIG } from './seo-master';

// Export SEO_CONFIG as alias for SEO_DATABASE
export const SEO_CONFIG = SEO_DATABASE;

// Export getSEOConfig function for backward compatibility
export function getSEOConfig(path: string) {
  return SEO_DATABASE[path] || SEO_DATABASE['/'];
}

// Export updateSEOConfig for admin panel
export async function updateSEOConfig(path: string, config: any) {
  // This now calls the backend API
  const response = await fetch(`https://${process.env.SUPABASE_PROJECT_ID || 'your-project'}.supabase.co/functions/v1/make-server-9c8e64e4/api/seo/pages`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || ''}`
    },
    body: JSON.stringify({
      slug: path,
      ...config
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update SEO config');
  }
  
  return response.json();
}

// Export getAllSEOConfigs for admin panel
export function getAllSEOConfigs() {
  return Object.entries(SEO_DATABASE).map(([path, config]) => ({
    path,
    ...config
  }));
}

// Export default site config
export { SITE_CONFIG as default };
