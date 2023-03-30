import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogDataMock } from '../../mocks/dialog-data-mock';
import { DateFromStringPipe } from '../pipes/date-from-string.pipe';

import { WeekCenterDetailsComponent } from './week-center-details.component';

describe('WeekCenterDetailsComponent', () => {
  let component: WeekCenterDetailsComponent;
  let fixture: ComponentFixture<WeekCenterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekCenterDetailsComponent, DateFromStringPipe ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: dialogDataMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
