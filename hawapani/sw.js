const staticCacheName = 'site-static';

const assets = [
	'./',
	'./index.html',
	'./assets/img/night.webp',
	'./assets/img/warm.webp'
];

self.addEventListener('install', e => {
	// console.log("Service worker installed!");
	e.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			console.log("caching");
			cache.addAll(assets);
		})
	);
});

self.addEventListener('activate', e => {
	// console.log("Service worker activated!");
});

self.addEventListener('fetch', e => {
	// console.log('fetch event', e);
	e.respondWith(
		caches.match(e.request).then(cacheRes => {
			return cacheRes || fetch(e.request);
		})
	);
});