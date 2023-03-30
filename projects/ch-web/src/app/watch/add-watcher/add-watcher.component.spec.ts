import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatLegacyAutocomplete as MatAutocomplete } from '@angular/material/legacy-autocomplete';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CowinDataServiceMock } from '../../mocks/data-service-mock';
import { WatchServiceMock } from '../../mocks/watch-service-mock';
import { CowinDataService } from '../../services/cowin-data.service';
import { WatchService } from '../../services/watch.service';

import { AddWatcherComponent } from './add-watcher.component';

describe('AddWatcherComponent', () => {
  let component: AddWatcherComponent;
  let fixture: ComponentFixture<AddWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWatcherComponent, MatAutocomplete ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: CowinDataService, useClass: CowinDataServiceMock },
        { provide: WatchService, useClass: WatchServiceMock },
        UntypedFormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
