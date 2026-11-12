// 2026-02-23 | RU/DE/EN: Cache bump + safer update flow (skipWaiting/message).
// 2026-11-02: Lektionen Level 1-2, Lernen der Reihe nach.
const CACHE = "sprachbox-it-v6"; // 2026-11-12: Auto-Stimme ohne Spass-Stimmen // 2026-11-06: eigener Cache fuer DE↔IT
const CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./benutzer.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/bg-de-en.webp",
  "./data/lektionen_de_it.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async ()=>{
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === CACHE || !k.startsWith("sprachbox-it-")) ? null : caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache-first for same-origin, runtime cache for JSON
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // 2026-11-02: Audio (mp3 + index.json) nicht ueber den SW-Cache:
  // Safari braucht Range-Requests fuer <audio>, und der Index soll immer frisch sein.
  if (url.pathname.includes("/audio/")) return;

  event.respondWith((async ()=>{
    const cache = await caches.open(CACHE);

    // Prefer fresh HTML for navigation so updates show up sooner.
    if (req.mode === "navigate") {
      try{
        const fresh = await fetch(req, { cache: "no-cache" });
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      }catch(_e){
        const fallbackNav = await cache.match(req);
        if (fallbackNav) return fallbackNav;
        const fallbackIndex = await cache.match("./index.html");
        if (fallbackIndex) return fallbackIndex;
      }
    }

    // 2026-11-05: Programm-Dateien (js, css, json, html) immer zuerst frisch aus dem Netz,
    // nur offline aus dem Cache – sonst sieht man neue Funktionen erst nach mehrmaligem Neuladen.
    if (/\.(js|css|json|html|webmanifest)$/i.test(url.pathname)) {
      try {
        const fresh = await fetch(req, { cache: "no-cache" });
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (_e) {
        const old = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
        if (old) return old;
        throw _e;
      }
    }

    // Bilder usw.: Cache zuerst
    const cached = await cache.match(req);
    if (cached) return cached;

    try{
      const res = await fetch(req);
      // Cache successful responses (including JSON)
      if (res && res.ok){
        cache.put(req, res.clone());
      }
      return res;
    }catch(e){
      // Offline fallback to index for navigation
      if (req.mode === "navigate"){
        const fallback = await cache.match("./index.html");
        if (fallback) return fallback;
      }
      throw e;
    }
  })());
});



