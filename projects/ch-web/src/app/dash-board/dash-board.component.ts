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

  notifyTest() {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then((reg) => {
          console.log(reg);
          reg.showNotification("Cowin Helper", {
            body: 'This is a sample message',
            icon: 'assets/icons/icon-96x96.png',
            data: {
              url: 'http://localhost:8080/dashboard'
            }
          });
        })
      }
    });
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
