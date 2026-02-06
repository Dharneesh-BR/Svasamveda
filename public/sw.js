const CACHE_NAME = 'svasam-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico'
];

// Install: cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: simplified and less aggressive
self.addEventListener('fetch', (event) => {
  // Only handle GET requests to avoid issues with POST requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests to avoid CORS issues
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return fetch(event.request);
  }
  
  event.respondWith(async () => {
    try {
      // Try cache first for same-origin requests
      if (requestUrl.origin === self.location.origin) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
      }
    }
      
      // For all other requests, just fetch without caching
      return fetch(event.request);
    } catch (err) {
      // If offline and it's a navigation request, fallback to index.html
      if (event.request.mode === 'navigate') {
        const fallback = await caches.match('/index.html');
        if (fallback) return fallback;
      }
      // Don't throw errors that break other requests
      console.error('Service Worker error:', err);
      return fetch(event.request);
    }
  });
});
