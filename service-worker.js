const CACHE_NAME = "AniWeeb-v5";
var urlsToCache = [
  "manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/list.html",
  "/pages/soon.html",
  "/pages/fav.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/css/material-icons.css",
  "/fonts/MaterialIcons-Regular.ttf",
  "/fonts/MaterialIcons-Regular.woff",
  "/fonts/MaterialIcons-Regular.woff2",
  "/img/slider/567638.png",
  "/img/list/1.jpg",
  "/img/soon/1.jpg",
  "/js/main.js",
  "/js/materialize.min.js",
  "/js/regist-serviceworker.js",
  "icon-192x192.png",
  "icon-512x512.png",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache  ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});