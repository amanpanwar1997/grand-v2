import { useEffect, useState } from 'react';

/**
 * ⭐ SCROLL PROGRESS INDICATORS (Enhancement #5) ⭐
 * 
 * Visual progress as user scrolls
 * - Circular progress indicator (top-right)
 * - Linear progress bar (top)
 * - Animated smoothly
 * - Desktop optimized
 */

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      {/* Linear Progress Bar - Top of page */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 z-50 origin-left"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Circular Progress Indicator - Top right */}
      <div
        className="fixed top-6 right-6 w-12 h-12 hidden lg:flex items-center justify-center z-50"
        aria-label={`Scroll progress: ${Math.round(scrollProgress)}%`}
      >
        {/* Background circle */}
        <svg
          className="transform -rotate-90"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          {/* Background track */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#eab308"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s ease-out',
              filter: 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.5))',
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </>
  );
}
