/* PicGallery service worker. All paths are relative to the registration scope. */

const CACHE_NAME = 'picgallery-v1'
const FALLBACK = new URL('./index.html', self.registration.scope).href

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './img/adrianna-geo-1rBg5YSi00c-unsplash.jpg',
  './img/birmingham-museums-trust--KfLa4I4eTo-unsplash.jpg',
  './img/birmingham-museums-trust-8wcoY3wcbL0-unsplash.jpg',
  './img/birmingham-museums-trust-HEEvYhNzpEo-unsplash-2.jpg',
  './img/birmingham-museums-trust-_fXZDGdrYZk-unsplash.jpg',
  './img/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg',
  './img/europeana-6c43FgRt0Dw-unsplash.jpg',
  './img/europeana-8xd8LoQJyFk-unsplash-2.jpg',
  './img/formats/alegoria-celeste.png',
  './img/formats/bodegon-flores.png',
  './img/formats/bodegon-frutas.png',
  './img/formats/geometria-cromatica.webp',
  './img/formats/jardin-interior.webp',
  './img/formats/rafaga-cromatica.webp',
  './img/formats/raw/ferrari-amarillo.raw-preview.jpg',
  './img/formats/raw/ferrari-azul.raw-preview.jpg',
  './img/formats/sol-de-oleo.webp',
  './img/ken-cheung-Z2M2KkdNLWQ-unsplash.jpg',
  './img/lukas-meier-aAxn9pYE8L0-unsplash.jpg',
  './img/paul-blenkhorn-8BUZwtS4al0-unsplash.jpg',
  './img/pexels-dbaler-30112301.jpg',
  './img/pexels-mikebirdy-5759866-2.jpg',
  './img/pexels-mikebirdy-9735310.jpg',
  './img/shahzaib-khan-JhhkETs8fjE-unsplash.jpg',
  './img/steve-johnson-QlBdxJK2-nU-unsplash.jpg',
  './img/steve-johnson-RLyEzLmhR98-unsplash.jpg',
  './img/steve-johnson-r6l_wk3GrgI-unsplash.jpg'
]

async function shellPaths() {
  const paths = new Set(SHELL)

  try {
    const response = await fetch(FALLBACK, { cache: 'no-store' })
    if (!response.ok) return [...paths]
    const html = await response.text()
    for (const match of html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)) {
      paths.add(match[1])
    }
  } catch {
    // The static shell remains available even if the document cannot be read.
  }

  return [...paths]
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return new Response('', { status: 504, statusText: 'Offline' })
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (
      (await cache.match(request)) ||
      (await cache.match(FALLBACK)) ||
      new Response('', { status: 504, statusText: 'Offline' })
    )
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => cached)

  return cached || network
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const paths = await shellPaths()
      await Promise.all(
        paths.map(async (path) => {
          try {
            await cache.add(path)
          } catch {
            // A missing optional asset must not block installation.
          }
        })
      )
      await self.skipWaiting()
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => key.startsWith('picgallery-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
      await self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }
  event.respondWith(cacheFirst(request))
})
