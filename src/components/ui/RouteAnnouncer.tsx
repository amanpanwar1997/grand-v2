import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/**
 * RouteAnnouncer Component
 * 
 * Announces route changes to screen readers for accessibility.
 * Improves WCAG compliance and Lighthouse accessibility score.
 * 
 * Usage: Add to App.tsx inside <Router>
 */
export function RouteAnnouncer() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // Find the announcement element
    const announcement = document.getElementById('route-announcer');
    
    if (announcement) {
      // Wait for document title to update (SEOHead updates it)
      setTimeout(() => {
        const title = document.title.split(' | ')[0] || 'Page';
        setPageTitle(title);
        announcement.textContent = `Navigated to ${title}`;
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div
      id="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    />
  );
}