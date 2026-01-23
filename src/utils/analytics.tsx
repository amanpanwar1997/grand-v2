/**
 * ============================================================================
 * ANALYTICS & TRACKING
 * ============================================================================
 * 
 * Centralized analytics for:
 * - Google Analytics 4
 * - Custom event tracking
 * - Page view tracking
 * - User behavior tracking
 * 
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// ============================================================================
// PAGE VIEW TRACKING
// ============================================================================

/**
 * Track page views
 */
export function trackPageView(url: string, title: string) {
  if (typeof window === 'undefined') return;
  
  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page View:', { url, title });
  }
}

// ============================================================================
// EVENT TRACKING
// ============================================================================

/**
 * Track custom events
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  
  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event:', eventName, params);
  }
}

// ============================================================================
// COMMON EVENTS
// ============================================================================

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, page: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    page: page,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
}

/**
 * Track link click (external)
 */
export function trackExternalLink(url: string, text: string) {
  trackEvent('external_link_click', {
    url: url,
    link_text: text,
  });
}

/**
 * Track file download
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Track video play
 */
export function trackVideoPlay(videoTitle: string, videoId: string) {
  trackEvent('video_play', {
    video_title: videoTitle,
    video_id: videoId,
  });
}

/**
 * Track social share
 */
export function trackSocialShare(platform: string, url: string) {
  trackEvent('social_share', {
    platform: platform,
    url: url,
  });
}

/**
 * Track email signup
 */
export function trackEmailSignup(source: string) {
  trackEvent('email_signup', {
    source: source,
  });
}

/**
 * Track contact submission
 */
export function trackContactSubmit(method: string) {
  trackEvent('contact_submit', {
    method: method, // 'form', 'whatsapp', 'phone', 'email'
  });
}

// ============================================================================
// E-COMMERCE TRACKING (if applicable)
// ============================================================================

/**
 * Track product view
 */
export function trackProductView(productId: string, productName: string, price: number) {
  trackEvent('view_item', {
    currency: 'INR',
    value: price,
    items: [{
      item_id: productId,
      item_name: productName,
      price: price,
    }],
  });
}

/**
 * Track add to cart
 */
export function trackAddToCart(productId: string, productName: string, price: number) {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: price,
    items: [{
      item_id: productId,
      item_name: productName,
      price: price,
    }],
  });
}

/**
 * Track purchase
 */
export function trackPurchase(
  transactionId: string,
  value: number,
  items: Array<{ id: string; name: string; price: number }>
) {
  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: 'INR',
    value: value,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
    })),
  });
}

// ============================================================================
// USER ENGAGEMENT
// ============================================================================

/**
 * Track time on page
 */
let pageStartTime: number | null = null;

export function startPageTimer() {
  pageStartTime = Date.now();
}

export function endPageTimer(pageName: string) {
  if (!pageStartTime) return;
  
  const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
  
  trackEvent('time_on_page', {
    page_name: pageName,
    time_seconds: timeOnPage,
  });
  
  pageStartTime = null;
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number, page: string) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page: page,
  });
}

// ============================================================================
// ERROR TRACKING
// ============================================================================

/**
 * Track errors
 */
export function trackError(errorMessage: string, errorStack?: string, fatal: boolean = false) {
  trackEvent('error', {
    error_message: errorMessage,
    error_stack: errorStack,
    fatal: fatal,
  });
}

/**
 * Track 404 errors
 */
export function track404(path: string, referrer: string) {
  trackEvent('404_error', {
    path: path,
    referrer: referrer,
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize analytics
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  // Load Google Analytics 4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function() {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually
  });
  
  console.log('[Analytics] Initialized');
}

// ============================================================================
// REACT ROUTER INTEGRATION
// ============================================================================

/**
 * Hook for tracking page views in React Router
 */
export function usePageTracking() {
  if (typeof window === 'undefined') return;
  
  const location = (window as any).location;
  
  // Track page view on mount and route change
  const handleRouteChange = () => {
    trackPageView(location.pathname, document.title);
    startPageTimer();
  };
  
  // Initial page view
  handleRouteChange();
  
  // Track on route change
  window.addEventListener('popstate', handleRouteChange);
  
  // Cleanup
  return () => {
    window.removeEventListener('popstate', handleRouteChange);
    endPageTimer(location.pathname);
  };
}

// ============================================================================
// SCROLL DEPTH TRACKING
// ============================================================================

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') return;
  
  const tracked = new Set<number>();
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const percentage = Math.round((scrolled / scrollHeight) * 100);
    
    // Track at 25%, 50%, 75%, 100%
    [25, 50, 75, 100].forEach(threshold => {
      if (percentage >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackScrollDepth(threshold, window.location.pathname);
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  init: initAnalytics,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackCTAClick,
  trackFormSubmit,
  trackExternalLink,
  trackDownload,
  trackSearch,
  trackVideoPlay,
  trackSocialShare,
  trackEmailSignup,
  trackContactSubmit,
  trackError,
  track404,
  usePageTracking,
  initScrollTracking,
};

/**
 * Usage Examples:
 * 
 * // Initialize in App.tsx
 * import analytics from './utils/analytics';
 * 
 * useEffect(() => {
 *   analytics.init();
 *   analytics.usePageTracking();
 *   analytics.initScrollTracking();
 * }, []);
 * 
 * // Track button click
 * <button onClick={() => trackButtonClick('Contact Us', 'Homepage Hero')}>
 *   Contact Us
 * </button>
 * 
 * // Track form submit
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const success = await submitForm(data);
 *   trackFormSubmit('Contact Form', success);
 * };
 * 
 * // Track external link
 * <a 
 *   href="https://example.com" 
 *   onClick={() => trackExternalLink('https://example.com', 'Partner Link')}
 * >
 *   Visit Partner
 * </a>
 */
