import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

interface Link {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'sh-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public routerLinks: Link[] = [
    {
      name: 'dashboard',
      path: '/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'notifications',
      path: '/notifications',
      icon: 'notifications'
    },
    {
      name: 'settings',
      path: '/settings',
      icon: 'settings'
    }
  ]
}
