import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayOpacity?: number; // 0-1 for overlay darkness
  fallbackImage?: string; // Optional fallback image
  startTime?: number; // Start video at specific time (seconds)
}

/**
 * VideoBackground Component
 * 
 * Professional video background with safety features:
 * - Mobile responsive with object-fit
 * - Auto-plays muted (required for autoplay on mobile)
 * - Performance optimized with intersection observer
 * - Dark overlay for text readability
 * - Fallback support for older browsers
 * - No layout breaking (absolute positioning)
 * 
 * @example
 * <VideoBackground 
 *   src="https://example.com/video.mp4" 
 *   overlayOpacity={0.6}
 * />
 */
export function VideoBackground({
  src,
  className = '',
  overlayOpacity = 0.6,
  fallbackImage,
  startTime = 0,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle metadata loaded event for start time
    const handleLoadedMetadata = () => {
      if (startTime > 0) {
        video.currentTime = startTime;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Intersection Observer for performance - pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silent - autoplay may be blocked by browser (normal behavior)
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [startTime]);

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Silent fallback - no console output
    // The solid black background will show instead (graceful degradation)
  };

  return (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${className}`}>
      {/* Theme-Aware Background Layer (always visible as base) */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Video Element (overlays on top of background) */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onError={handleError}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.02)', // Slight scale to prevent edge gaps
          }}
        >
          <source src={src} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image (if video fails AND image provided) */}
      {(hasError && fallbackImage) && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${fallbackImage})`,
          }}
        />
      )}

      {/* Theme-Aware Overlay for Text Readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, var(--background) 0%, transparent 50%, var(--background) 100%)',
          opacity: overlayOpacity * 0.7,
        }}
      />

      {/* Additional Subtle Overlay for Extra Depth */}
      <div 
        className="absolute inset-0 z-[2]" 
        style={{
          backgroundColor: 'var(--background)',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
