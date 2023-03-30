import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from '../mocks/mat-dialog-mock';
import { IdbServiceMock } from '../mocks/storage-service-mock';
import { IdbService } from '../services/idb.service';

import { RequestLimiterInterceptor } from './request-limiter.interceptor';

describe('RequestLimiterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestLimiterInterceptor,
      { provide: MatDialog, useClass: MatDialogMock },
      { provide: IdbService, useclass: IdbServiceMock }
    ]
  }));

  it('should be created', () => {
    const interceptor: RequestLimiterInterceptor = TestBed.inject(RequestLimiterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
