import { ApplicationRef, Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    appRef: ApplicationRef, updates: SwUpdate
  ) { 

    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));

  }
}
