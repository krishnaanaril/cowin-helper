import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { CowinDataService } from '../cowin-data.service';
import { District } from '../models/district';
import { State } from '../models/state';

@Component({
  selector: 'ch-add-watcher',
  templateUrl: './add-watcher.component.html',
  styleUrls: ['./add-watcher.component.scss']
})
export class AddWatcherComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: CowinDataService
  ) { 
    this.componentDestroyed$ = new Subject<false>();
  }

  watchForm: FormGroup = this.formBuilder.group({
    watchByDistrictForm: this.formBuilder.group({
      selectedState: ['', [Validators.required]],
      selectedDistrict: ['', [Validators.required]]    
    }),
    watchByPinForm: this.formBuilder.group({
      pin: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]]    
    })
  })
  states: State[];
  filteredStates: Observable<State[]>;
  districts: District[];
  filteredDistricts: Observable<District[]>;
  componentDestroyed$: Subject<boolean>;

  ngOnInit(): void {  
    this.watchForm.get('watchByDistrictForm').disable();  
    this.dataService.getStates()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((states: State[]) => {
        this.states = states;
        this.watchForm.get('watchByDistrictForm.selectedState').setValue('');
      });
    this.filteredStates = this.watchForm.get('watchByDistrictForm.selectedState').valueChanges.pipe(      
      map(value => typeof value === 'string' ? value : value.state_name),
      map(value => this._filterStates(value))
    );
    this.filteredDistricts = this.watchForm.get('watchByDistrictForm.selectedDistrict').valueChanges.pipe(      
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
        this.watchForm.get('watchByDistrictForm.selectedDistrict').setValue('');
      });
  }

  tabChange(event) {
    if(event.index === 1) {
      this.watchForm.get('watchByPinForm').disable();  
      this.watchForm.get('watchByDistrictForm').enable();  
    } else {
      this.watchForm.get('watchByPinForm').enable();  
      this.watchForm.get('watchByDistrictForm').disable();  
    }
  }

  onSubmit() {
    if(this.watchForm.valid) {
      console.log('valid');
    } else {
      console.log('not valid');
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }
}
