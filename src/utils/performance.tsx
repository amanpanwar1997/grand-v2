/**
 * Performance Optimization Utilities
 * Version: 2.0 - Phase 1 Performance Upgrade ⚡
 * 
 * Best practices for Inchtomilez website performance
 * 
 * New in Phase 1:
 * ✅ Core Web Vitals monitoring
 * ✅ Bundle size tracking
 * ✅ Animation performance
 * ✅ Memory leak detection
 */

// Debounce function for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Intersection Observer for lazy loading
export function createLazyObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  });
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Performance marks for monitoring
export const perfMark = {
  start: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  },
  end: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`);
      try {
        performance.measure(name, `${name}-start`, `${name}-end`);
      } catch (e) {
        // Mark doesn't exist, ignore
      }
    }
  },
  clear: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMeasures(name);
    }
  },
};

// Dynamically import components
export async function dynamicImport<T>(
  importFunc: () => Promise<{ default: T }>
): Promise<T> {
  const module = await importFunc();
  return module.default;
}

// Monitor page transition performance
export function logPageTransition(from: string, to: string, duration: number): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Page transition: ${from} → ${to} in ${duration.toFixed(2)}ms`);
  }
}

// Prefetch DNS for external resources
export function prefetchDNS(domains: string[]): void {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
}

// Preconnect to external resources  
export function preconnect(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Report Web Vitals (for monitoring)
export function reportWebVitals(metric: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vitals:', metric.name, metric.value);
  }
}

// Optimize images with intersection observer
export function lazyLoadImages(): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ⚡ PHASE 1: Core Web Vitals Monitoring
export function measureWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Measure FCP (First Contentful Paint)
  const paintObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('⚡ FCP:', entry.startTime.toFixed(2), 'ms');
      }
    }
  });

  try {
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Not supported
  }

  // Measure LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('⚡ LCP:', lastEntry.startTime.toFixed(2), 'ms');
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Not supported
  }

  // Measure CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    console.log('⚡ CLS:', clsValue.toFixed(4));
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Not supported
  }

  // Measure TTFB (Time to First Byte)
  window.addEventListener('load', () => {
    const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      console.log('⚡ TTFB:', ttfb.toFixed(2), 'ms');
    }
  });
}

// ⚡ PHASE 1: Bundle Size Tracker
export function trackBundleSize(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let totalJS = 0;
    let totalCSS = 0;
    let totalImages = 0;

    resources.forEach((resource) => {
      const size = resource.transferSize || 0;
      
      if (resource.name.endsWith('.js')) {
        totalJS += size;
      } else if (resource.name.endsWith('.css')) {
        totalCSS += size;
      } else if (/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(resource.name)) {
        totalImages += size;
      }
    });

    console.log('📦 Bundle Sizes:');
    console.log('  JavaScript:', (totalJS / 1024).toFixed(2), 'KB');
    console.log('  CSS:', (totalCSS / 1024).toFixed(2), 'KB');
    console.log('  Images:', (totalImages / 1024).toFixed(2), 'KB');
    console.log('  Total:', ((totalJS + totalCSS + totalImages) / 1024).toFixed(2), 'KB');
  });
}

// ⚡ PHASE 1: Animation Performance Tracker
export function monitorAnimationPerformance(): void {
  if (typeof window === 'undefined') return;

  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;

  function measureFPS() {
    const currentTime = performance.now();
    frameCount++;

    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;

      // Warn if FPS drops below 30
      if (fps < 30 && process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Low FPS detected:', fps, 'fps');
      }
    }

    requestAnimationFrame(measureFPS);
  }

  requestAnimationFrame(measureFPS);
}

// ⚡ PHASE 1: Memory Leak Detector
export function detectMemoryLeaks(): void {
  if (typeof window === 'undefined' || !(performance as any).memory) return;

  setInterval(() => {
    const memory = (performance as any).memory;
    const used = (memory.usedJSHeapSize / 1048576).toFixed(2);
    const total = (memory.totalJSHeapSize / 1048576).toFixed(2);
    const limit = (memory.jsHeapSizeLimit / 1048576).toFixed(2);

    if (process.env.NODE_ENV === 'development') {
      console.log(`💾 Memory: ${used}MB / ${total}MB (Limit: ${limit}MB)`);
    }

    // Warn if using > 80% of heap
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
      console.warn('⚠️ High memory usage detected! Possible memory leak.');
    }
  }, 30000); // Check every 30 seconds
}

// ⚡ PHASE 1: Initialize all performance monitoring
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Only run in development or if explicitly enabled
  if (process.env.NODE_ENV === 'development') {
    measureWebVitals();
    trackBundleSize();
    monitorAnimationPerformance();
    detectMemoryLeaks();
    
    console.log('⚡ Phase 1 Performance Monitoring Active');
  }
}
