import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CowinDataService } from 'projects/ch-web/src/app/cowin-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CenterForDay } from '../models/center-for-day';
import { CenterForWeek } from '../models/center-for-week';

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
    this.componentDestroyed$ = new Subject<false>();
  }

  searchForm: FormGroup = this.formBuilder.group({
    pin: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
    date: ['', [Validators.required]],
    isForWeek: ['']
  });
  minDate: Date;
  maxDate: Date;
  centersForDay: CenterForDay[];
  centersForWeek: CenterForWeek[];
  showNoCenterMessage: boolean = false;
  componentDestroyed$: Subject<boolean>;

  ngOnInit(): void {
    this.searchForm.get('date').setValue(this.minDate);
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.showNoCenterMessage = false;
      this.centersForDay = [];
      this.centersForWeek = [];
      const searchData: SearchByPinData = this.searchForm.value;
      const dateString: string = `${searchData.date.getDate()}-${searchData.date.getMonth() + 1}-${searchData.date.getFullYear()}`;
      if (searchData.isForWeek) {
        this.dataService.searchAvailabilityByPinForWeek(searchData.pin, dateString)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((result: CenterForWeek[]) => {
            this.centersForWeek = result;
            this.showNoCenterMessage = this.centersForWeek?.length > 0 ? false : true;
          });
      } else {
        this.dataService.searchAvailabilityByPin(searchData.pin, dateString)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((result: CenterForDay[]) => {
            this.centersForDay = result;
            this.showNoCenterMessage = this.centersForDay?.length > 0 ? false : true;
          });
      }
    }
  }

  trackByCenterId(index: number, item: CenterForDay|CenterForWeek) {
    return item.center_id;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

}
