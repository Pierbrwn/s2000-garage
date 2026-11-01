// S2000 Garage v0.12 — self-contained offline app shell.
const CACHE='s2000-garage-shell-v012';
const SHELL=['./index.html','./manifest.webmanifest','./icon.svg'];
const scopeUrl=new URL(self.registration.scope);
const offlinePage=new URL('index.html',scopeUrl).href;
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
   const cache=await caches.open(CACHE);
   // Installation fails rather than falsely reporting offline-ready if core files are unavailable.
   await cache.addAll(SHELL);
   await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name.startsWith('s2000-garage-shell-')&&name!==CACHE).map(name=>caches.delete(name)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin || !url.pathname.startsWith(scopeUrl.pathname))return;
 if(request.mode==='navigate'){
  // App shell is cache-first: reliable offline launch and no dependence on an exact query string.
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const saved=await cache.match(offlinePage);
    if(saved)return saved;
    try{return await fetch(request)}catch(e){return new Response('S2000 Garage offline files are not installed yet. Reconnect to Wi-Fi and open the app again.',{status:503,headers:{'Content-Type':'text/plain'}})}
  })());
  return;
 }
 event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   const saved=await cache.match(request,{ignoreSearch:true});
   if(saved)return saved;
   return fetch(request);
 })());
});
