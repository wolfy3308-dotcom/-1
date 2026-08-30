// sw.js - ارفعه بجانب index.html في نفس مجلد الموقع (نفس الدومين)
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });

self.addEventListener('push', (event) => {
  let data = { title: 'إشعار جديد', body: '' };
  try { data = event.data.json(); } catch (e) { try { data.body = event.data.text(); } catch (e2) {} }
  event.waitUntil(
    self.registration.showNotification(data.title || 'إشعار جديد', {
      body: data.body || '',
      icon: 'https://cdn-icons-png.flaticon.com/512/542/542638.png',
      dir: 'rtl',
      lang: 'ar'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
