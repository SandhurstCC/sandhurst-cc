// firebase-messaging-sw.js
// Handles push notifications when the app is in the background or closed.
// This file must be at the ROOT of your site (same folder as index.html).

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// ── REPLACE WITH YOUR FIREBASE CONFIG (same values as index.html) ─────────────
firebase.initializeApp({
  apiKey:            "AIzaSyDLIEPGcR2ctowOGfjGVC_s6qC0hbapT0w",
  authDomain:        "sandhurst-cc.firebaseapp.com",
  databaseURL:       "sandhurst-cc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "sandhurst-cc",
  storageBucket:     "sandhurst-cc.firebasestorage.app",
  messagingSenderId: "649051663046",
  appId:             "1:649051663046:web:6b303d8988af44c1c7c5c7"
});
// ─────────────────────────────────────────────────────────────────────────────

const messaging = firebase.messaging();

// Show notification when app is in background
messaging.onBackgroundMessage(payload => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || "Sandhurst CC", {
    body:    n.body  || "",
    icon:    "/icon-192.png",
    badge:   "/icon-192.png",
    data:    { url: "/" },
    requireInteraction: true,
  });
});

// Tap on notification opens the app
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      for (const c of clientList) {
        if (c.url === "/" && "focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
