import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * ⭐ ENHANCED PAGE TRANSITION (Enhancement #8) ⭐
 * 
 * Smooth transitions between pages/routes
 * - Fade + slide animations
 * - GPU-accelerated transforms
 * - Automatic scroll-to-top
 * - Optimized for 60fps performance
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fade-in' | 'fade-out'>('fade-in');

  useEffect(() => {
    // Only transition if location actually changed
    if (location.pathname !== displayLocation.pathname) {
      // Start fade-out
      setTransitionStage('fade-out');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fade-out') {
      // Wait for fade-out to complete, then update content
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fade-in');
        
        // Scroll to top instantly (no smooth scroll for performance)
        window.scrollTo(0, 0);
      }, 200); // 200ms fade-out + slide

      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      style={{
        opacity: transitionStage === 'fade-in' ? 1 : 0,
        transform: transitionStage === 'fade-in' ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
