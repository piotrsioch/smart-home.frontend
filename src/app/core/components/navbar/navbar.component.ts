import { Component, OnInit } from '@angular/core';
import { ThemesSwitcherComponent } from "./themes-switcher/themes-switcher.component";

@Component({
  standalone: true,
  selector: 'sh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [ThemesSwitcherComponent],
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
