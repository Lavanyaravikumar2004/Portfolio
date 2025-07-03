const CACHE_NAME = 'grade-calculator-cache-v6';

const urlsToCache = [
  '/grade-calculator/',
  '/grade-calculator/index.html',
  '/grade-calculator/grade.css',
  '/grade-calculator/grade.js',
  '/grade-calculator/icon-192.png',
  '/grade-calculator/icon-512.png',
  '/grade-calculator/manifest.json'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing and caching...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() =>
        event.request.mode === 'navigate'
          ? caches.match('/grade-calculator/index.html')
          : null
      )
    )
  );
});
