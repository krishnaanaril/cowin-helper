importScripts('./ngsw-worker.js');
importScripts('./utilities.js');

(function () {
    'use strict';

    navigator.permissions.query({
        name: 'periodic-background-sync',
    }).then((status) => {
        if (status.state === 'granted') {
            // Periodic background sync can be used.            
            if ('periodicSync' in self.registration) {
                try {
                    self.registration.periodicSync.register('content-sync', {
                        // An interval of 5 min.
                        minInterval: 5 * 60 * 1000,
                    }).then(() => {
                        set('periodicSyncSupport', true);
                    });
                } catch (error) {
                    // Periodic background sync cannot be used.
                    set('periodicSyncSupport', false);
                }
            } else {
                set('periodicSyncSupport', false);
            }
            // console.log('Yes');
        } else {
            // Periodic background sync cannot be used.
            set('periodicSyncSupport', false);
            // console.log('NO');
        }
    });

    self.addEventListener('periodicsync', (event) => {
        if (event.tag === 'content-sync') {
            // See the "Think before you sync" section for
            // checks you could perform before syncing.
            self.registration.showNotification('Yee Ha, Content Sync');
            event.waitUntil(syncContent());
        }
        // Other logic for different tags as needed.
    });

    self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'FROM_APP') {
            console.log('message received from app');
            if ('periodicSync' in self.registration) {
                self.registration.periodicSync.getTags().then((tags) => {
                    if (!tags.includes('content-sync')) {
                        self.registration.showNotification('Content Sync Not found');
                    } else {
                        self.registration.showNotification('Content Sync Success');
                    }
                });
            }

            self.clients.matchAll().then((clients) => {
                if (clients && clients.length) {
                    //Respond to last focused tab
                    clients[0].postMessage({ type: 'FROM_SW' });
                }
            });
        }
    })

    self.addEventListener('notificationclick', (event) => {
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));
        }
    });
}
    ());