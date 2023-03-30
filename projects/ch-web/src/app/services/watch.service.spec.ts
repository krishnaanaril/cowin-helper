import { MatDialog } from '@angular/material/dialog';
import { TestBed } from '@angular/core/testing';

import { MatDialogMock } from '../mocks/mat-dialog-mock';
import { WatchService } from './watch.service';
import { CowinDataService } from './cowin-data.service';
import { IdbService } from './idb.service';
import { CowinDataServiceMock } from '../mocks/data-service-mock';
import { IdbServiceMock } from '../mocks/storage-service-mock';

describe('WatchService', () => {
  let service: WatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: CowinDataService, useClass: CowinDataServiceMock },
        { provide: IdbService, useClass: IdbServiceMock }
      ]
    });
    service = TestBed.inject(WatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
