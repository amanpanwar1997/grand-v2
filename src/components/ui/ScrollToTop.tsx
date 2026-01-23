import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to top on route changes.
 * Preserves scroll position for hash links (e.g., /page#section).
 * 
 * Usage: Add to App.tsx inside <Router>
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash (anchor link)
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant', // Instant scroll (no smooth animation)
      });
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
}
