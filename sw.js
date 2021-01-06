//console.log('Hello from sw.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

if (workbox) {
  //console.log(`Yay! Workbox is loaded 🎉`);

  // This will trigger the importScripts() for workbox.strategies and its dependencies:
  workbox.loadModule('workbox-strategies');
  workbox.loadModule('workbox-expiration');

  workbox.precaching.precacheAndRoute([
    {
      "url": "/",
      "revision": "1"
    }
  ]);

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:json)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'json',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 5,
          maxAgeSeconds: 24 * 60 * 60, // 1 Day
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/(.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'cloudflare',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
        }),
      ],
    }),
  );
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}