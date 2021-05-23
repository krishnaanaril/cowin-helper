import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { CowinDataService } from './cowin-data.service';
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';
import { IdbService } from './idb.service';
import { CenterForWeek } from './models/center-for-week';
import { WatchInfo, WatchType } from './models/watch-info';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(
    public dialog: MatDialog,
    private dataService: CowinDataService,
    private storageService: IdbService
  ) { }

  getWatches(): Observable<WatchInfo[]> {
    return this.storageService.getItem('activeWatches');
  }

  getWatchById(watchId: string): Observable<WatchInfo> {
    return this.getWatches().pipe(
      map((watches: WatchInfo[]) => watches.find(watch => watch.id === watchId))
    );
  }

  refreshWatch(watchId: string) {
    const currentDate = new Date();
    const dateString: string = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    return this.getWatchById(watchId)
      .pipe(
        switchMap((watchInfo: WatchInfo) => {
          if (watchInfo.type === WatchType.Pin) {
            return this.dataService.searchAvailabilityByPinForWeek(watchInfo.pin, dateString)
              .pipe(map((centers: CenterForWeek[]) =>
                ({ centers: centers, watchInfo: watchInfo })
              ));
          } else {
            return this.dataService.searchAvailabilityByDistrictForWeek(watchInfo.districtId, dateString)
              .pipe(map((centers: CenterForWeek[]) =>
                ({ centers: centers, watchInfo: watchInfo })
              ));
          }
        }),
        switchMap((value: { centers: CenterForWeek[], watchInfo: WatchInfo }) => {          
          value.watchInfo = this.updateDeltaValues(value.centers, value.watchInfo);
          return this.editWatch(value.watchInfo, value.centers);
        })
      );
  }

  updateDeltaValues(centers: CenterForWeek[], watchInfo: WatchInfo): WatchInfo {
    const previousTotalCenters = watchInfo?.totalCenters ?? 0;
    const previousTotalJabs = watchInfo?.totalJabs ?? 0;
    watchInfo.totalCenters = centers.length;
    watchInfo.totalJabs = centers.reduce((prev01, center) => prev01 + center.sessions.reduce((prev02, session) => prev02 + session.available_capacity, 0), 0);
    watchInfo.lastUpdated = new Date();
    watchInfo.deltaCenters = watchInfo.totalCenters - previousTotalCenters;
    watchInfo.deltaJabs = watchInfo.totalJabs - previousTotalJabs;
    return watchInfo;
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
          if (activeWatches == null) {
            activeWatches = [];
          }
          if (activeWatches?.length < 5) {
            activeWatches.push(newWatch);
            return forkJoin({
              watchList: this.storageService.updateItem('activeWatches', activeWatches),
              newWatch: this.storageService.setItem(newWatch.id, centers)
            });
          } else {
            return this.dialog.open(CustomAlertComponent, {
              data: {
                title: 'Maximum limit reached',
                body: 'You can only create a maximum of 5 watches.'
              }
            }).afterClosed();    
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
