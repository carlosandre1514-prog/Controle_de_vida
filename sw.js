/* Service worker do Meu Controle de Vida: deixa o app abrir offline.
   Troque o número da versão (V) sempre que quiser forçar a atualização do cache. */
const V = 'mcv-v7';
const CORE = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png', 'termos.html', 'privacidade.html'];
const CDN = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.all([...CORE, ...CDN].map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return; // a IA (POST) nunca passa pelo cache
  const u = new URL(r.url);

  // arquivos do próprio app: tenta a internet primeiro (pega atualizações) e cai no cache se estiver offline
  if (u.origin === location.origin) {
    e.respondWith(
      fetch(r)
        .then(res => {
          const cp = res.clone();
          caches.open(V).then(c => c.put(r, cp));
          return res;
        })
        .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html')))
    );
    return;
  }

  // biblioteca do mapa e fonte: cache primeiro
  if (['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(u.hostname)) {
    e.respondWith(
      caches.match(r).then(m => m || fetch(r).then(res => {
        const cp = res.clone();
        caches.open(V).then(c => c.put(r, cp));
        return res;
      }))
    );
  }
});
