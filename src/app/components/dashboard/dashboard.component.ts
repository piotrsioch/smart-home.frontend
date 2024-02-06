import { Component } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { MatIconModule } from "@angular/material/icon";

interface Card {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'sh-dashboard',
  standalone: true,
  imports: [CardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly cards: Card[] = [
    {
      name: 'Security',
      icon: 'lock',
      path: 'dashboard/security'
    },
    {
      name: 'Lighting system',
      icon: 'lightbulb',
      path: 'dashboard/lighting',
    },
    {
      name: 'Climate',
      icon: 'thermostat',
      path: 'dashboard/climate'
    },
    {
      name: 'Energy usage',
      icon: 'bolt',
      path: 'dashboard/energy'
    },
    {
      name: 'Remote control',
      icon: 'remote_gen',
      path: 'dashboard/remote-control'
    },
    {
      name: 'Rooms',
      icon: 'sensor_door',
      path: 'dashboard/rooms',
    }
  ]
}
