
self.workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Cache google fonts
self.workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  self.workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new self.workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new self.workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);

// Cache images
self.workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available
  self.workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new self.workbox.expiration.Plugin({
        // Cache for a maximum of a week
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

// Cache css/js
// self.workbox.routing.registerRoute(
//   /\.(?:js|css|html)$/,
//   self.workbox.strategies.staleWhileRevalidate({
//     cacheName: 'static-resources',
//   }),
// );

// Fallback to cache for API XHR
// self.workbox.routing.registerRoute(
//   /.*\/api\/v1\/.*$/,
//   self.workbox.strategies.networkFirst({
//     networkTimeoutSeconds: 3,
//     cacheName: 'data',
//     plugins: [
//       new self.workbox.expiration.Plugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 60, // 5 minutes
//       }),
//     ],
//   }),
// );


