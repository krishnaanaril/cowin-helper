import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.httpClient.get<State[]>(url, { reportProgress: true }).pipe(
      map((result: any) => result.states));
  }

  getDistricts(stateId: number): Observable<District[]> {
    const url = `${environment.cowin_endpoints.metaData}/districts/${stateId}`;
    return this.httpClient.get<District[]>(url, { reportProgress: true }).pipe(
      map((result: any) => result.districts));
  }

  searchAvailabilityByPin(pin: string, date: string): Observable<CenterForDay[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/findByPin?pincode=${pin}&date=${date}`;
    return this.httpClient.get<CenterForDay[]>(url, { reportProgress: true }).pipe(
      map((result: any) => this.filterOutBookedCentersInDay(result.sessions)));
  }

  searchAvailabilityByDistrict(districtId: number, date: string): Observable<CenterForDay[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/findByDistrict?district_id=${districtId}&date=${date}`;
    return this.httpClient.get<CenterForDay[]>(url, { reportProgress: true }).pipe(
      map((result: any) => this.filterOutBookedCentersInDay(result.sessions)));
  }

  searchAvailabilityByPinForWeek(pin: string, date: string): Observable<CenterForWeek[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/calendarByPin?pincode=${pin}&date=${date}`;
    return this.httpClient.get<CenterForWeek[]>(url, { reportProgress: true }).pipe(
      map((result: any) => this.filterOutBookedCentersInWeek(result.centers)));
  }

  searchAvailabilityByDistrictForWeek(districtId: number, date: string): Observable<CenterForWeek[]> {
    const url = `${environment.cowin_endpoints.appointment_availability}/calendarByDistrict?district_id=${districtId}&date=${date}`;
    return this.httpClient.get<CenterForWeek[]>(url, { reportProgress: true }).pipe(
      map((result: any) => this.filterOutBookedCentersInWeek(result.centers)));
  }

  private filterOutBookedCentersInWeek(centers: CenterForWeek[]) : CenterForWeek[] {
    return centers.filter((center)=>{
      center.sessions = center.sessions.filter(session => session.available_capacity > 0);
      return center.sessions?.length > 0;
    });
  }

  private filterOutBookedCentersInDay(centers: CenterForDay[]) : CenterForDay[] {
    return centers.filter((center)=>{      
      return center.available_capacity > 0;
    });
  }
}
