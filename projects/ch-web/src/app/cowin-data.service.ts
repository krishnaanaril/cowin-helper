import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
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
}
