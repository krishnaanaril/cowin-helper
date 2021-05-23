import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeekCenterDetailsComponent } from './week-center-details/week-center-details.component';
import { WeekCenterInfoComponent } from './week-center-info/week-center-info.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { MaterialModule } from '../material.module';
import { DateFromStringPipe } from './pipes/date-from-string.pipe';


@NgModule({
  declarations: [
    DateFromStringPipe,
    NotFoundComponent,
    WeekCenterDetailsComponent,
    WeekCenterInfoComponent,
    CustomAlertComponent,
  ],
  imports: [
    CommonModule, 
    MaterialModule
  ], 
  exports: [
    DateFromStringPipe,
    NotFoundComponent,
    WeekCenterDetailsComponent,
    WeekCenterInfoComponent,
    CustomAlertComponent,
    MaterialModule
  ]
})
export class SharedModule { }
