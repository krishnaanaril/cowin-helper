import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CenterForDay } from './models/center-for-day';
import { CenterForWeek } from './models/center-for-week';
import { District } from './models/district';
import { State } from './models/state';

@Injectable({
  providedIn: 'root'
})
export class CowinDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getStates(): Observable<State[]> {
    const url = `${environment.cowin_endpoints.metaData}/states`;
    return this.httpClient.get<State[]>(url);
  }

  getDistricts(stateId: number): Observable<District[]> {
    const url = `${environment.cowin_endpoints.metaData}/districts/${stateId}`;
    return this.httpClient.get<District[]>(url);
  }

  searchAvailabilityByPin(pin: string, date: string): Observable<CenterForDay[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/findByPin?pincode=${pin}&date=${date}`;
    return this.httpClient.get<CenterForDay[]>(url);
  }

  searchAvailabilityByDistrict(districtId: number, date: string): Observable<CenterForDay[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/findByDistrict?district_id=${districtId}&date=${date}`;
    return this.httpClient.get<CenterForDay[]>(url);
  }

  searchAvailabilityByPinForWeek(pin: string, date: string): Observable<CenterForWeek[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/calendarByPin?pincode=${pin}&date=${date}`;
    return this.httpClient.get<CenterForWeek[]>(url);
  }

  searchAvailabilityByDistrictForWeek(districtId: number, date: string): Observable<CenterForWeek[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/calendarByDistrict?district_id=${districtId}&date=${date}`;
    return this.httpClient.get<CenterForWeek[]>(url);
  }
}
