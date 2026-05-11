const CACHE = 'lfs-v7';
const STATIC_ASSETS = [
  '/js/toast.js',
  '/js/calendar.js',
  '/logo.png',
  '/favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Skip non-GET and external API calls entirely
  if (e.request.method !== 'GET') return;
  if (url.includes('firebase') || url.includes('googleapis') ||
      url.includes('emailjs') || url.includes('telegram')) return;

  // HTML pages → Network first, fall back to cache
  if (e.request.mode === 'navigate' ||
      e.request.headers.get('Accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // JS/CSS/Fonts → Cache first (static, rarely changes)
  if (url.includes('/js/') || url.includes('fonts.g') ||
      url.includes('.css') || url.includes('/favicon')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
    return;
  }

  // Images → Cache first, update in background (stale-while-revalidate)
  if (url.includes('/img/') || url.includes('/logo.')) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const fetchPromise = fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          });
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Everything else → Network first
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
