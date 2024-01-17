console.log('12222,server worker')

const cacheKey=new Date().toISOString()
const cacheList=[
    '/dist/index.html',
    '/css/main.css',
    '/dist/bundle.js'
]


self.addEventListener('install',function(event){
    console.log(event)
    event.waitUntil(
        caches.open(cacheKey).then((cache)=>{
            console.log('OPened cache');
            return cache.addAll(cacheList)
        })
    )
})
self.addEventListener('fetch', (event) => {
    event.respondWidth(
        caches.match(event.request)
        .then((response)=>{
            if(response)response
            return  fetch(event.request)
        })
        )
})


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheKey];
   
    event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
        // 将不在白名单里面的缓存全部清理掉
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return '';
        }),
      )),
    );
  });
 