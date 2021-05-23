import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProgressBarConfiguration } from '../models/progress-bar-configuration';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  showProgressBar: Subject<ProgressBarConfiguration>;
  showProgressBar$: Observable<ProgressBarConfiguration>;

  constructor() {
    this.showProgressBar = new Subject<ProgressBarConfiguration>();
    this.showProgressBar$ = this.showProgressBar.asObservable();
  }

  showProgress(mode?: string, value?: number, bufferValue?: number) {
    this.showProgressBar.next({
      show: true,
      color: 'accent',
      mode: mode ? mode : 'indeterminate',
      value: value,
      bufferValue: bufferValue
    })
  }

  hideProgress() {
    this.showProgressBar.next({
      show: false
    });
  }
}
