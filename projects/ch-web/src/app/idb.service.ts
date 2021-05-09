import { Injectable } from '@angular/core';
import { set, get, update } from 'idb-keyval';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { }

  setItem(key: string, val: any) {
    return from(set(key, val));
  }

  updateItem(key: string, val: any) {
    return from(update(key, (oldValue) => val));
  }
}
