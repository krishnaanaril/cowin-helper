import { ComponentFixture, TestBed } from '@angular/core/testing';
import { centerForDayMock } from '../../mocks/center-mock';

import { DayCenterInfoComponent } from './day-center-info.component';

describe('DayCenterInfoComponent', () => {
  let component: DayCenterInfoComponent;
  let fixture: ComponentFixture<DayCenterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayCenterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCenterInfoComponent);
    component = fixture.componentInstance;
    component.center = centerForDayMock;
    fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
});
