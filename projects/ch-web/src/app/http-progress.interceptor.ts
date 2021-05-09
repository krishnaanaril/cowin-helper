import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class HttpProgressInterceptor implements HttpInterceptor {

  private activeRequestCount;

  constructor(
    private readonly progressBarService: ProgressBarService
  ) {
    this.activeRequestCount = 0;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.reportProgress) {
      // only intercept when the request is configured to report its progress
      this.activeRequestCount++;
      this.progressBarService.showProgress();
      return next.handle(request).pipe(         
        finalize(()=>{
          this.activeRequestCount--;
          if(this.activeRequestCount === 0) {
            this.progressBarService.hideProgress();
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
