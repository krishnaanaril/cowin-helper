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

  // center: CenterForWeek = {
  //   center_id: 246643,
  //   name: "Bylanarasapura PHC",
  //   address: "Bylanarasapura Main Road Hosakote TalukBangalore Rural",
  //   state_name: "Karnataka",
  //   district_name: "Bangalore Rural",
  //   block_name: "Hosakote",
  //   pincode: 562122,
  //   lat: 13,
  //   long: 77,
  //   from: "09:00:00",
  //   to: "16:30:00",
  //   fee_type: "Free",
  //   sessions: [
  //     {
  //       session_id: "2a7615e9-6b67-4191-9f88-10630244e6b6",
  //       date: "11-05-2021",
  //       available_capacity: 0,
  //       min_age_limit: 45,
  //       vaccine: "COVISHIELD",
  //       slots: [
  //         "09:00AM-10:00AM",
  //         "10:00AM-11:00AM",
  //         "11:00AM-12:00PM",
  //         "12:00PM-04:30PM"]
  //     }, {
  //       session_id: "ffa814ea-f32e-4ed9-b13e-c0323054002e",
  //       date: "12-05-2021",
  //       available_capacity: 0,
  //       min_age_limit: 45,
  //       vaccine: "COVISHIELD",
  //       slots: [
  //         "09:00AM-10:00AM",
  //         "10:00AM-11:00AM",
  //         "11:00AM-12:00PM",
  //         "12:00PM-04:30PM"]
  //     }, {
  //       session_id: "73b63a09-ea7e-4d17-a652-60363edeaba6",
  //       date: "13-05-2021",
  //       available_capacity: 0,
  //       min_age_limit: 45,
  //       vaccine: "COVISHIELD",
  //       slots: [
  //         "09:00AM-10:00AM",
  //         "10:00AM-11:00AM",
  //         "11:00AM-12:00PM",
  //         "12:00PM-04:30PM"]
  //     }, {
  //       session_id: "b4d8b66c-fae9-454d-912c-942a58ae1f86",
  //       date: "14-05-2021",
  //       available_capacity: 0,
  //       min_age_limit: 45,
  //       vaccine: "COVISHIELD",
  //       slots: [
  //         "09:00AM-10:00AM",
  //         "10:00AM-11:00AM",
  //         "11:00AM-12:00PM",
  //         "12:00PM-04:30PM"]
  //     }]
  // };

  constructor() { }

  ngOnInit(): void {
  }

}
