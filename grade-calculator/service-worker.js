self.addEventListener('install', event => {
  console.log('[SW] Installing');
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating');
  event.waitUntil(clients.claim()); // Take control of pages
});

self.addEventListener('fetch', event => {
  console.log('[SW] Fetching:', event.request.url);
  event.respondWith(fetch(event.request));
});
