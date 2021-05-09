import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CowinDataService } from 'projects/ch-web/src/app/cowin-data.service';

export interface SearchByPinData {
  pin: string;
  date: Date;
  isForWeek: boolean
}

@Component({
  selector: 'ch-use-pin',
  templateUrl: './use-pin.component.html',
  styleUrls: ['./use-pin.component.scss']
})
export class UsePinComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CowinDataService
  ) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    this.minDate = currentDate;
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay + 7);
  }

  searchForm: FormGroup = this.formBuilder.group({
    pin: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
    date: ['', [Validators.required]],
    isForWeek: ['']
  });
  minDate: Date;
  maxDate: Date;

  ngOnInit(): void {
    this.searchForm.get('date').setValue(this.minDate);
  }

  onSubmit() {
    const searchData: SearchByPinData = this.searchForm.value;
    const dateString: string = `${searchData.date.getDate()}-${searchData.date.getMonth() + 1}-${searchData.date.getFullYear()}`;
    if (searchData.isForWeek) {
      this.dataService.searchAvailabilityByPinForWeek(searchData.pin, dateString).subscribe((res) => console.log(res));
    } else {
      this.dataService.searchAvailabilityByPin(searchData.pin, dateString).subscribe((res) => console.log(res));
    }
  }

}
