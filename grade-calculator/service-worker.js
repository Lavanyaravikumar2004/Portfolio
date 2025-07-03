const CACHE_NAME = 'grade-calculator-v1';
const urlsToCache = [
  '/grade-calculator/',
  '/grade-calculator/index.html',
  '/grade-calculator/style.css',
  '/grade-calculator/grade.css',
  '/grade-calculator/script.js',
  '/grade-calculator/service-worker.js',
];

// Install and cache assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate and take control
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Serve cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
