const CACHE_NAME = 'grade-calculator-v1';
const urlsToCache = [
  '/',
  '/grade-calculator/',
  '/grade-calculator/index.html',
  '/grade-calculator/style.css',
  '/grade-calculator/grade.css',
  '/grade-calculator/script.js',
];

// Install event
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event
self.addEventListener('activate', event => {
  clients.claim(); // Control all clients
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
