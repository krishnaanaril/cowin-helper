importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    self.addEventListener('notificationclick', (event, self=this) => {
        console.log(event);
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);      

        self.postMessage({
            message: 'test',
            url: event.notification.data.url
        });
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));
        }
    });
    
    self.addEventListener('periodicsync', event => {
        alert('periodic syc evnet outside'+ event.tag);
        if (event.tag == 'content-sync') {
          event.waitUntil(fetchAndCacheLatestNews());
        }
      });
}
());