import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    // Find the announcement element
    const announcement = document.getElementById('route-announcer');
    
    if (announcement) {
      // Wait for document title to update (SEOHead updates it)
      setTimeout(() => {
        const pageTitle = document.title.split(' | ')[0] || 'Page';
        announcement.textContent = `Navigated to ${pageTitle}`;
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
