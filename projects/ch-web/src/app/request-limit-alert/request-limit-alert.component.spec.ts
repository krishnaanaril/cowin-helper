import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLimitAlertComponent } from './request-limit-alert.component';

describe('RequestLimitAlertComponent', () => {
  let component: RequestLimitAlertComponent;
  let fixture: ComponentFixture<RequestLimitAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLimitAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLimitAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
