import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCenterDetailsComponent } from './week-center-details.component';

describe('WeekCenterDetailsComponent', () => {
  let component: WeekCenterDetailsComponent;
  let fixture: ComponentFixture<WeekCenterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekCenterDetailsComponent ]
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
