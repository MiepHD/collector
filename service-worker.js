const staticCacheName = 'site-static';
const assets = [
  '/cards/index.css',
  '/cards/index.html',
  '/cards/index.js',
  '/lib/jquery.js',
  '/nav/gallery.png',
  '/nav/index.css',
  '/nav/index.html',
  '/nav/load.js',
  '/nav/puzzle.png',
  '/puzzle/index.css',
  '/puzzle/index.html',
  '/puzzle/index.js',
  '/questions/index.css',
  '/questions/index.html',
  '/questions/index.js',
  '/upload/index.css',
  '/upload/index.html',
  '/upload/index.js',
  '/data.js',
  '/icon.png',
  '/index.html',
  '/',
  '/theme.css',
];
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching');
      cache.addAll(assets);
    })
  );
});
