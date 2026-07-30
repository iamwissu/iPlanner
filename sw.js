// iPlanner — service worker
// Cache-first strategy for the static app shell so it works fully offline
// once a teacher has opened it once (all data lives in localStorage, not a server).
//
// IMPORTANT: bump CACHE_NAME (e.g. v2 -> v3) any time index.html, manifest.json,
// or any icon changes and gets redeployed. Without this, browsers that already
// installed/visited the app will keep serving the OLD cached files forever,
// since the fetch handler below is cache-first and only re-checks the network
// for files it doesn't already have cached under the current CACHE_NAME.

const CACHE_NAME = "iplanner-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Only cache successful, same-origin responses (e.g. Google Fonts CSS/files are cross-origin — let the browser's own HTTP cache handle those)
          if (response.ok && event.request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
