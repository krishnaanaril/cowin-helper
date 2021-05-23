import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CenterForWeek } from '../../models/center-for-week';
import { Session } from '../../models/session';
import { WeekCenterDetailsComponent } from '../week-center-details/week-center-details.component';

@Component({
  selector: 'ch-week-center-info',
  templateUrl: './week-center-info.component.html',
  styleUrls: ['./week-center-info.component.scss']
})
export class WeekCenterInfoComponent implements OnInit {

  @Input()
  center: CenterForWeek;  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewCenterDetails(session: Session) {
    this.dialog.open(WeekCenterDetailsComponent, {
      data: {
        ...session,
        fee_type: this.center.fee_type
      }
    });
  }
}