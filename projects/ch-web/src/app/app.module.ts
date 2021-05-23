import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddWatcherComponent } from './add-watcher/add-watcher.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpProgressInterceptor } from './http-progress.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';
import { DateFromStringPipe } from './date-from-string.pipe';
import { RequestLimiterInterceptor } from './request-limiter.interceptor';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    AddWatcherComponent,
    AboutComponent,
    SettingsComponent,    
    DateFromStringPipe,  
    WatchDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('chweb-service-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), 
    SharedModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: RequestLimiterInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProgressInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
