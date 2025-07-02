self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('grade-calculator-cache').then(function (cache) {
      return cache.addAll([
        '/grade-calculator/',
        '/grade-calculator/index.html',
        '/grade-calculator/grade.css',
        '/grade-calculator/grade.js',
        '/grade-calculator/icon-192.png',
        '/grade-calculator/icon-512.png',
        '/grade-calculator/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
