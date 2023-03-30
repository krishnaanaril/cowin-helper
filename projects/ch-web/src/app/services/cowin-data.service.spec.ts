import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { CowinDataService } from './cowin-data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { districtsMock, mock404ErrorResponse, searchForDayMock, searchForWeekMock, statesMock } from '../mocks/cowin-data-mock';
import { of, throwError } from 'rxjs';
import { centerForDayMock } from '../mocks/center-mock';

describe('CowinDataService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: CowinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CowinDataService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return states array (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(statesMock));
    service.getStates().subscribe({
      next: states => {
        expect(states)
          .withContext('expected states')
          .toEqual(statesMock.states);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(throwError(() => mock404ErrorResponse));
    service.getStates().subscribe({
      next: states => done.fail('expected 404 error, not states'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toContain('test 404 error');
        done();
      }        
    })
  });

  it('should return districts array (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(districtsMock));
    service.getDistricts(1).subscribe({
      next: districts => {
        expect(districts)
          .withContext('expected districts')
          .toEqual(districtsMock.districts);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return centerForDayMock array on searchAvailabilityByPin (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(searchForDayMock));
    service.searchAvailabilityByPin('pin', 'date').subscribe({
      next: centers => {
        expect(centers[0].center_id)
          .withContext('expected centers by pin')
          .toEqual(578076);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return centerForDayMock array on searchAvailabilityByDistrict (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(searchForDayMock));
    service.searchAvailabilityByDistrict(1, '').subscribe({
      next: centers => {
        expect(centers[0].center_id)
          .withContext('expected centers by district')
          .toEqual(578076);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });


  it('should return centerForDayMock array on searchAvailabilityByPinForWeek (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(searchForWeekMock));
    service.searchAvailabilityByPinForWeek('pin', 'date').subscribe({
      next: centers => {
        expect(centers[0].center_id)
          .withContext('expected centers by pin')
          .toEqual(578076);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return centerForDayMock array on searchAvailabilityByDistrictForWeek (called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(searchForWeekMock));
    service.searchAvailabilityByDistrictForWeek(1, '').subscribe({
      next: centers => {
        expect(centers[0].center_id)
          .withContext('expected centers by district')
          .toEqual(578076);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

});
