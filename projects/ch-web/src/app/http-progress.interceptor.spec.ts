import { TestBed } from '@angular/core/testing';

import { HttpProgressInterceptor } from './http-progress.interceptor';

describe('HttpProgressInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpProgressInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpProgressInterceptor = TestBed.inject(HttpProgressInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
