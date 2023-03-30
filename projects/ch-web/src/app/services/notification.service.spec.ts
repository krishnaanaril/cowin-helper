import { TestBed } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';
import { MatDialogMock } from '../mocks/mat-dialog-mock';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: SwUpdate, useValue: { versionUpdates: of(), unrecoverable: of()}}
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
