import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private dbService: IdbService
  ) { }

  activeWatches$: Observable<WatchInfo[]>;

  ngOnInit(): void {
    this.activeWatches$ = this.watchService.getWatches();
  }

  addWatch() {
    this.dialog.open(AddWatcherComponent, {
      panelClass: 'w-80',
      disableClose: true
    }).afterClosed()
      .subscribe(()=>{
        this.activeWatches$ = this.watchService.getWatches();
      });
  }

}
