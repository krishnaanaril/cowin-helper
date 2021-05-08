import { Component } from '@angular/core';
import { MenuOption } from './models/menu-option';

@Component({
  selector: 'ch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ch-web';
  options: MenuOption[] = [
    { icon: 'home', label: 'Home', link: '/dashboard'},
    { icon: 'search', label: 'Search', link: '/search'},
    { icon: 'info', label: 'About', link: '/about'},
    { icon: 'share', label: 'Share', link: ''},
  ]
}
