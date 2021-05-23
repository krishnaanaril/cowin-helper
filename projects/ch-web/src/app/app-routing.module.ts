import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'watch-details/:id', component: WatchDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
