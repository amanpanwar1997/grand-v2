/**
 * SECURITY HEADERS CONFIGURATION
 * 
 * Implements modern web security best practices:
 * - Content Security Policy (CSP)
 * - HTTPS Strict Transport Security (HSTS)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer-Policy
 * - Permissions-Policy
 */

// ============================================================================
// SECURITY HEADERS
// ============================================================================

export const SECURITY_HEADERS = {
  // Prevent clickjacking attacks
  'X-Frame-Options': 'SAMEORIGIN',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection (legacy browsers)
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Force HTTPS (only in production)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Permissions policy (restrict browser features)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()'
  ].join(', ')
};

// ============================================================================
// CONTENT SECURITY POLICY (CSP)
// ============================================================================

/**
 * Content Security Policy configuration
 * Prevents XSS, code injection, and other attacks
 */
export const CSP_DIRECTIVES = {
  // Default policy for all resources
  'default-src': ["'self'"],
  
  // Script sources
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for React inline scripts
    "'unsafe-eval'",   // Required for development
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://vercel.live'
  ],
  
  // Style sources
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind and styled components
    'https://fonts.googleapis.com'
  ],
  
  // Font sources
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'data:'
  ],
  
  // Image sources
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:',
    'https://images.unsplash.com',
    'https://source.unsplash.com',
    'https://api.dicebear.com'
  ],
  
  // Media sources (video/audio)
  'media-src': [
    "'self'",
    'https:',
    'blob:',
    'data:'
  ],
  
  // Connect sources (AJAX, WebSocket, EventSource)
  'connect-src': [
    "'self'",
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://*.supabase.co',
    'https://*.supabase.in',
    'wss://*.supabase.co'
  ],
  
  // Frame sources (iframes)
  'frame-src': [
    "'self'",
    'https://www.youtube.com',
    'https://player.vimeo.com',
    'https://www.google.com'
  ],
  
  // Worker sources
  'worker-src': [
    "'self'",
    'blob:'
  ],
  
  // Object sources (Flash, Java, etc.)
  'object-src': ["'none'"],
  
  // Base URI
  'base-uri': ["'self'"],
  
  // Form action
  'form-action': ["'self'"],
  
  // Frame ancestors (who can embed this site)
  'frame-ancestors': ["'self'"],
  
  // Upgrade insecure requests (HTTP → HTTPS)
  'upgrade-insecure-requests': []
};

/**
 * Build CSP header string
 */
export function buildCSPHeader(directives: typeof CSP_DIRECTIVES = CSP_DIRECTIVES): string {
  return Object.entries(directives)
    .map(([key, values]) => {
      if (Array.isArray(values) && values.length === 0) {
        return key; // Directives like 'upgrade-insecure-requests'
      }
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * Development-friendly CSP (less strict)
 */
export const CSP_DIRECTIVES_DEV = {
  ...CSP_DIRECTIVES,
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://vercel.live',
    'http://localhost:*'
  ],
  'connect-src': [
    ...CSP_DIRECTIVES['connect-src'],
    'http://localhost:*',
    'ws://localhost:*'
  ]
};

// ============================================================================
// VERCEL CONFIGURATION
// ============================================================================

/**
 * Vercel headers configuration
 * Add to vercel.json
 */
export const VERCEL_HEADERS_CONFIG = {
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: SECURITY_HEADERS['X-Frame-Options']
        },
        {
          key: 'X-Content-Type-Options',
          value: SECURITY_HEADERS['X-Content-Type-Options']
        },
        {
          key: 'X-XSS-Protection',
          value: SECURITY_HEADERS['X-XSS-Protection']
        },
        {
          key: 'Referrer-Policy',
          value: SECURITY_HEADERS['Referrer-Policy']
        },
        {
          key: 'Permissions-Policy',
          value: SECURITY_HEADERS['Permissions-Policy']
        },
        {
          key: 'Content-Security-Policy',
          value: buildCSPHeader()
        }
      ]
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'header',
          key: 'x-forwarded-proto',
          value: 'https'
        }
      ],
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: SECURITY_HEADERS['Strict-Transport-Security']
        }
      ]
    }
  ]
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Get environment-appropriate CSP
 */
export function getCSP(): string {
  return buildCSPHeader(isProduction() ? CSP_DIRECTIVES : CSP_DIRECTIVES_DEV);
}

/**
 * Add security headers to response (for custom servers)
 */
export function addSecurityHeaders(headers: Headers): Headers {
  const newHeaders = new Headers(headers);
  
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    // Skip HSTS in development
    if (key === 'Strict-Transport-Security' && !isProduction()) {
      return;
    }
    newHeaders.set(key, value);
  });
  
  newHeaders.set('Content-Security-Policy', getCSP());
  
  return newHeaders;
}

// ============================================================================
// REACT INTEGRATION
// ============================================================================

/**
 * React component to add CSP meta tag (fallback)
 */
export function CSPMetaTag() {
  return (
    <meta
      httpEquiv="Content-Security-Policy"
      content={getCSP()}
    />
  );
}

// ============================================================================
// SECURITY CHECKLIST
// ============================================================================

export const SECURITY_CHECKLIST = {
  headers: {
    'X-Frame-Options': 'Prevents clickjacking',
    'X-Content-Type-Options': 'Prevents MIME sniffing',
    'X-XSS-Protection': 'Prevents XSS (legacy)',
    'Referrer-Policy': 'Controls referrer info',
    'Strict-Transport-Security': 'Forces HTTPS',
    'Permissions-Policy': 'Restricts browser features',
    'Content-Security-Policy': 'Prevents code injection'
  },
  implementation: {
    vercel: 'Add to vercel.json',
    netlify: 'Add to netlify.toml',
    cloudflare: 'Configure in dashboard',
    custom: 'Add to server middleware'
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  SECURITY_HEADERS,
  CSP_DIRECTIVES,
  CSP_DIRECTIVES_DEV,
  buildCSPHeader,
  VERCEL_HEADERS_CONFIG,
  isProduction,
  getCSP,
  addSecurityHeaders,
  CSPMetaTag,
  SECURITY_CHECKLIST
};
