/**
 * SERVER-SIDE RATE LIMITER
 * 
 * Prevents spam and abuse at the server level
 * - IP-based limiting
 * - Token bucket algorithm
 * - Automatic cleanup
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimitStore {
  private store: Map<string, RateLimitEntry> = new Map();

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
}

export class RateLimiter {
  private config: RateLimitConfig;
  private store: RateLimitStore;
  private cleanupInterval: number;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      maxRequests: 5,
      windowMs: 60000,
      message: 'Too many requests. Please try again later.',
      ...config
    };
    this.store = new RateLimitStore();

    // Cleanup every minute
    this.cleanupInterval = setInterval(() => {
      this.store.cleanup();
    }, 60000);
  }

  check(identifier: string): { 
    allowed: boolean; 
    remaining: number; 
    resetTime: number; 
    message?: string;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

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

    if (entry.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        message: this.config.message
      };
    }

    entry.count++;
    this.store.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  reset(identifier: string): void {
    this.store.delete(identifier);
  }
}

// Pre-configured rate limiters
export const contactFormLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 5 * 60 * 1000,
  message: 'Too many form submissions. Please try again in 5 minutes.'
});

export const chatbotLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000,
  message: 'Too many messages. Please slow down.'
});

export const newsletterLimiter = new RateLimiter({
  maxRequests: 2,
  windowMs: 60 * 60 * 1000,
  message: 'You can only sign up for the newsletter twice per hour.'
});

export const apiLimiter = new RateLimiter({
  maxRequests: 30,
  windowMs: 60 * 1000,
  message: 'API rate limit exceeded. Please wait a moment.'
});

export const loginLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
  message: 'Too many login attempts. Please try again in 15 minutes.'
});

/**
 * Get client IP from request
 */
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Rate limit middleware for Hono
 */
export function rateLimitMiddleware(limiter: RateLimiter) {
  return async (c: any, next: any) => {
    const ip = getClientIP(c.req.raw);
    const result = limiter.check(ip);

    // Add rate limit headers
    c.header('X-RateLimit-Limit', limiter['config'].maxRequests.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    c.header('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    if (!result.allowed) {
      return c.json({
        success: false,
        error: result.message,
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
      }, 429);
    }

    await next();
  };
}
