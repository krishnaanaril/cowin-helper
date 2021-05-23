import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWatcherComponent } from './add-watcher/add-watcher.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: DashBoardComponent},
  { path: 'watch-details/:id', component: WatchDetailsComponent },
];

@NgModule({
  declarations: [
    AddWatcherComponent,
    DashBoardComponent,
    WatchDetailsComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class WatchModule { }
