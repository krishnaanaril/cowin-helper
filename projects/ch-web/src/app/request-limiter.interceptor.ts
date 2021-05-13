import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, from, iif, Observable, of } from 'rxjs';
import { IdbService } from './idb.service';
import { RequestQueue } from './models/request-queue';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class RequestLimiterInterceptor implements HttpInterceptor {

  constructor(
    private storageService: IdbService
  ) {}

  private checkTimeDifference(startDate: Date, endDate: Date) {    
    const diffMins = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60);
    return diffMins > 5;
  }

  private proceedRequest(request: HttpRequest<unknown>, activeRequests: RequestQueue[]) {
    return this.storageService.updateItem('activeRequests', activeRequests).pipe(
      map(()=> request)
    );
  }

  private checkRequestsCount(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.storageService.getItem('activeRequests').pipe(
      switchMap((activeRequests: RequestQueue[]) => {
        const currentDate = new Date();    
        if(activeRequests == null) {
          activeRequests = [];
        }  
        while(activeRequests.length > 0 && this.checkTimeDifference(activeRequests[0].requestedTime, currentDate)) {
          activeRequests.shift();
        };      
        if(activeRequests.length < 10) {
          const currentRequest: RequestQueue = {
            requestedTime: currentDate,
            url: request.url
          };
          activeRequests.push(currentRequest);
          return this.proceedRequest(request, activeRequests);
        }
        return EMPTY;
      }),
      mergeMap((result) => next.handle(result))      
    );
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.reportProgress) {
      return this.checkRequestsCount(request, next);
    } else {
      return next.handle(request);
    }
  }
}