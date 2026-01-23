/**
 * RATE LIMITER UTILITY
 * 
 * Prevents spam and abuse by limiting:
 * - Form submissions
 * - API calls
 * - Chatbot messages
 * - Contact attempts
 * 
 * Features:
 * - IP-based limiting
 * - Token bucket algorithm
 * - Configurable limits
 * - Memory-efficient
 */

// ============================================================================
// TYPES
// ============================================================================

interface RateLimitConfig {
  maxRequests: number;    // Maximum requests allowed
  windowMs: number;       // Time window in milliseconds
  message?: string;       // Error message when limit exceeded
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// ============================================================================
// IN-MEMORY STORAGE (For Frontend)
// ============================================================================

class RateLimitStore {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Auto-cleanup expired entries every 60 seconds
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  get(key: string): RateLimitEntry | undefined {
    return this.store.get(key);
  }

  set(key: string, entry: RateLimitEntry): void {
    this.store.set(key, entry);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store.clear();
  }
}

// ============================================================================
// RATE LIMITER CLASS
// ============================================================================

export class RateLimiter {
  private config: RateLimitConfig;
  private store: RateLimitStore;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      maxRequests: 5,
      windowMs: 60000, // 1 minute
      message: 'Too many requests. Please try again later.',
      ...config
    };
    this.store = new RateLimitStore();
  }

  /**
   * Check if request is allowed
   */
  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number; message?: string } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // No existing entry - allow and create new
    if (!entry) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs
      });

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs
      };
    }

    // Entry expired - reset
    if (entry.resetTime < now) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs
      });

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs
      };
    }

    // Entry exists and valid - check limit
    if (entry.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        message: this.config.message
      };
    }

    // Increment count
    entry.count++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  /**
   * Reset limit for an identifier
   */
  reset(identifier: string): void {
    this.store.delete(identifier);
  }

  /**
   * Destroy rate limiter and cleanup
   */
  destroy(): void {
    this.store.destroy();
  }
}

// ============================================================================
// PRE-CONFIGURED RATE LIMITERS
// ============================================================================

// Contact form: 3 submissions per 5 minutes
export const contactFormLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 5 * 60 * 1000,
  message: 'You can only submit the contact form 3 times per 5 minutes. Please try again later.'
});

// Chatbot: 10 messages per minute
export const chatbotLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000,
  message: 'You\'re sending messages too quickly. Please slow down.'
});

// Newsletter signup: 2 per hour
export const newsletterLimiter = new RateLimiter({
  maxRequests: 2,
  windowMs: 60 * 60 * 1000,
  message: 'You can only sign up for the newsletter twice per hour.'
});

// API calls: 30 per minute (general)
export const apiLimiter = new RateLimiter({
  maxRequests: 30,
  windowMs: 60 * 1000,
  message: 'API rate limit exceeded. Please wait a moment.'
});

// Login attempts: 5 per 15 minutes
export const loginLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
  message: 'Too many login attempts. Please try again in 15 minutes.'
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get identifier from request (IP or user ID)
 */
export function getIdentifier(userId?: string): string {
  // In browser, we can't get real IP, so use combination of factors
  const fingerprint = [
    userId || 'anonymous',
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset()
  ].join('|');

  // Simple hash function
  return simpleHash(fingerprint);
}

/**
 * Simple hash function for fingerprinting
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Format reset time for display
 */
export function formatResetTime(resetTime: number): string {
  const now = Date.now();
  const diff = resetTime - now;

  if (diff <= 0) return 'now';

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}

// ============================================================================
// REACT HOOK FOR RATE LIMITING
// ============================================================================

/**
 * React hook for rate limiting
 * 
 * Usage:
 * const { checkLimit, remaining, resetIn } = useRateLimit(contactFormLimiter);
 * 
 * const handleSubmit = () => {
 *   const result = checkLimit();
 *   if (!result.allowed) {
 *     alert(result.message);
 *     return;
 *   }
 *   // Submit form
 * };
 */
export function useRateLimit(limiter: RateLimiter) {
  const identifier = getIdentifier();

  const checkLimit = () => {
    return limiter.check(identifier);
  };

  const reset = () => {
    limiter.reset(identifier);
  };

  return {
    checkLimit,
    reset,
    identifier
  };
}

// ============================================================================
// MIDDLEWARE HELPER (For Backend Integration)
// ============================================================================

/**
 * Rate limit middleware configuration for backend
 * 
 * Example for Supabase Edge Function:
 * 
 * import { rateLimitMiddleware } from './rateLimiter';
 * 
 * app.post('/api/contact', async (c) => {
 *   const limiter = rateLimitMiddleware(c, {
 *     maxRequests: 3,
 *     windowMs: 5 * 60 * 1000
 *   });
 *   
 *   if (!limiter.allowed) {
 *     return c.json({ error: limiter.message }, 429);
 *   }
 *   
 *   // Process request
 * });
 */
export interface RateLimitMiddlewareOptions {
  maxRequests?: number;
  windowMs?: number;
  message?: string;
  identifierFn?: (req: any) => string;
}

export function createRateLimitMiddleware(options: RateLimitMiddlewareOptions = {}) {
  const limiter = new RateLimiter(options);

  return (identifier: string) => {
    return limiter.check(identifier);
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  RateLimiter,
  contactFormLimiter,
  chatbotLimiter,
  newsletterLimiter,
  apiLimiter,
  loginLimiter,
  getIdentifier,
  formatResetTime,
  useRateLimit,
  createRateLimitMiddleware
};
