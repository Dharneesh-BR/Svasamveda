// Service Worker for Svasam
const CACHE_NAME = 'svasam-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/icon-192x192.png',
  '/manifest.webmanifest'
];

// Map of old paths to new paths
const REDIRECTS = {
  '/icons/icon-192x192.png': '/icon-192x192.png'
};

// Install event - cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle fetch events with redirects
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests like analytics
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Check if this is a request we should redirect
  const url = new URL(event.request.url);
  const path = url.pathname;
  
  // Handle redirects
  if (REDIRECTS[path]) {
    const newUrl = new URL(REDIRECTS[path], self.location.origin);
    return event.respondWith(
      caches.match(newUrl).then(response => response || fetch(newUrl))
    );
  }

  // Normal request handling
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found
      if (response) {
        return response;
      }
      
      // Clone the request
      const fetchRequest = event.request.clone();
      
      // Make network request and cache the response
      return fetch(fetchRequest).then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
