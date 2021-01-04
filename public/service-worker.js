importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '5' },
  { url: '/nav.html', revision: '1' },
  { url: '/match.html', revision: '5' },
  { url: '/pages/about.html', revision: '2' },
  { url: '/pages/home.html', revision: '2' },
  { url: '/pages/saved.html', revision: '2' },
  { url: '/pages/top_scorers.html', revision: '2' },
  { url: '/manifest.json', revision: '1' },
  { url: '/package.json', revision: '5' },
  { url: '/package-lock.json', revision: '5' },
  { url: '/css/materialize.min.css', revision: null },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '2' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: null },
  { url: '/js/main.js', revision: '3' },
  { url: '/js/match.js', revision: '3' },
  { url: '/js/nav.js', revision: '3' },
  { url: '/img/post-1.png', revision: null },
  { url: '/img/icons/icon-72x72.png', revision: null },
  { url: '/img/icons/icon-96x96.png', revision: null },
  { url: '/img/icons/icon-128x128.png', revision: null },
  { url: '/img/icons/icon-144x144.png', revision: null },
  { url: '/img/icons/icon-152x152.png', revision: null },
  { url: '/img/icons/icon-192x192.png', revision: null },
  { url: '/img/icons/icon-384x384.png', revision: null },
  { url: '/img/icons/icon-512x512.png', revision: null }
], {
  ignoreURLParametersMatching: [/.*/]
});

/*workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'api-data'
  })
); */

workbox.routing.registerRoute(
  new RegExp('.png'),
  new workbox.strategies.CacheOnly({
    cacheName: 'images'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  new workbox.strategies.CacheFirst({
    cacheName: 'football-data'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/momentjs\.com\downloads\moment.js/,
  new workbox.strategies.CacheFirst({
    cacheName: 'moment'
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
