import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdbService } from './services/idb.service';
import { MenuOption } from './models/menu-option';
import { ProgressBarConfiguration } from './models/progress-bar-configuration';
import { RequestQueue } from './models/request-queue';
import { ProgressBarService } from './services/progress-bar.service';
import { version } from '../../../../package.json';

@Component({
  selector: 'ch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ch-web';
  options: MenuOption[] = [
    { icon: 'home', label: 'Home', link: '/dashboard' },
    { icon: 'search', label: 'Search', link: '/search' },
    { icon: 'settings', label: 'Settings', link: '/settings' },
    { icon: 'info', label: 'About', link: '/about' },
  ];
  progressBarConfiguration: ProgressBarConfiguration;
  activeRequests: Observable<number>;  
  appVersion = version;  

  constructor(
    private readonly progressBarService: ProgressBarService,
    private readonly storageService: IdbService
  ) {
    this.progressBarConfiguration = {
      show: false,
      color: 'accent',
      mode: 'indeterminate'
    };
  }

  ngOnInit() {
    this.progressBarService.showProgressBar$
      .subscribe((configuration: ProgressBarConfiguration) => {
        this.progressBarConfiguration = { ...configuration };
      });
    if(this.getPWADisplayMode() !== "standalone") {
      this.options.splice(2, 1);
    }
  }

  fetchActiveRequests() {
    this.activeRequests = this.storageService.getItem('activeRequests')
      .pipe(map((activeRequests: RequestQueue[]) => activeRequests?.length));
    
  }

  getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if ((<any>navigator).standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }
}
