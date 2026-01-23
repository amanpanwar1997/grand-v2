/**
 * SERVER-SIDE HONEYPOT VALIDATOR
 * 
 * Validates honeypot fields to catch spam bots
 */

/**
 * Check if honeypot was triggered
 */
export function checkHoneypot(
  body: any,
  fieldName: string = 'website'
): boolean {
  // Check primary honeypot field
  if (body[fieldName] && body[fieldName].trim() !== '') {
    console.warn('🚫 Bot detected - Honeypot field filled:', fieldName);
    return true; // Bot detected
  }

  // Check backup honeypot field
  const backupField = `${fieldName}_backup`;
  if (body[backupField] && body[backupField].trim() !== '') {
    console.warn('🚫 Bot detected - Backup honeypot filled:', backupField);
    return true; // Bot detected
  }

  // Check submission timing (bots submit too fast)
  const submissionTime = body.submissionTime;
  if (submissionTime) {
    const timeTaken = Date.now() - parseInt(submissionTime);
    if (timeTaken < 2000) { // Less than 2 seconds
      console.warn('🚫 Bot detected - Form submitted too quickly:', timeTaken, 'ms');
      return true; // Bot detected
    }
  }

  return false; // Human user
}

/**
 * Honeypot middleware for Hono
 */
export function honeypotMiddleware(fieldName: string = 'website') {
  return async (c: any, next: any) => {
    try {
      const body = await c.req.json();
      
      if (checkHoneypot(body, fieldName)) {
        // Log bot attempt
        console.log('🚫 Bot submission blocked:', {
          ip: c.req.header('x-forwarded-for') || 'unknown',
          userAgent: c.req.header('user-agent'),
          timestamp: new Date().toISOString()
        });

        // Return success to fool bots (but don't actually process)
        return c.json({
          success: true,
          message: 'Thank you for your submission!'
        });
      }

      // Store body for next handler
      c.set('validatedBody', body);
      await next();
    } catch (error) {
      console.error('Honeypot validation error:', error);
      await next();
    }
  };
}

/**
 * Advanced bot detection
 */
export function detectBot(body: any, headers: Headers): {
  isBot: boolean;
  reason?: string;
} {
  // Check honeypot
  if (checkHoneypot(body)) {
    return { isBot: true, reason: 'Honeypot triggered' };
  }

  // Check user agent
  const userAgent = headers.get('user-agent') || '';
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scrape/i,
    /curl/i,
    /wget/i,
    /python/i
  ];

  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return { isBot: true, reason: 'Bot user agent' };
  }

  // Check missing required headers
  const requiredHeaders = ['accept', 'accept-language'];
  for (const header of requiredHeaders) {
    if (!headers.get(header)) {
      return { isBot: true, reason: `Missing ${header} header` };
    }
  }

  // Check for duplicate submissions (same data within 1 minute)
  // This would require session storage - implement if needed

  return { isBot: false };
}
