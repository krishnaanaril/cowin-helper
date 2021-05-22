import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddWatcherComponent } from '../add-watcher/add-watcher.component';
import { IdbService } from '../idb.service';
import { CenterForDay } from '../models/center-for-day';
import { WatchInfo } from '../models/watch-info';
import { WatchService } from '../watch.service';


@Component({
  selector: 'ch-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private watchService: WatchService,
    private dbService: IdbService,
    private snackBar: MatSnackBar
  ) { }

  activeWatches$: Observable<WatchInfo[]>;
  public localMath = Math;

  ngOnInit(): void {
    this.activeWatches$ = this.watchService.getWatches();
  }

  trackByWatchId(index: number, item: WatchInfo) {
    return item.id;
  }

  addWatch() {
    this.dialog.open(AddWatcherComponent, {
      panelClass: 'w-80',
      disableClose: true
    }).afterClosed()
      .subscribe(() => {
        this.activeWatches$ = this.watchService.getWatches();
      });
  }

  refreshWatch(watchId: string) {
    this.watchService.refreshWatch(watchId)
      .subscribe(() => {
        this.activeWatches$ = this.watchService.getWatches();
      });
  }

  deleteWatch(watchId: string) {
    this.watchService.deleteWatch(watchId)
      .subscribe(() => {
        this.activeWatches$ = this.watchService.getWatches();
        this.snackBar.open("Watch deleted successfully", '', {
          duration: 2000
        });
      })
  }
}
