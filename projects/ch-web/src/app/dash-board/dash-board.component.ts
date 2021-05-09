import { Component, OnInit } from '@angular/core';
import { IdbService } from '../idb.service';
import { CenterForDay } from '../models/center-for-day';


@Component({
  selector: 'ch-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    private dbService: IdbService
  ) { }

  ngOnInit(): void {
    const center: CenterForDay = {
    address: "GH Athani",
    available_capacity: 40,
    block_name: "Athani",
    center_id: 430225,
    date: "09-05-2021",
    district_name: "Belgaum",
    fee: "0",
    fee_type: "Free",
    from: "09:00:00",
    lat: 16,
    long: 74,
    min_age_limit: 45,
    name: "Athani GH",
    pincode: 591304,
    session_id: "a1bffb16-4e36-48f1-9e58-2043eee92e44",
    slots: ["09:00AM-11:00AM", "11:00AM-01:00PM", "01:00PM-03:00PM", "03:00PM-06:00PM"],
    state_name: "Karnataka",
    to: "18:00:00",
    vaccine: "COVISHIELD"
  };
  // this.dbService.setItem('test', center).subscribe(()=> console.log('done'), err => console.error(err), ()=>console.log('complete'));
  }

}
