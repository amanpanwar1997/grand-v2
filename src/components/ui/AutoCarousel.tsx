import { ReactNode, useEffect, useRef } from 'react';

interface AutoCarouselProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * AutoCarousel Component
 * Implements the Inchtomilez Design System Auto Carousel
 * - Infinite loop, smooth scroll, auto-scrolling
 * - Mobile: Touch/swipe gestures with snap-scroll
 * - Desktop: Auto-scroll with pause on hover
 * - Default gap: gap-6 (24px) per Guidelines.md
 * - Speed options: 'slow' (45s), 'normal' (30s), 'fast' (20s)
 * - Automatically duplicates children for seamless loop
 */
export function AutoCarousel({ 
  children, 
  speed = 'normal', 
  className = '',
  pauseOnHover = true 
}: AutoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speedMap = {
      slow: 0.2,
      normal: 0.3,
      fast: 0.5,
    };

    let scrollPosition = 0;
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += speedMap[speed];
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    if (pauseOnHover) {
      const handleMouseEnter = () => { isPaused = true; };
      const handleMouseLeave = () => { isPaused = false; };
      const handleTouchStart = () => { isPaused = true; };
      const handleTouchEnd = () => { isPaused = false; };
      
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('touchstart', handleTouchStart);
      scrollContainer.addEventListener('touchend', handleTouchEnd);

      return () => {
        cancelAnimationFrame(animationId);
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      };
    }

    return () => cancelAnimationFrame(animationId);
  }, [speed, pauseOnHover]);

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        ref={scrollRef} 
        className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${className}`}
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
        {/* Duplicate for infinite loop effect */}
        {children}
      </div>
    </div>
  );
}
