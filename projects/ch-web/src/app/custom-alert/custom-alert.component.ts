import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertData } from '../models/alert-data';

@Component({
  selector: 'ch-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertData
  ) { }

  ngOnInit(): void {
  }

}
