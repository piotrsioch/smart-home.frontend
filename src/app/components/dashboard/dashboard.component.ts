import { Component } from '@angular/core';
import { ApiService } from "../../core/api/services/api.service";
import { CardComponent } from "./card/card.component";

interface Card {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'sh-dashboard',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly cards: Card[] = [
    {
      name: 'Security',
      icon: 'lock',
      path: '/security'
    },
    {
      name: 'Lightning system',
      icon: 'lightbulb',
      path: '/lightning',
    },
    {
      name: 'Climate',
      icon: 'thermostat',
      path: '/climate'
    },
    {
      name: 'Energy usage',
      icon: 'bolt',
      path: '/energy'
    },
    {
      name: 'Remote control',
      icon: 'remote_gen',
      path: '/remote-control'
    },
    {
      name: 'Rooms',
      icon: 'sensor_door',
      path: '/rooms',
    }
  ]

  constructor(private readonly apiService: ApiService) {
  }
}
