self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('grade-calculator-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './grade.css',
        './grade.js',
        './icon-192.png',
        './icon-512.png',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
