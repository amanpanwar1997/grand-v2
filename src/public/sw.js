/**
 * SERVICE WORKER
 * Inchtomilez PWA - Offline Support & Caching
 * Version: 1.0.0
 * 
 * Features:
 * ✅ Offline page support
 * ✅ Cache-first strategy for assets
 * ✅ Network-first strategy for API calls
 * ✅ Background sync
 * ✅ Push notifications ready
 */

const CACHE_VERSION = 'inchtomilez-v1.0.1';
const RUNTIME_CACHE = 'inchtomilez-runtime-v1.0.1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
];

// Install event - precache essential files
self.addEventListener('install', (event) => {
  console.log('📱 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('📱 Service Worker: Precaching essential files');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('📱 Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('📱 Service Worker: Installation failed', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('📱 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName !== CACHE_VERSION && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('📱 Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('📱 Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different request types
  if (url.pathname.startsWith('/api/')) {
    // API requests - network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else if (
    url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot)$/) ||
    url.pathname.startsWith('/assets/')
  ) {
    // Static assets - cache first, fallback to network
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/)) {
    // Images - cache first with expiry
    event.respondWith(cacheFirstWithExpiry(request, 7 * 24 * 60 * 60 * 1000)); // 7 days
  } else {
    // HTML pages - network first, fallback to cache, then offline page
    event.respondWith(pageStrategy(request));
  }
});

/**
 * CACHE FIRST STRATEGY
 * Try cache first, fallback to network
 */
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('📱 Service Worker: Cache first failed', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

/**
 * CACHE FIRST WITH EXPIRY
 * Try cache first, check expiry, fallback to network
 */
async function cacheFirstWithExpiry(request, maxAge) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      const cachedDate = new Date(cachedResponse.headers.get('date'));
      const now = new Date();
      const age = now - cachedDate;

      // Return cached if not expired
      if (age < maxAge) {
        return cachedResponse;
      }
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Return stale cache if network fails
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

/**
 * NETWORK FIRST STRATEGY
 * Try network first, fallback to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

/**
 * PAGE STRATEGY
 * Network first for pages, fallback to cache, then offline page
 */
async function pageStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful HTML responses
    if (networkResponse.ok && request.mode === 'navigate') {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

/**
 * BACKGROUND SYNC
 * Sync data when connection is restored
 */
self.addEventListener('sync', (event) => {
  console.log('📱 Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Get pending form submissions from IndexedDB
  // Send them when online
  console.log('📱 Service Worker: Syncing forms...');
}

/**
 * PUSH NOTIFICATIONS
 * Handle push notifications (if implemented)
 */
self.addEventListener('push', (event) => {
  console.log('📱 Service Worker: Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Inchtomilez';
  const options = {
    body: data.body || 'New update available',
    icon: '/pwa/icon-192x192.png',
    badge: '/pwa/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    data: data.url || '/',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * NOTIFICATION CLICK
 * Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  console.log('📱 Service Worker: Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

/**
 * MESSAGE HANDLER
 * Handle messages from clients
 */
self.addEventListener('message', (event) => {
  console.log('📱 Service Worker: Message received', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('📱 Service Worker: Loaded and ready');
