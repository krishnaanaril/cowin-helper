import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'ch-week-center-details',
  templateUrl: './week-center-details.component.html',
  styleUrls: ['./week-center-details.component.scss']
})
export class WeekCenterDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public session: DialogData) { }

  ngOnInit(): void {
  }

}
