/**
 * TECHNICAL SEO ANALYZER - REAL BACKEND
 * Analyzes technical SEO without expensive APIs
 */

import { Context } from 'npm:hono';

/**
 * Analyze technical SEO for a URL
 */
export async function analyzeTechnicalSEO(c: Context) {
  try {
    const { url } = await c.req.json();

    if (!url) {
      return c.json({ success: false, error: 'URL is required' });
    }

    console.log(`🔍 Analyzing technical SEO for: ${url}`);

    // Fetch the page
    const startTime = Date.now();
    let response;
    try {
      response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; InchtomilezSEOBot/1.0)'
        }
      });
    } catch (error: any) {
      return c.json({
        success: false,
        error: `Failed to fetch URL: ${error.message}`
      });
    }
    const loadTime = Date.now() - startTime;

    if (!response.ok) {
      return c.json({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      });
    }

    const html = await response.text();
    const headers = response.headers;

    // Run all checks
    const security = checkSecurity(url, headers);
    const performance = checkPerformance(html, loadTime, headers);
    const mobile = checkMobileFriendly(html);
    const htmlValidation = checkHTMLValidation(html);
    const coreWebVitals = estimateCoreWebVitals(html, loadTime);
    const metadata = checkMetadata(html);
    const structured = checkStructuredData(html);

    // Calculate overall score
    let score = 0;
    const maxScore = 100;

    // Security (20 points)
    if (security.https) score += 10;
    if (!security.mixedContent) score += 5;
    if (security.hsts) score += 5;

    // Performance (20 points)
    if (loadTime < 1000) score += 10;
    else if (loadTime < 2000) score += 7;
    else if (loadTime < 3000) score += 4;
    
    if (performance.gzip) score += 5;
    if (!performance.renderBlocking) score += 5;

    // Mobile (15 points)
    if (mobile.hasViewport) score += 8;
    if (mobile.responsive) score += 7;

    // HTML Validation (10 points)
    if (htmlValidation.errors === 0) score += 10;
    else if (htmlValidation.errors < 5) score += 5;

    // Core Web Vitals (20 points)
    if (coreWebVitals.lcp < 2.5) score += 7;
    else if (coreWebVitals.lcp < 4.0) score += 4;
    
    if (coreWebVitals.fid < 100) score += 7;
    else if (coreWebVitals.fid < 300) score += 4;
    
    if (coreWebVitals.cls < 0.1) score += 6;
    else if (coreWebVitals.cls < 0.25) score += 3;

    // Metadata (10 points)
    if (metadata.hasTitle) score += 3;
    if (metadata.hasDescription) score += 3;
    if (metadata.hasCanonical) score += 2;
    if (metadata.hasOG) score += 2;

    // Structured Data (5 points)
    if (structured.hasSchema) score += 5;

    // Collect all issues
    const issues: any[] = [];
    
    if (!security.https) issues.push({ type: 'error', category: 'security', message: 'Site not using HTTPS' });
    if (security.mixedContent) issues.push({ type: 'warning', category: 'security', message: 'Mixed content detected' });
    if (!security.hsts) issues.push({ type: 'warning', category: 'security', message: 'HSTS header not set' });
    
    if (loadTime > 3000) issues.push({ type: 'error', category: 'performance', message: `Slow load time: ${loadTime}ms` });
    else if (loadTime > 2000) issues.push({ type: 'warning', category: 'performance', message: `Load time could be improved: ${loadTime}ms` });
    
    if (!performance.gzip) issues.push({ type: 'warning', category: 'performance', message: 'Gzip compression not enabled' });
    if (performance.renderBlocking) issues.push({ type: 'warning', category: 'performance', message: 'Render-blocking resources detected' });
    
    if (!mobile.hasViewport) issues.push({ type: 'error', category: 'mobile', message: 'Missing viewport meta tag' });
    if (!mobile.responsive) issues.push({ type: 'warning', category: 'mobile', message: 'May not be mobile-friendly' });
    
    if (htmlValidation.errors > 0) issues.push({ type: 'warning', category: 'html', message: `${htmlValidation.errors} HTML validation errors` });
    if (htmlValidation.warnings > 0) issues.push({ type: 'info', category: 'html', message: `${htmlValidation.warnings} HTML validation warnings` });
    
    if (coreWebVitals.lcp > 4.0) issues.push({ type: 'error', category: 'vitals', message: `Poor LCP: ${coreWebVitals.lcp.toFixed(2)}s` });
    else if (coreWebVitals.lcp > 2.5) issues.push({ type: 'warning', category: 'vitals', message: `LCP needs improvement: ${coreWebVitals.lcp.toFixed(2)}s` });
    
    if (coreWebVitals.fid > 300) issues.push({ type: 'error', category: 'vitals', message: `Poor FID: ${coreWebVitals.fid}ms` });
    else if (coreWebVitals.fid > 100) issues.push({ type: 'warning', category: 'vitals', message: `FID needs improvement: ${coreWebVitals.fid}ms` });
    
    if (coreWebVitals.cls > 0.25) issues.push({ type: 'error', category: 'vitals', message: `Poor CLS: ${coreWebVitals.cls.toFixed(3)}` });
    else if (coreWebVitals.cls > 0.1) issues.push({ type: 'warning', category: 'vitals', message: `CLS needs improvement: ${coreWebVitals.cls.toFixed(3)}` });

    if (!metadata.hasTitle) issues.push({ type: 'error', category: 'metadata', message: 'Missing title tag' });
    if (!metadata.hasDescription) issues.push({ type: 'error', category: 'metadata', message: 'Missing meta description' });
    if (!metadata.hasCanonical) issues.push({ type: 'warning', category: 'metadata', message: 'Missing canonical URL' });
    if (!metadata.hasOG) issues.push({ type: 'info', category: 'metadata', message: 'Missing Open Graph tags' });
    
    if (!structured.hasSchema) issues.push({ type: 'info', category: 'structured', message: 'No structured data found' });

    // Generate recommendations
    const recommendations = generateRecommendations(issues);

    const analysis = {
      url,
      score,
      grade: getScoreGrade(score),
      security,
      performance: {
        ...performance,
        loadTime
      },
      mobile,
      htmlValidation,
      coreWebVitals,
      metadata,
      structured,
      issues,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    return c.json({
      success: true,
      analysis
    });

  } catch (error: any) {
    console.error('Technical SEO analysis error:', error);
    return c.json({
      success: false,
      error: error.message || 'Failed to analyze technical SEO'
    });
  }
}

