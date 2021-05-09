import { Component, OnInit } from '@angular/core';
import { MenuOption } from './models/menu-option';
import { ProgressBarConfiguration } from './models/progress-bar-configuration';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'ch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ch-web';
  options: MenuOption[] = [
    // { icon: 'home', label: 'Home', link: '/dashboard'},
    { icon: 'search', label: 'Search', link: '/search'},
    // { icon: 'settings', label: 'Settings', link: '/settings'},
    { icon: 'info', label: 'About', link: '/about'},    
  ];
  progressBarConfiguration: ProgressBarConfiguration;

  constructor(
    private readonly progressBarService: ProgressBarService
  ) {
    this.progressBarConfiguration = {
      show: false,
      color: 'accent', 
      mode: 'indeterminate'
    };
  }

  ngOnInit() {
    this.progressBarService.showProgressBar$
    .subscribe((configuration: ProgressBarConfiguration)=>{
      this.progressBarConfiguration  = { ...configuration } ;            
    });
  }
}
