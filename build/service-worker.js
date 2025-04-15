/* eslint-disable no-restricted-globals */

// Bu dosya service worker yaşam döngüsünü özelleştirmenize izin verir
// ve önbelleğe alınan içeriğe ilişkin davranışları tetikler.

const CACHE_NAME = 'nomen-est-omen-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/assets/stars.png',
  '/assets/golden-angel.jpg.png',
  '/assets/mystical-background.mp3.mp3'
];

// İçeriğin önbelleğe alınması
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// İstekleri yakalayarak içeriği service worker'dan sunma
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Eski önbellekleri temizleme
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
}); 