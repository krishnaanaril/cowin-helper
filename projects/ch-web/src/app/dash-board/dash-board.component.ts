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
  message: string = '';

  ngOnInit(): void {
    this.activeWatches$ = this.watchService.getWatches();
  }

  syncContent() {
    this.message += '\n in sync content';
    console.log('in sync content');
  }

  notifyTest() {
    navigator.serviceWorker.addEventListener('periodicsync', (event: any) => {
      if (event.tag === 'content-sync') {
        // See the "Think before you sync" section for
        // checks you could perform before syncing.
        event.waitUntil(this.syncContent());
      }
      // Other logic for different tags as needed.
    });
    navigator.permissions.query({
      name: <any>'periodic-background-sync',
    }).then((status)=>{
      if (status.state === 'granted') {
        // Periodic background sync can be used.
        console.log('periodic-background-sync permission granted');
        this.message += '\n periodic-background-sync permission granted';
        Notification.requestPermission().then((permission) => {
          console.log(permission);
          if (Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration().then((reg: any) => {
              console.log(reg);     
              if ('periodicSync' in reg) {
                try {
                  reg.periodicSync.register('content-sync', {
                    // An interval of 1 mins.
                    minInterval: 1 * 60 * 1000,
                  }); 
                } catch (error) {
                  this.message += '\n content-sync register error';
                  console.log('content-sync register error');
                  console.error(error)
                }  
                console.log('content-sync registerd');
              }            
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
      } else {
        // Periodic background sync cannot be used.
        this.message += '\n not granted periodic sync';
        console.error('not granted periodic sync')
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
