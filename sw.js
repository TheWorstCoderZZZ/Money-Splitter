const CACHE_NAME = 'billsplit-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝時將檔案加入 Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網絡請求，無上網就畀 Cache 佢
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 搵到 Cache 就直接畀
        }
        return fetch(event.request); // 搵唔到先去網絡攞
      })
  );
});
