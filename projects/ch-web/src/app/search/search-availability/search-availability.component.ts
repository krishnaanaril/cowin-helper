import { Component, OnInit } from '@angular/core';
import { MenuOption } from '../../models/menu-option';

@Component({
  selector: 'ch-search-availability',
  templateUrl: './search-availability.component.html',
  styleUrls: ['./search-availability.component.scss']
})
export class SearchAvailabilityComponent implements OnInit {

  links: MenuOption[] = [
    { icon: '', label: 'By Pin', link: '/search/pin'},
    { icon: '', label: 'By District', link: '/search/district'},
  ];
  activeLink: string = this.links[0].link;

  constructor() { }

  ngOnInit(): void {
  }

}
