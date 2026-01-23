/**
 * ENHANCED SERVICE WORKER V3.0
 * 
 * Features:
 * - Advanced caching strategies
 * - Push notifications support
 * - Background sync for forms
 * - Offline page fallback
 * - Performance optimization
 * - Auto-update mechanism
 */

const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `inchtomilez-cache-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// ============================================================================
// CACHE STRATEGIES
// ============================================================================

const CACHE_STRATEGIES = {
  // Critical assets - Cache first, network fallback
  CRITICAL: [
    '/',
    '/offline.html',
    '/manifest.json',
    '/favicon.svg'
  ],
  
  // Static assets - Cache first
  STATIC: [
    '/assets/',
    '/images/',
    '/fonts/'
  ],
  
  // Pages - Network first, cache fallback
  PAGES: [
    '/about',
    '/services',
    '/contact',
    '/blogs'
  ],
  
  // API calls - Network only (no cache)
  API: [
    '/api/',
    'supabase.co'
  ],
  
  // External resources - Stale while revalidate
  EXTERNAL: [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'images.unsplash.com',
    'www.google-analytics.com'
  ]
};

// ============================================================================
// INSTALL EVENT
// ============================================================================

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v3.0.0...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching critical resources...');
      return cache.addAll(CACHE_STRATEGIES.CRITICAL);
    })
    .then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting(); // Activate immediately
    })
    .catch((error) => {
      console.error('[SW] Installation failed:', error);
    })
  );
});

// ============================================================================
// ACTIVATE EVENT
// ============================================================================

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v3.0.0...');
  
  event.waitUntil(
    // Delete old caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('inchtomilez-cache-') && name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
    .then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// ============================================================================
// FETCH EVENT - SMART CACHING STRATEGIES
// ============================================================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // API calls - Network only
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Network error. Please check your connection.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }
  
  // Static assets - Cache first
  if (CACHE_STRATEGIES.STATIC.some(path => url.pathname.startsWith(path))) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // External resources - Stale while revalidate
  if (CACHE_STRATEGIES.EXTERNAL.some(domain => url.hostname.includes(domain))) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Pages - Network first, cache fallback
  event.respondWith(networkFirst(request));
});

// ============================================================================
// CACHING STRATEGIES
// ============================================================================

/**
 * Cache First Strategy
 * - Try cache first
 * - If miss, fetch from network and cache
 * - Good for: Static assets, images, fonts
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

/**
 * Network First Strategy
 * - Try network first
 * - If fails, use cache
 * - Update cache with fresh content
 * - Good for: HTML pages, dynamic content
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache...');
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match(OFFLINE_PAGE);
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    return new Response('Offline - No cached version available', { status: 503 });
  }
}

/**
 * Stale While Revalidate Strategy
 * - Return cached version immediately
 * - Fetch fresh version in background
 * - Update cache for next time
 * - Good for: External resources, fonts, analytics
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  // Fetch fresh version in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Return cached version immediately, or wait for network
  return cached || fetchPromise;
}

// ============================================================================
// PUSH NOTIFICATIONS
// ============================================================================

/**
 * Push notification event
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'New update from Inchtomilez',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    tag: 'inchtomilez-notification',
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View' },
      { action: 'close', title: 'Close' }
    ]
  };
  
  let title = 'Inchtomilez Digital Marketing';
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
      title = data.title || title;
      options.body = data.body || options.body;
      options.icon = data.icon || options.icon;
      options.data = data;
    } catch (error) {
      console.error('[SW] Error parsing push data:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * Notification click event
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'close') {
    return;
  }
  
  // Default action or 'view' action
  const urlToOpen = data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ============================================================================
// BACKGROUND SYNC (For offline form submissions)
// ============================================================================

self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'chatbot-sync') {
    event.waitUntil(syncChatbotMessages());
  }
});

/**
 * Sync contact forms submitted while offline
 */
async function syncContactForms() {
  try {
    // Get pending forms from IndexedDB
    const db = await openDB();
    const forms = await db.getAll('pending-forms');
    
    for (const form of forms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          // Remove from pending
          await db.delete('pending-forms', form.id);
          console.log('[SW] Form synced successfully');
          
          // Show success notification
          self.registration.showNotification('Form Submitted', {
            body: 'Your message has been sent successfully!',
            icon: '/favicon.svg'
          });
        }
      } catch (error) {
        console.error('[SW] Form sync failed:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

/**
 * Sync chatbot messages
 */
async function syncChatbotMessages() {
  try {
    const db = await openDB();
    const messages = await db.getAll('pending-chatbot');
    
    for (const message of messages) {
      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message.data)
        });
        
        if (response.ok) {
          await db.delete('pending-chatbot', message.id);
          console.log('[SW] Chatbot message synced');
        }
      } catch (error) {
        console.error('[SW] Chatbot sync failed:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Chatbot background sync failed:', error);
  }
}

// ============================================================================
// INDEXEDDB HELPER
// ============================================================================

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('inchtomilez-offline-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pending-forms')) {
        db.createObjectStore('pending-forms', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('pending-chatbot')) {
        db.createObjectStore('pending-chatbot', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// ============================================================================
// MESSAGE HANDLING (Communication with main app)
// ============================================================================

self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => caches.delete(key)));
      })
    );
  }
});

// ============================================================================
// PERIODIC BACKGROUND SYNC (Future - requires permission)
// ============================================================================

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  // Fetch new blog posts, updates, etc.
  try {
    const response = await fetch('/api/content/latest');
    const data = await response.json();
    
    // Cache new content
    const cache = await caches.open(CACHE_NAME);
    
    for (const url of data.urls) {
      const contentResponse = await fetch(url);
      if (contentResponse.ok) {
        await cache.put(url, contentResponse);
      }
    }
    
    // Notify user of new content
    self.registration.showNotification('New Content Available', {
      body: 'Fresh blog posts and updates are ready to read!',
      icon: '/favicon.svg'
    });
  } catch (error) {
    console.error('[SW] Content sync failed:', error);
  }
}

// ============================================================================
// LOGGING & DEBUG
// ============================================================================

console.log('[SW] Service Worker v3.0.0 loaded successfully');
console.log('[SW] Cache name:', CACHE_NAME);
console.log('[SW] Features: Push Notifications, Background Sync, Smart Caching');
