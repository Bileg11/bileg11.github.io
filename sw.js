const CACHE = 'lfs-v4';
const STATIC = [
  '/',
  '/booking/',
  '/marshrut/',
  '/zuvlumj/',
  '/eruul-mend/',
  '/js/toast.js',
  '/js/calendar.js',
  '/logo.png',
  '/favicon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
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
  // Network first for Firebase/API calls
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('emailjs') ||
      e.request.url.includes('telegram')) {
    return;
  }
  // Cache first for static assets
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