/**
 * Check security settings
 */
function checkSecurity(url: string, headers: Headers) {
  const https = url.startsWith('https://');
  const hsts = headers.has('strict-transport-security');
  const csp = headers.has('content-security-policy');
  const xFrameOptions = headers.has('x-frame-options');
  
  return {
    https,
    hsts,
    csp,
    xFrameOptions,
    mixedContent: false, // Would need to check HTML for http:// resources
    score: (https ? 25 : 0) + (hsts ? 25 : 0) + (csp ? 25 : 0) + (xFrameOptions ? 25 : 0)
  };
}

/**
 * Check performance settings
 */
function checkPerformance(html: string, loadTime: number, headers: Headers) {
  const gzip = headers.get('content-encoding')?.includes('gzip') || false;
  const cacheControl = headers.has('cache-control');
  const etag = headers.has('etag');
  
  // Check for render-blocking resources
  const renderBlocking = 
    (html.match(/<script(?![^>]*async)(?![^>]*defer)/g) || []).length > 0 ||
    (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || []).length > 3;

  // Check image optimization
  const images = html.match(/<img[^>]*>/gi) || [];
  const totalImages = images.length;
  const lazyImages = images.filter(img => img.includes('loading="lazy"')).length;
  
  return {
    loadTime,
    gzip,
    cacheControl,
    etag,
    renderBlocking,
    imageOptimization: {
      total: totalImages,
      lazy: lazyImages,
      percentage: totalImages > 0 ? Math.round((lazyImages / totalImages) * 100) : 0
    }
  };
}

/**
 * Check mobile-friendliness
 */
function checkMobileFriendly(html: string) {
  const hasViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html);
  const viewportContent = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
  const responsive = viewportContent ? viewportContent[1].includes('width=device-width') : false;
  
  // Check for mobile-friendly CSS
  const hasMediaQueries = /@media[^{]*\([^)]*max-width|min-width/i.test(html);
  
  return {
    hasViewport,
    responsive,
    hasMediaQueries,
    score: (hasViewport ? 50 : 0) + (responsive ? 30 : 0) + (hasMediaQueries ? 20 : 0)
  };
}

/**
 * Check HTML validation
 */
