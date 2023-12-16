import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'sh-root-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss'],
})
export class RootLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
