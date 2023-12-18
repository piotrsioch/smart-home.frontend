import { Component, OnInit } from '@angular/core';
import { ThemesSwitcherComponent } from "./themes-switcher/themes-switcher.component";

@Component({
  selector: 'sh-navbar',
  standalone: true,
  imports: [ThemesSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
