
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

  const urlToOpen = event.notification.data?.url || 'https://your-default-url.com';

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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',  
        '/logo.png',
        
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  const cacheWhitelist = ['static-cache-v1']; // Only keep the latest cache

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove old caches
          }
        })
      );
    })
  );
});



self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
