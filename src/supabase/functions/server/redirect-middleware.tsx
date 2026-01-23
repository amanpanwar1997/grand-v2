/**
 * REDIRECT MIDDLEWARE
 * Force HTTPS and WWW redirects
 */

import { Context } from 'npm:hono';

/**
 * Force HTTPS and WWW redirect middleware
 */
export function forceHTTPSandWWW(c: Context, next: () => Promise<void>) {
  const url = new URL(c.req.url);
  const host = url.hostname;
  const protocol = url.protocol;
  
  let needsRedirect = false;
  let redirectUrl = '';

  // Check if HTTPS is needed
  if (protocol !== 'https:') {
    needsRedirect = true;
    url.protocol = 'https:';
  }

  // Check if WWW is needed
  if (!host.startsWith('www.') && host !== 'localhost' && !host.startsWith('127.0.0.1')) {
    needsRedirect = true;
    url.hostname = `www.${host}`;
  }

  // Perform redirect if needed
  if (needsRedirect) {
    redirectUrl = url.toString();
    console.log(`🔀 Redirecting: ${c.req.url} → ${redirectUrl}`);
    return c.redirect(redirectUrl, 301); // Permanent redirect
  }

  // Continue to next middleware
  return next();
}

/**
 * Security headers middleware
 */
export function securityHeaders(c: Context, next: () => Promise<void>) {
  // Continue to next middleware first
  return next().then(() => {
    // Add security headers to response
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'SAMEORIGIN');
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  });
}
