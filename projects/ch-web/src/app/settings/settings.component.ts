import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'ch-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.componentDestroyed$ = new Subject<false>();
  }

  enablePeriodicSync = this.formBuilder.control(false);
  componentDestroyed$: Subject<boolean>;

  ngOnInit(): void {

    this.enablePeriodicSync.valueChanges.subscribe((enable: boolean) => {
      if (enable) {
        this.registerPeriodicSync();
      } else {
        this.unRegisterPeriodicSync();
      }
    });
    
    this.checkPeriodicSyncExists();
  }

  async checkPeriodicSyncExists() {
    const registration = await navigator.serviceWorker.ready;
    if ('periodicSync' in registration) {
      const tags = await (<any>registration).periodicSync.getTags();
      // Only update content if sync isn't set up.
      if (!tags.includes('content-sync')) {
        this.enablePeriodicSync.setValue(true);
      }
    }
  }

  async registerPeriodicSync() {
    const status = await navigator.permissions.query({
      name: <any>'periodic-background-sync',
    });
    if (status.state === 'granted') {
      // Periodic background sync can be used.
      const registration = await navigator.serviceWorker.ready;
      if ('periodicSync' in registration) {
        try {
          await (<any>registration).periodicSync.register('content-sync', {
            // An interval of 12 hours
            minInterval: 12 * 60 * 60 * 1000,
          });
          console.log('Sync registered');
        } catch (error) {
          // Periodic background sync cannot be used.
        }
      }
    } else {
      // Periodic background sync cannot be used.
    }
  }

  async unRegisterPeriodicSync() {
    const registration = await navigator.serviceWorker.ready;
    if ('periodicSync' in registration) {
      await (<any>registration).periodicSync.unregister('content-sync');
      console.log('unregistered')
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

}
