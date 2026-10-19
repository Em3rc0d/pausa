/* Pausa v1.11.0 — version-safe shell, cached media library. */
const CACHE = 'pausa-shell-v1.11.0';
const MEDIA_CACHE = 'pausa-library-v1.2';
const SHELL = ['./','./index.html','./styles.css',
  './fullbody.js','./app.js','./core.js','./data.js','./agent-core.js','./agent-planner.js','./agent-ui.js',
  './agent-worker.js','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png',
  './assets/icon-512.png','./assets/fullbody/catalog.json',
  ...['walk','shoulders','pelvisChair','torso','shift','pelvicFloor','catCow','knees','bridge','birdDog','sitStand']
    .flatMap(id=>['./assets/exercises/'+id+'.png','./assets/exercises/'+id+'.gif'])];

self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll(SHELL);
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(key=>key.startsWith('pausa-')&&key!==CACHE&&key!==MEDIA_CACHE).map(key=>caches.delete(key)));
 await self.clients.claim();
})()));

self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 const isLargeMedia=url.pathname.includes('/assets/fullbody/');
 if(isLargeMedia){
  // GIF and posters can stay cache-first: immutable within a release.
  event.respondWith((async()=>{
   const cache=await caches.open(MEDIA_CACHE);
   const cached=await cache.match(req);
   if(cached)return cached;
   const response=await fetch(req);
   if(response.ok){try{await cache.put(req,response.clone())}catch{ /* quota exceeded */ }}
   return response;
  })());
  return;
 }
 // Never show stale HTML, JS, CSS, or guide logic when online.
 // Use the precache for offline fallback, ignoring harmless cache-busting queries.
 event.respondWith((async()=>{
  try{
   const response=await fetch(req);
   if(response.ok)return response;
   const cached=await caches.match(req,{ignoreSearch:true});
   return cached||response;
  }catch(error){
   const cached=await caches.match(req,{ignoreSearch:true});
   if(cached)return cached;
   if(req.mode==='navigate'){
    const offline=await caches.match('./index.html');
    if(offline)return offline;
   }
   throw error;
  }
 })());
});
