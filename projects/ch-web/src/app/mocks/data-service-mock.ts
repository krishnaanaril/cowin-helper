import { Observable, of } from "rxjs";
import { CenterForDay } from "../models/center-for-day";
import { CenterForWeek } from "../models/center-for-week";
import { District } from "../models/district";
import { State } from "../models/state";

export class CowinDataServiceMock 
{
    getStates(): Observable<State[]> {
        return of();
    }

    getDistricts(stateId: number): Observable<District[]> {
        return of();
    }

    searchAvailabilityByPin(pin: string, date: string): Observable<CenterForDay[]> {
        return of();
    }

    searchAvailabilityByDistrict(districtId: number, date: string): Observable<CenterForDay[]> {
        return of();
    }

    searchAvailabilityByPinForWeek(pin: string, date: string): Observable<CenterForWeek[]> {
        return of();
    }

    searchAvailabilityByDistrictForWeek(districtId: number, date: string): Observable<CenterForWeek[]> {
        return of();
    }
}