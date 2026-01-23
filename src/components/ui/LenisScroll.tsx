import { useEffect, useRef } from 'react';

/**
 * LenisScroll - Smooth scroll wrapper using Lenis v2.0
 * 
 * Features:
 * - Buttery-smooth 60fps scrolling
 * - GPU-optimized performance
 * - Safe React lifecycle management
 * - Mobile Safari compatible
 * - Zero layout shift
 * 
 * v2.0 Upgrades:
 * - wheelMultiplier: 1.0 → 1.2 (20% more responsive)
 * - duration: 1.0 → 1.2 (smoother easing curve)
 * - Removed prevent function (no element blocking)
 * 
 * @requires npm install lenis
 */

interface LenisScrollProps {
  children: React.ReactNode;
}

export const LenisScroll = ({ children }: LenisScrollProps) => {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initLenis = async () => {
      try {
        // @ts-ignore - Lenis types
        const Lenis = (await import('lenis')).default;

        // Initialize Lenis with optimal settings (v2.0 - Enhanced)
        lenisRef.current = new Lenis({
          duration: 1.2, // ⚡ UPGRADED: Smoother easing curve (was 1.0)
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.2, // ⚡ UPGRADED: 20% more responsive (was 1.0)
          smoothTouch: false, // Disable on touch for better mobile performance
          touchMultiplier: 2,
          infinite: false,
          // ⚡ REMOVED: No longer blocking any elements
        });

        // Animation loop
        function raf(time: number) {
          lenisRef.current?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        // Optional: Listen to scroll events for debugging
        // lenisRef.current.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
        //   console.log({ scroll, limit, velocity, direction, progress });
        // });

      } catch (error) {
        console.warn('Lenis not installed. Run: npm install lenis');
        // Graceful degradation - site works without smooth scroll
      }
    };

    initLenis();

    // Cleanup on unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default LenisScroll;
