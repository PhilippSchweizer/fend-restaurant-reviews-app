/*
Copyright 2018 Philipp Schweizer.

The following code is heavily influenced by the code in the 
PWA Training Labs (https://developers.google.com/web/ilt/pwa/) which is part
of the Google Developer Training (https://developers.google.com/web/). It is 
licensed under the Apache License, Version 2.0 and can be found here:
https://github.com/google-developer-training/pwa-training-labs/blob/master/cache-api-lab/solution/service-worker.js
The accompanying tutorial, titled "Lab: Caching Files with Service Worker" can be found here:
https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker

*/

// Define the files to cache and assign to the filesToCache variable.
const filesToCache = [
	'/',
	'/?homescreen=1',
	'/index.html',
	'/index.html?homescreen=1',
	'restaurant.html',
	'/restaurant.html?homescreen=1',
	'/css/styles.css',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/dbhelper.js',
	'/data/restaurants.json',
	'https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans',
	'https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2',
	'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2',
	'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1203/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1203/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1204/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1204/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1205/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1205/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1206/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1206/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1207/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1207/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1208/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1208/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1209/1539.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1209/1540.jpg70?access_token=pk.eyJ1IjoicGhtYXNjIiwiYSI6ImNqazZ6ZWNpcDB2ZGIzcHAwODRiYXdxd2QifQ.Al04ysTJPHBehxvH1PPSFA',
	'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
	'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
	'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
];

// Apply cache name to a variable. Updating the cache name and by extension the cache 
// version can than happen in one place.
const staticCacheName = 'r-reviews-v1';

// Inside the install event handler: create the cache with caches.open and
// use the addAll method to add the files to the cache. e.waitUntil to
// extend the lifetime of the event until all of the files are added to the
// cache and addAll resolves successfully.
self.addEventListener('install', e => {
	console.log('Attempting to install service worker and cache static assets');
	e.waitUntil(
		caches.open('staticCacheName')
			.then(cache => {
				return cache.addAll(filesToCache);
			}).catch(error => {
				console.log('Attempt to store assets in cache resulted in ' + error)
			})
	);
});

// Intercept all requests to the network with a fetch event listener.
// Create custom response to those requests with e.respondWith.
// Use Cache falling back to network strategy:
//   1. check the cache for the requested resource (with caches.match)
//   2. if that fails, send the request to the network.
self.addEventListener('fetch', e => {
	console.log('Fetch event for ', e.request.url);
	e.respondWith(
		caches.match(e.request).then(response => {
			if (response) {
				console.log('Found ', e.request.url, ' in cache');
				return response;
			}
			console.log('Network request for ', e.request.url);
			return fetch(e.request)

			/* .then(response => {
				return caches.open(staticCacheName).then(cache => {
					if (e.request.url.indexOf('test') < 0) {
						cache.put(e.request.url, response.clone());
					}
					return response;
				});
			}); */

		})
		/* .catch(error => {

			// TODO 6 - Respond with custom offline page

		}) */
	);
});