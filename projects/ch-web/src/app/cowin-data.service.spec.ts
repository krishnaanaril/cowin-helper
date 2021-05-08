import { TestBed } from '@angular/core/testing';

import { CowinDataService } from './cowin-data.service';

describe('CowinDataService', () => {
  let service: CowinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CowinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
