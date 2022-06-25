import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { CowinDataService } from '../../services/cowin-data.service';
import { CenterForDay } from '../../models/center-for-day';
import { CenterForWeek } from '../../models/center-for-week';
import { District } from '../../models/district';
import { State } from '../../models/state';

export interface SearchByDistrictData {
  selectedState: State;
  selectedDistrict: District
  date: Date;
  isForWeek: boolean
}

@Component({
  selector: 'ch-use-district',
  templateUrl: './use-district.component.html',
  styleUrls: ['./use-district.component.scss']
})
export class UseDistrictComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dataService: CowinDataService
  ) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    this.minDate = currentDate;
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay + 7);
    this.componentDestroyed$ = new Subject<false>();
  }

  searchForm: UntypedFormGroup = this.formBuilder.group({
    selectedState: ['', [Validators.required]],
    selectedDistrict: ['', [Validators.required]],
    date: ['', [Validators.required]],
    isForWeek: ['']
  });
  minDate: Date;
  maxDate: Date;
  states: State[];
  filteredStates: Observable<State[]>;
  districts: District[];
  filteredDistricts: Observable<District[]>;
  centersForDay: CenterForDay[];
  centersForWeek: CenterForWeek[];
  showNoCenterMessage: boolean = false;
  componentDestroyed$: Subject<boolean>;

  ngOnInit(): void {
    this.searchForm.get('date').setValue(this.minDate);
    this.dataService.getStates()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((states: State[]) => {
        this.states = states;
        this.searchForm.get('selectedState').setValue('');
      });
    this.filteredStates = this.searchForm.get('selectedState').valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.state_name),
      map(value => this._filterStates(value))
    );
    this.filteredDistricts = this.searchForm.get('selectedDistrict').valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.district_name),
      map(value => this._filterDistricts(value))
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states?.filter(option => option.state_name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterDistricts(value: string): District[] {
    const filterValue = value.toLowerCase();
    return this.districts?.filter(option => option.district_name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayStateFn(state: State): string {
    return state && state.state_name ? state.state_name : '';
  }

  displayDistrictFn(district: District): string {
    return district && district.district_name ? district.district_name : '';
  }

  onStateSelectionChange(event) {
    const selectedState: State = event.option.value;
    this.dataService.getDistricts(selectedState.state_id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((districts: District[]) => {
        this.districts = districts;
        this.searchForm.get('selectedDistrict').setValue('');
      });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.showNoCenterMessage = false;
      this.centersForDay = [];
      this.centersForWeek = [];
      const searchData: SearchByDistrictData = this.searchForm.value;
      const dateString: string = `${searchData.date.getDate()}-${searchData.date.getMonth() + 1}-${searchData.date.getFullYear()}`;
      if (searchData.isForWeek) {
        this.dataService.searchAvailabilityByDistrictForWeek(searchData.selectedDistrict.district_id, dateString)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((result: CenterForWeek[]) => {
            this.centersForWeek = result;
            this.showNoCenterMessage = this.centersForWeek?.length > 0 ? false : true;
          });
      } else {
        this.dataService.searchAvailabilityByDistrict(searchData.selectedDistrict.district_id, dateString)
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
