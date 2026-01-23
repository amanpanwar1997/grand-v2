import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadOptions {
  threshold?: number; // Intersection threshold (0-1)
  rootMargin?: string; // Margin around root
  triggerOnce?: boolean; // Only trigger once
}

/**
 * ⭐ SMART LAZY LOADING HOOK (Enhancement #21) ⭐
 * 
 * Load content just before it enters viewport
 * - Intersection Observer API
 * - Priority loading for above-fold
 * - Fade-in on load
 * - Better Core Web Vitals
 */

export function useLazyLoad({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
}: UseLazyLoadOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible, hasLoaded };
}

/**
 * Lazy Load Image Component
 */
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
}: LazyImageProps) {
  const { ref, isVisible, hasLoaded } = useLazyLoad({ threshold: 0.1, rootMargin: '100px' });
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Placeholder */}
      {!imageLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      {/* Actual image - only load when visible */}
      {hasLoaded && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}
    </div>
  );
}

/**
 * Lazy Load Component Wrapper
 */
interface LazyComponentProps {
  children: React.ReactNode;
  className?: string;
  fadeIn?: boolean;
  threshold?: number;
}

export function LazyComponent({
  children,
  className = '',
  fadeIn = true,
  threshold = 0.1,
}: LazyComponentProps) {
  const { ref, isVisible } = useLazyLoad({ threshold });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} ${
        fadeIn
          ? `transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`
          : ''
      }`}
    >
      {isVisible ? children : null}
    </div>
  );
}
