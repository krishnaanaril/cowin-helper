import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseDistrictComponent } from './use-district.component';

describe('UseDistrictComponent', () => {
  let component: UseDistrictComponent;
  let fixture: ComponentFixture<UseDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
