const CACHE_NAME = 'grade-calculator-v2';

const urlsToCache = [
  'https://lavanyaravikumar2004.github.io/grade-calculator/',
  'https://lavanyaravikumar2004.github.io/grade-calculator/index.html',
  'https://lavanyaravikumar2004.github.io/grade-calculator/style.css',
  'https://lavanyaravikumar2004.github.io/grade-calculator/grade.css',
  'https://lavanyaravikumar2004.github.io/grade-calculator/script.js',
  'https://lavanyaravikumar2004.github.io/grade-calculator/service-worker.js',
];

// Install: cache all required files
self.addEventListener('install', event => {
  console.log('[SW] Installing and caching assets...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: take control
self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(self.clients.claim());
});

// Fetch: try cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
