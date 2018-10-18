
self.addEventListener('push', (event) => {
  const eventPayload = JSON.parse(event.data.text());
  const notificationOptions = {
    body: eventPayload.body,
    icon: 'img/icons/apple-touch-icon-76x76.png',
    badge: 'img/icons/apple-touch-icon-76x76.png'
  };

  event.waitUntil(self.registration.showNotification(eventPayload.title, notificationOptions));
});