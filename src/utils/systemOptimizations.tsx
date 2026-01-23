/**
 * System Optimizations Utility
 * Latest performance and code quality improvements
 * Version: 7.0.0
 */

import { useEffect, useCallback, useMemo, useRef, useState } from 'react';

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Debounce function for performance optimization
 * Limits function execution frequency
 */
export function debounce(
  func: (...args: any[]) => any,
  wait: number
): (...args: any[]) => void {
  let timeout: any;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Ensures function runs at most once per specified time
 */
export function throttle(
  func: (...args: any[]) => any,
  limit: number
): (...args: any[]) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Custom hook for debounced value
 * Optimizes re-renders for frequently changing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for throttled callback
 * Limits callback execution frequency
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  ) as T;
}

// ============================================================================
// LAZY LOADING UTILITIES
// ============================================================================

/**
 * Intersection Observer hook for lazy loading
 * Detects when element enters viewport
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Preload image utility
 * Preloads images before rendering
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 * Batch image preloading
 */
export async function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

// ============================================================================
// MEMORY MANAGEMENT
// ============================================================================

/**
 * Custom hook to cleanup on unmount
 * Prevents memory leaks
 */
export function useCleanup(callback: () => void) {
  useEffect(() => {
    return callback;
  }, [callback]);
}

/**
 * Custom hook for previous value
 * Useful for comparing previous and current values
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

/**
 * Custom hook for mounted state
 * Prevents state updates on unmounted components
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

// ============================================================================
// DATA FETCHING OPTIMIZATIONS
// ============================================================================

/**
 * Custom hook for data fetching with caching
 * Reduces redundant API calls
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cache = useRef<Map<string, T>>(new Map());

  const fetchData = useCallback(async () => {
    // Check cache first
    if (cache.current.has(url)) {
      setData(cache.current.get(url)!);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Cache the result
      cache.current.set(url, result);
      setData(result);
      setError(null);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

/**
 * Custom hook for local storage with type safety
 * Persists state to local storage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// ============================================================================
// FORM OPTIMIZATION
// ============================================================================

/**
 * Custom hook for form state management
 * Optimized form handling
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T
): {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent) => void;
  reset: () => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
} {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const newValue = type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value;

      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (callback: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      callback(values);
    },
    [values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleChange, handleSubmit, reset, setValues };
}

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Custom hook for keyboard navigation
 * Enhances keyboard accessibility
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

/**
 * Custom hook for focus trap
 * Traps focus within an element (for modals, etc.)
 */
export function useFocusTrap(
  ref: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, [ref, isActive]);
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Measure component render time
 * For performance debugging
 */
export function measureRenderTime(componentName: string) {
  const start = performance.now();
  
  useEffect(() => {
    const end = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${end - start}ms`);
  });
}

/**
 * Custom hook for render count
 * Track how many times a component re-renders
 */
export function useRenderCount(componentName: string) {
  const count = useRef(0);
  
  useEffect(() => {
    count.current += 1;
    console.log(`[Render Count] ${componentName}: ${count.current}`);
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format file size
 * Converts bytes to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format number with commas
 * 1000 → 1,000
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate text with ellipsis
 * Long text... → Long text...
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generate unique ID
 * Creates random unique identifier
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone object
 * Creates deep copy of object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Sleep/delay function
 * Async delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// BROWSER DETECTION
// ============================================================================

/**
 * Detect if user is on mobile device
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detect browser
 */
export function detectBrowser(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  
  return 'Unknown';
}

/**
 * Check if browser supports feature
 */
export function supportsWebP(): boolean {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Performance
  debounce,
  throttle,
  useDebounce,
  useThrottle,
  
  // Lazy Loading
  useIntersectionObserver,
  preloadImage,
  preloadImages,
  
  // Memory Management
  useCleanup,
  usePrevious,
  useIsMounted,
  
  // Data Fetching
  useFetch,
  
  // Storage
  useLocalStorage,
  
  // Forms
  useForm,
  
  // Accessibility
  useKeyPress,
  useFocusTrap,
  
  // Performance Monitoring
  measureRenderTime,
  useRenderCount,
  
  // Utilities
  formatFileSize,
  formatNumber,
  truncate,
  generateId,
  deepClone,
  isEmpty,
  sleep,
  
  // Browser
  isMobile,
  detectBrowser,
  supportsWebP,
};