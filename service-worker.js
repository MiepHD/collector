const staticCacheName = 'site-static';
const assets = [
  '/',
  '/assets/icons/maskable/icon_x48.png',
  '/assets/icons/maskable/icon_x72.png',
  '/assets/icons/maskable/icon_x96.png',
  '/assets/icons/maskable/icon_x128.png',
  '/assets/icons/maskable/icon_x192.png',
  '/assets/icons/maskable/icon_x384.png',
  '/assets/icons/maskable/icon_x512.png',
  '/assets/icons/maskable/icon.png',
  '/assets/icons/icon.ico',
  '/assets/icons/icon.png',
  '/assets/icons/mono_icon.png',
  '/assets/delete.png',
  '/assets/download.png',
  '/assets/gallery.png',
  '/assets/puzzle.png',
  '/cards/index.css',
  '/cards/index.html',
  '/cards/index.js',
  '/lib/jquery.js',
  '/lib/lz-string.min.js',
  '/nav/index.css',
  '/nav/index.html',
  '/nav/load.js',
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
  '/general.css',
  '/index.html',
  '/theme.css',
];
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.NetworkFirst()
);
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching');
      cache.addAll(assets);
    })
  );
});
