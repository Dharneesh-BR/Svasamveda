const CACHE_NAME = 'svasam-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  // Note: Vite generates hashed asset names for JS/CSS. Do not hardcode them here.
  // Consider using a build-time PWA plugin for precaching those assets.
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

// Fetch: serve from cache first
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Only handle same-origin requests to avoid CORS/opaque issues
  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  if (!isSameOrigin) return;

  event.respondWith((async () => {
    try {
      // Try cache first
      const cached = await caches.match(event.request);
      if (cached) return cached;

      // Then network
      const response = await fetch(event.request);
      return response;
    } catch (err) {
      // If offline and it's a navigation request, fallback to index.html
      if (event.request.mode === 'navigate') {
        const fallback = await caches.match('/index.html');
        if (fallback) return fallback;
      }
      // Re-throw to surface error in console without breaking other requests
      throw err;
    }
  })());
});
