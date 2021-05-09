import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchAvailabilityComponent } from './search-availability/search-availability.component';
import { SettingsComponent } from './settings/settings.component';
import { UseDistrictComponent } from './use-district/use-district.component';
import { UsePinComponent } from './use-pin/use-pin.component';

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'search', component: SearchAvailabilityComponent, children: [
      { path: 'pin', component: UsePinComponent },
      { path: 'district', component: UseDistrictComponent },
      { path: '', redirectTo: 'pin', pathMatch: 'full'}
    ]
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
