/**
 * BREADCRUMBS COMPONENT WITH SCHEMA
 * 
 * Visual breadcrumbs with proper schema markup for SEO
 * Helps Google understand site hierarchy and generate sitelinks
 */

import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useMasterSEO } from '../utils/master-seo-system';

export function BreadcrumbsSchema() {
  const { breadcrumbs } = useMasterSEO();
  
  // Don't show breadcrumbs on homepage
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 px-6 bg-black border-b border-white/10"
    >
      <ol className="flex items-center gap-2 text-[13px] text-white/60 flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.url} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-white/40" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              // Current page - not clickable
              <span className="text-white/80 font-medium" aria-current="page">
                {index === 0 && <Home className="w-3 h-3 inline mr-1" />}
                {crumb.name}
              </span>
            ) : (
              // Previous pages - clickable
              <Link 
                to={crumb.url} 
                className="hover:text-yellow-500 transition-colors"
              >
                {index === 0 && <Home className="w-3 h-3 inline mr-1" />}
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
