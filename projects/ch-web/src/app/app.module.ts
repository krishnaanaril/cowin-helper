import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UsePinComponent } from './use-pin/use-pin.component';
import { UseDistrictComponent } from './use-district/use-district.component';
import { AddWatcherComponent } from './add-watcher/add-watcher.component';
import { SearchAvailabilityComponent } from './search-availability/search-availability.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashBoardComponent,
    UsePinComponent,
    UseDistrictComponent,
    AddWatcherComponent,
    SearchAvailabilityComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
