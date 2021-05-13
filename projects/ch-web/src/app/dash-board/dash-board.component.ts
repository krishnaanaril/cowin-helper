import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWatcherComponent } from '../add-watcher/add-watcher.component';
import { IdbService } from '../idb.service';
import { CenterForDay } from '../models/center-for-day';


@Component({
  selector: 'ch-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dbService: IdbService
  ) { }

  ngOnInit(): void {
  }

  addWatch() {
    this.dialog.open(AddWatcherComponent, {
      panelClass: 'w-80',
      disableClose: true
    });
  }

}
