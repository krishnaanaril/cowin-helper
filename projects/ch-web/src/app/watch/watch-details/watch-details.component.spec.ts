import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing';

import { WatchDetailsComponent } from './watch-details.component';
import { WatchService } from '../../services/watch.service';
import { WatchServiceMock } from '../../mocks/watch-service-mock';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { from, of } from 'rxjs';

describe('WatchDetailsComponent', () => {
  let component: WatchDetailsComponent;
  let fixture: ComponentFixture<WatchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchDetailsComponent],
      providers: [
        { provide: Location, useClass: SpyLocation },
        { provide: WatchService, useClass: WatchServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              id: '1'
            }))
          },
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
