const V='lector-v1',F=['./','./index.html','./manifest.webmanifest','./lib/pdf.min.js','./lib/pdf.worker.min.js','./lib/jszip.min.js','./icon-192.png','./icon-512.png'];
self.oninstall=e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()};
self.onactivate=e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim()));
self.onfetch=e=>{if(e.request.method=='GET')e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))};
