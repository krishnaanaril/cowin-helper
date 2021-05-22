importScripts('./ngsw-worker.js');
importScripts('./utilities.js');

(function () {
    'use strict';

    self.addEventListener('periodicsync', (event) => {
        if (event.tag === 'content-sync') {
            // See the "Think before you sync" section for
            // checks you could perform before syncing.            
            event.waitUntil(syncContent());
        }
        // Other logic for different tags as needed.
    });

    self.addEventListener('notificationclick', (event) => {
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));
        }
    });
    
}
    ());