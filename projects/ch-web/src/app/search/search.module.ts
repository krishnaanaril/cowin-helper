import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsePinComponent } from './use-pin/use-pin.component';
import { UseDistrictComponent } from './use-district/use-district.component';
import { SearchAvailabilityComponent } from './search-availability/search-availability.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DayCenterInfoComponent } from './day-center-info/day-center-info.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '', component: SearchAvailabilityComponent, children: [
      { path: 'pin', component: UsePinComponent },
      { path: 'district', component: UseDistrictComponent },
      { path: '', redirectTo: 'pin', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [    
    DayCenterInfoComponent,
    SearchAvailabilityComponent,
    UseDistrictComponent,
    UsePinComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SearchModule { }
