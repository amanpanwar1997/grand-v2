import { useEffect, useState } from 'react';

/**
 * ⭐ CURSOR SPOTLIGHT EFFECT (Enhancement #2) ⭐
 * 
 * Subtle radial gradient glow that follows the cursor
 * - Yellow/white subtle glow (3-5% opacity)
 * - Smooth lag animation
 * - Desktop only (hidden on mobile/tablet)
 * - Zero performance impact (GPU-accelerated)
 */

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop (>1024px)
    const checkViewport = () => {
      setIsVisible(window.innerWidth > 1024);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    const updatePosition = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  if (!isVisible) return null;

  // Cursor spotlight disabled - no yellow glow
  return null;
}
