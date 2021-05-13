import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IdbService } from './idb.service';
import { CenterForWeek } from './models/center-for-week';
import { WatchInfo } from './models/watch-info';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(
    private storageService: IdbService
  ) { }

  getWatches(): Observable<WatchInfo[]> {
    return this.storageService.getItem('activeWatches');
  }

  getWatchDetails(watchId: string) {
    return this.storageService.getItem(watchId);
  }

  /**
   * Add watch to the indexed db
   * @param newWatch 
   * @param centers
   * @returns 
   */
  addWatch(newWatch: WatchInfo, centers: CenterForWeek[]) {
    return this.getWatches()
      .pipe(
        switchMap((activeWatches: WatchInfo[]) => {
          if(activeWatches == null) {
            activeWatches = [];
          }
          if (activeWatches?.length < 5) {
            activeWatches.push(newWatch);
            return forkJoin({
              watchList: this.storageService.updateItem('activeWatches', activeWatches),
              newWatch: this.storageService.setItem(newWatch.id, centers)
            });
          } else {
            return EMPTY;
          }
        }));
  }

  editWatch(updatedWatch: WatchInfo, centers: CenterForWeek[]) {
    return this.getWatches()
      .pipe(
        switchMap((activeWatches: WatchInfo[]) => {
          const matchingIndex = activeWatches?.findIndex((watch) => watch.id === updatedWatch.id);
          activeWatches[matchingIndex] = updatedWatch;
          return forkJoin({
            watchList: this.storageService.updateItem('activeWatches', activeWatches),
            updatedWatch: this.storageService.updateItem(updatedWatch.id, centers)
          });
        }));
  }

  deleteWatch(watchId: string) {
    return this.getWatches()
      .pipe(
        switchMap((activeWatches: WatchInfo[]) => {
          const matchingIndex = activeWatches.findIndex((watch) => watch.id === watchId);
          activeWatches.splice(matchingIndex, 1);
          return forkJoin({
            watchList: this.storageService.updateItem('activeWatches', activeWatches),
            deletedWatch: this.storageService.deleteItem(watchId)
          });
        }));
  }
}
