import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'sh-root-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.scss',
})
export class RootLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
