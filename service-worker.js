'use strict';
// Bump this name whenever the app shell changes so installed clients can refresh.
const CACHE_NAME = 'rrl-shell-v3';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/game.js',
  './js/expansion.js',
  './js/pwa.js',
  './manifest.webmanifest',
  './assets/rrl-logo.svg',
  './assets/rrl-icon.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)));
        }
        return response;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Network-first keeps deployed scripts/styles fresh while retaining an offline fallback.
  event.respondWith(
    fetch(request).then(response => {
      if (response && response.ok && response.type === 'basic') {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
      }
      return response;
    }).catch(() => caches.match(request).then(cached => {
      if (cached) return cached;
      if (request.destination === 'document') return caches.match('./index.html');
      return Response.error();
    }))
  );
});
