import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { alertDataMock } from '../../mocks/alert-data-mock';

import { CustomAlertComponent } from './custom-alert.component';

describe('CustomAlertComponent', () => {
  let component: CustomAlertComponent;
  let fixture: ComponentFixture<CustomAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAlertComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: alertDataMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
