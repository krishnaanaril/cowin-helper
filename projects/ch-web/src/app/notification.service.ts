import { ApplicationRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public dialog: MatDialog,
    updates: SwUpdate
  ) {

    /**
     * Reload page when update is available
     */
    updates.available
      .pipe(switchMap(() => {
        return this.dialog.open(CustomAlertComponent, {
          data: {
            title: 'Update Available',
            body: 'A new version is available. It will take a moment with application reload.'
          }
        }).afterClosed();
      }))
      .subscribe(event => {
        updates.activateUpdate().then(() => document.location.reload());
      });

    /**
     * Reload page when an unrecoverable error occurs
     */
    updates.unrecoverable
      .pipe(switchMap((event) => {
        return this.dialog.open(CustomAlertComponent, {
          data: {
            title: 'Page reload required',
            body: `An error occurred that we cannot recover from:\n${event.reason}\n\n`
          }
        }).afterClosed();
      }))
      .subscribe(event => {
        document.location.reload();
      });

    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('message received from sw')
      console.log(event);
    });

  }
}
