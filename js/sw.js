const CacheName = 'cache-restaurant';
let cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
  ];

self.addEventListener('install',function(e) {
  console.log('ServiceWorker Installed');
  
    e.waitUntil(
      caches.open('CacheName').then(function(cache){
        console.log('Caching cacheFiles');
        return cache.addAll(cacheFiles);
      })
      .catch(err => {
        console.log('An error has occurred');
      })
    );
});

self.addEventListener('activate', function(e) {
  console.log('WonderTwins Activate! Form of an Iceberg!');
  e.waitUntil(
    caches.keys()
    .then(function(CacheNames) {
      return Promise.all(
        CacheNames.filter(function(CacheName){
          return CacheName.startsWith('restaurant') && CacheName != CacheName;
        }).map(function(CacheName) {
          return caches.delete(CacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
    .then(function(response){
      if (response) {
        console.log('Found', e.request.url, 'in cache');
        return response;
      }
      
        var requestClone = e.request.clone();
        
        return fetch(requestClone).then(
          function(response) {
          if(!response) {
            console.log('No response. End Transmission');
            return response;
          }
      
  var responseClone = response.clone();
  
 caches.open(CacheName)
  .then(function(cache) {
    cache.put(e.request, responseClone);
  });
    return response;
  })
    .catch(function(err) {
      console.log('What?');
    });
       
      

