const V='lector-v4',F=['./','./index.html','./manifest.webmanifest','./lib/pdf.min.js','./lib/pdf.worker.min.js','./lib/jszip.min.js','./icon-192.png','./icon-512.png'];
self.oninstall=e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()};
self.onactivate=e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim()));
// con internet siempre baja la versión más nueva; sin internet usa la copia guardada
self.onfetch=e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))};
