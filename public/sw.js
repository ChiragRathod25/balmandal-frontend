self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  if (Notification.permission !== 'granted') {
    console.error('❌ Notification permissions not granted');
  }

  const { title, message, poster, _id, badge, link } = data;

  const options = {
    body: message,
    tag: _id,
    icon: poster,
    badge: badge,
    data: { url: link },
    actions: [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification popup

  const urlToOpen = event.notification.data?.url || 'https://apcbalmandal.vercel.app';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      let matchingClient = null;

      // If PWA is open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.origin) && 'focus' in client) {
          matchingClient = client;
          break;
        }
      }

      if (matchingClient) {
        console.log('Focusing existing PWA instance');
        return matchingClient.navigate(urlToOpen).then(() => matchingClient.focus());
      } else {
        return clients.openWindow(urlToOpen).catch(() => {
          // As a fallback, open manually
          location.href = urlToOpen;
        });
      }
    })
  );
});

const CACHE_NAME = 'static-cache-v1.2';
const ASSETS_TO_CACHE = [
  '/manifest.json',
  '/logo.webp',
  '/avatar.webp',
  '/eventDefault.webp',
  '/achievementHero.avif',
];

//install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate new service worker immediately
});

// activate
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            // If the cache name doesn't match the current cache name
            // Delete the old cache
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of all clients(pages) immediately
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
