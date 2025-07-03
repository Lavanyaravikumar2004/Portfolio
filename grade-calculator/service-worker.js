const CACHE_NAME = 'grade-calculator-v1';
const urlsToCache = [
  '/grade-calculator/',
  '/grade-calculator/index.html',
  '/grade-calculator/style.css',
  '/grade-calculator/grade.css',
  '/grade-calculator/script.js',
  '/grade-calculator/service-worker.js',
];

// Install event — cache all assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event — take control immediately
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch event — serve cached assets when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
