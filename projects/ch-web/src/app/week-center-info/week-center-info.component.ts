import { Component, Input, OnInit } from '@angular/core';
import { CenterForWeek } from '../models/center-for-week';

@Component({
  selector: 'ch-week-center-info',
  templateUrl: './week-center-info.component.html',
  styleUrls: ['./week-center-info.component.scss']
})
export class WeekCenterInfoComponent implements OnInit {

  @Input()
  center: CenterForWeek;

  constructor() { }

  ngOnInit(): void {
  }

}
