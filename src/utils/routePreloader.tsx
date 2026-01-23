/**
 * Route Preloader Utility
 * Preloads route components on link hover for instant navigation
 * Improves perceived performance by loading pages before user clicks
 */

// Map of route paths to their lazy-loaded components
const routeComponents: Record<string, () => Promise<any>> = {
  '/': () => import('../components/pages/HomePage'),
  '/about': () => import('../components/pages/AboutPage'),
  '/services': () => import('../components/pages/ServicesPage'),
  '/services/': () => import('../components/pages/ServiceDetailPage'),
  '/industries': () => import('../components/pages/IndustriesPage'),
  '/industries/': () => import('../components/pages/IndustryDetailPage'),
  '/blogs': () => import('../components/pages/BlogsPage'),
  '/blogs/': () => import('../components/pages/BlogDetailPage'),
  '/faqs': () => import('../components/pages/FAQsPage'),
  '/contact': () => import('../components/pages/ContactPage'),
};

// Cache for already preloaded routes
const preloadedRoutes = new Set<string>();

/**
 * Preload a route component
 * @param path - Route path to preload
 */
export function preloadRoute(path: string): void {
  // Skip if already preloaded
  if (preloadedRoutes.has(path)) {
    return;
  }

  // Find matching route component
  let loader = routeComponents[path];
  
  // If exact match not found, try matching dynamic routes
  if (!loader) {
    for (const [route, component] of Object.entries(routeComponents)) {
      if (route.endsWith('/') && path.startsWith(route.slice(0, -1))) {
        loader = component;
        break;
      }
    }
  }

  // Preload the component
  if (loader) {
    loader()
      .then(() => {
        preloadedRoutes.add(path);
        console.log(`✅ Preloaded: ${path}`);
      })
      .catch((error) => {
        console.warn(`⚠️ Failed to preload ${path}:`, error);
      });
  }
}

/**
 * Preload multiple routes
 * @param paths - Array of route paths to preload
 */
export function preloadRoutes(paths: string[]): void {
  paths.forEach(preloadRoute);
}

/**
 * Preload all routes (for very fast subsequent navigation)
 * Call this after initial page load completes
 */
export function preloadAllRoutes(): void {
  // Wait 2 seconds after page load to avoid blocking initial render
  setTimeout(() => {
    Object.keys(routeComponents).forEach(preloadRoute);
  }, 2000);
}

/**
 * Hook into link hover events to preload routes
 * Call this in App.tsx useEffect
 */
export function initRoutePreloader(): () => void {
  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target;
    
    // Ensure target is an Element before calling closest
    if (!target || !(target instanceof Element)) {
      return;
    }
    
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.href && link.href.startsWith(window.location.origin)) {
      const path = new URL(link.href).pathname;
      preloadRoute(path);
    }
  };

  // Listen for mouseover on all links (mouseover bubbles, mouseenter doesn't)
  document.addEventListener('mouseover', handleMouseOver, true);

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseover', handleMouseOver, true);
  };
}
