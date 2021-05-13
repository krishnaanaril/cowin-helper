import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IdbService } from './idb.service';
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

  addWatch(newWatch: WatchInfo) {
    return this.getWatches()
      .pipe(
        switchMap((activeWatches: WatchInfo[]) => {
          if (activeWatches.length < 5) {
            activeWatches.push(newWatch);
            return forkJoin({
              watchList: this.storageService.updateItem('activeWatches', activeWatches),
              newWatch: this.storageService.setItem(newWatch.id, newWatch)
            });
          } else {
            return EMPTY;
          }
        }));
  }

  editWatch(updatedWatch: WatchInfo) {
    return this.getWatches()
      .pipe(
        switchMap((activeWatches: WatchInfo[]) => {
          const matchingIndex = activeWatches.findIndex((watch) => watch.id === updatedWatch.id);
          activeWatches[matchingIndex] = updatedWatch;
          return forkJoin({
            watchList: this.storageService.updateItem('activeWatches', activeWatches),
            updatedWatch: this.storageService.updateItem(updatedWatch.id, updatedWatch)
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
