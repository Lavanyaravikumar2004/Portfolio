const CACHE_NAME = 'grade-calculator-cache-v1';

const urlsToCache = [
  '/grade-calculator/',
  '/grade-calculator/index.html',
  '/grade-calculator/grade.css',
  '/grade-calculator/grade.js',
  '/grade-calculator/manifest.json',
  '/grade-calculator/icon-192.png',
  '/grade-calculator/icon-512.png'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/grade-calculator/index.html');
        }
      });
    })
  );
});
