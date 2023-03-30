import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { centerForWeekMock } from '../../mocks/center-mock';
import { MatDialogMock } from '../../mocks/mat-dialog-mock';

import { WeekCenterInfoComponent } from './week-center-info.component';

describe('WeekCenterInfoComponent', () => {
  let component: WeekCenterInfoComponent;
  let fixture: ComponentFixture<WeekCenterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekCenterInfoComponent ], 
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCenterInfoComponent);
    component = fixture.componentInstance;
    component.center = centerForWeekMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
