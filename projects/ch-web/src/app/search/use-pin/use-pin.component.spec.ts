import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { CowinDataServiceMock } from '../../mocks/data-service-mock';
import { CowinDataService } from '../../services/cowin-data.service';

import { UsePinComponent } from './use-pin.component';

describe('UsePinComponent', () => {
  let component: UsePinComponent;
  let fixture: ComponentFixture<UsePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsePinComponent ], 
      providers: [
        UntypedFormBuilder,
        { provide: CowinDataService, useClass: CowinDataServiceMock}
      ]
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
