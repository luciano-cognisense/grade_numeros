const CACHE_NAME = 'jogo-da-matriz-v1';
const urlsToCache = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'icons/lowres.png',
  'icons/hd_hi_72.png',
  'icons/hd_hi_96.png'
];

// Instala o Service Worker e faz cache dos recursos necessários
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.error('Falha ao adicionar ao cache:', err);
        });
      })
  );
});

// Intercepta as requisições e responde com os recursos em cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
