/**
 * ⚠️ DEPRECATED - USE SEOHeadUnified INSTEAD
 * 
 * This file is kept for backwards compatibility only.
 * It redirects to the new unified SEO system.
 * 
 * Migration:
 * OLD: import { SEOHeadSSG } from './components/SEOHeadSSG';
 * NEW: import { SEOHeadUnified } from './components/SEOHeadUnified';
 */

import { SEOHeadUnified } from './SEOHeadUnified';

export { SEOHeadUnified as SEOHeadSSG };
export default SEOHeadUnified;
