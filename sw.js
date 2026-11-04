const CACHE='liamgael-v5';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest',
  './assets/interfaz-referencia.webp','./assets/logo-oficial.jpg','./assets/apple-touch-icon.png','./assets/icon-192.png','./assets/icon-512.png','./assets/share-card.png',
  './assets/ramos-coreanos.jpg','./assets/decoracion-carro.jpg','./assets/cumpleanos.jpg','./assets/condolencias.jpg','./assets/arcos.jpg'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      }
      return response;
    }))
  );
});
