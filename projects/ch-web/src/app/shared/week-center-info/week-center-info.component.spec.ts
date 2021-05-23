import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCenterInfoComponent } from './week-center-info.component';

describe('WeekCenterInfoComponent', () => {
  let component: WeekCenterInfoComponent;
  let fixture: ComponentFixture<WeekCenterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekCenterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCenterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
