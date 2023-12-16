import { Component } from '@angular/core';

interface Link {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'sh-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public routerLinks: Link[] = [
    {
      name: 'dashboard',
      path: '',
      icon: 'dashboard'
    },
    {
      name: 'notifications',
      path: '',
      icon: 'notifications'
    },
    {
      name: 'settings',
      path: '',
      icon: 'settings'
    }
  ]
}
