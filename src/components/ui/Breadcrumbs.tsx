import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

/**
 * Breadcrumbs Component
 * 
 * Visual breadcrumb navigation with proper accessibility.
 * Follows design system: explicit typography, yellow-500 accents.
 * 
 * @param items - Array of breadcrumb items { name, path }
 * @param className - Optional additional CSS classes
 * @param showHomeIcon - Show home icon for first item (default: false)
 * 
 * Example:
 * <Breadcrumbs items={[
 *   { name: 'Home', path: '/' },
 *   { name: 'Services', path: '/services' },
 *   { name: 'SEO', path: '/services/seo' },
 * ]} />
 */
export function Breadcrumbs({ 
  items, 
  className = '', 
  showHomeIcon = false 
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`py-4 ${className}`}
    >
      <div className="container mx-auto px-6">
        <ol className="flex items-center gap-2 text-[13px] flex-wrap">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li 
                key={item.path} 
                className="flex items-center gap-2"
              >
                {/* Separator */}
                {!isFirst && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                )}

                {/* Breadcrumb Item */}
                {isLast ? (
                  <span 
                    className="text-white font-medium text-[13px]"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-yellow-500 transition-colors text-[13px] font-normal flex items-center gap-1.5"
                  >
                    {isFirst && showHomeIcon && (
                      <Home className="w-3.5 h-3.5" />
                    )}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