function checkHTMLValidation(html: string) {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for DOCTYPE
  if (!/<!DOCTYPE html>/i.test(html)) {
    errors.push('Missing DOCTYPE declaration');
  }
  
  // Check for duplicate IDs
  const ids = html.match(/id=["']([^"']*)["']/gi) || [];
  const idValues = ids.map(id => id.match(/id=["']([^"']*)["']/i)?.[1]);
  const duplicateIds = idValues.filter((id, index) => idValues.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
  }
  
  // Check for unclosed tags (basic check)
  const openTags = (html.match(/<[a-z][a-z0-9]*[^>]*>/gi) || []).length;
  const closeTags = (html.match(/<\/[a-z][a-z0-9]*>/gi) || []).length;
  if (Math.abs(openTags - closeTags) > 10) {
    warnings.push('Possible unclosed tags detected');
  }
  
  return {
    errors: errors.length,
    warnings: warnings.length,
    errorMessages: errors,
    warningMessages: warnings
  };
}

/**
 * Estimate Core Web Vitals
 */
function estimateCoreWebVitals(html: string, loadTime: number) {
  // LCP (Largest Contentful Paint) - estimate based on load time
  const lcp = loadTime / 1000 * 0.8; // Rough estimate
  
  // FID (First Input Delay) - estimate based on script complexity
  const scriptTags = (html.match(/<script/gi) || []).length;
  const fid = Math.min(300, scriptTags * 10);
  
  // CLS (Cumulative Layout Shift) - estimate based on images without dimensions
  const imagesWithoutDimensions = (html.match(/<img(?![^>]*width)(?![^>]*height)[^>]*>/gi) || []).length;
  const totalImages = (html.match(/<img/gi) || []).length;
  const cls = totalImages > 0 ? (imagesWithoutDimensions / totalImages) * 0.3 : 0.05;
  
  return {
    lcp: Math.round(lcp * 10) / 10,
    fid: Math.round(fid),
    cls: Math.round(cls * 1000) / 1000,
    status: {
      lcp: lcp < 2.5 ? 'good' : lcp < 4.0 ? 'needs-improvement' : 'poor',
      fid: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor',
      cls: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor'
    }
  };
}

/**
 * Check metadata
 */
function checkMetadata(html: string) {
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  const description = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(html);
  const canonical = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(html);
  const ogTitle = /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i.exec(html);
  const robots = /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i.exec(html);
  
  return {
    hasTitle: !!title,
    title: title?.[1] || '',
    hasDescription: !!description,
    description: description?.[1] || '',
    hasCanonical: !!canonical,
    canonical: canonical?.[1] || '',
    hasOG: !!ogTitle,
    ogTitle: ogTitle?.[1] || '',
    robots: robots?.[1] || 'index,follow'
  };
}

/**
 * Check structured data
 */
function checkStructuredData(html: string) {
  const jsonLd = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  const microdata = (html.match(/itemscope/gi) || []).length;
  
  const schemas: string[] = [];
  jsonLd.forEach(script => {
    try {
      const json = JSON.parse(script.replace(/<script[^>]*>|<\/script>/gi, ''));
      if (json['@type']) {
        schemas.push(json['@type']);
      }
    } catch (e) {
      // Invalid JSON-LD
    }
  });
  
  return {
    hasSchema: jsonLd.length > 0 || microdata > 0,
    jsonLdCount: jsonLd.length,
    microdataCount: microdata,
    schemas
  };
}

/**
 * Generate recommendations based on issues
 */
function generateRecommendations(issues: any[]): string[] {
  const recommendations: string[] = [];
  const errorCategories = new Set(issues.filter(i => i.type === 'error').map(i => i.category));
  const warningCategories = new Set(issues.filter(i => i.type === 'warning').map(i => i.category));
  
  if (errorCategories.has('security')) {
    recommendations.push('🔒 Enable HTTPS and HSTS headers for security');
  }
  
  if (errorCategories.has('performance') || warningCategories.has('performance')) {
    recommendations.push('⚡ Optimize images and enable lazy loading');
    recommendations.push('⚡ Enable Gzip compression on server');
    recommendations.push('⚡ Minimize render-blocking resources');
  }
  
  if (errorCategories.has('mobile')) {
    recommendations.push('📱 Add viewport meta tag for mobile devices');
  }
  
  if (errorCategories.has('vitals') || warningCategories.has('vitals')) {
    recommendations.push('📊 Improve Core Web Vitals by optimizing LCP, FID, and CLS');
    recommendations.push('📊 Add width/height to images to prevent layout shifts');
  }
  
  if (errorCategories.has('metadata')) {
    recommendations.push('📝 Add missing title and meta description tags');
    recommendations.push('📝 Add canonical URL to prevent duplicate content');
  }
  
  if (issues.length === 0) {
    recommendations.push('✨ Great job! Your technical SEO is in excellent shape');
  }
  
  return recommendations;
}

/**
 * Get SEO score grade
 */
function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 65) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
