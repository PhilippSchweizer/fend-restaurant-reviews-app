// Thanks to the maintainers of https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
// for the very comprehensive explanation of the following code.

const filesToCache = [
	'https://fonts.googleapis.com/css?family=Montserrat:700',
				'https://fonts.googleapis.com/css?family=Open+Sans',
				'/',
				'/index.html',
				'/index.html?homescreen=1',
				'/?homescreen=1',
				'restaurant.html',
				'/restaurant.html?homescreen=1',
				'/css/styles.css',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/data/restaurants.json',
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

const staticCacheName = 'r-reviews-v1';

self.addEventListener('install', e => {
	console.log('Attempting to install service worker and cache static assets');
	e.waitUntil(
		caches.open('staticCacheName')
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	console.log('Fetch event for ', event.request.url);
  event.respondWith(
		caches.match(event.request).then( response => {
			if (response) {
				console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
			
      .then(response => {

				// TODO 5 - Respond with custom 404 page
			
				return caches.open(staticCacheName).then(function(cache) {
					if (event.request.url.indexOf('test') < 0) {
						cache.put(event.request.url, response.clone());
					}
					return response;
				});
			});
			
    }).catch(error => {
			
			// TODO 6 - Respond with custom offline page
			
    })
  );
});

/* self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request).catch(() => {
			return caches.match(event.request);
		})
	 );
}) */