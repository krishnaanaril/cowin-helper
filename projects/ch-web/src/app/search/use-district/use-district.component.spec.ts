import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { CowinDataServiceMock } from '../../mocks/data-service-mock';
import { CowinDataService } from '../../services/cowin-data.service';

import { UseDistrictComponent } from './use-district.component';

describe('UseDistrictComponent', () => {
  let component: UseDistrictComponent;
  let fixture: ComponentFixture<UseDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseDistrictComponent, MatAutocomplete ],
      providers: [
        UntypedFormBuilder, 
        { provide: CowinDataService, useClass: CowinDataServiceMock}
      ]
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
