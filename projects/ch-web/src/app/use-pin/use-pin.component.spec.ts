import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePinComponent } from './use-pin.component';

describe('UsePinComponent', () => {
  let component: UsePinComponent;
  let fixture: ComponentFixture<UsePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
