import { TestBed } from '@angular/core/testing';

import { RequestLimiterInterceptor } from './request-limiter.interceptor';

describe('RequestLimiterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestLimiterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestLimiterInterceptor = TestBed.inject(RequestLimiterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
