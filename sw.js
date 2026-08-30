// Field Ledger — minimal service worker.
// Its presence (with a fetch handler) is what tells Chrome/Android this is a
// real installable app rather than a plain bookmark shortcut — this is what
// removes the little browser badge from the home screen icon and lets it
// appear in the main app drawer alongside your other apps.

const CACHE_NAME = 'field-ledger-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Pass every request straight through to the network. This app stores all
// its data locally (localStorage/IndexedDB) and doesn't need offline page
// caching, so this fetch handler exists only to satisfy the PWA install
// requirement rather than to actually change how requests are handled.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
