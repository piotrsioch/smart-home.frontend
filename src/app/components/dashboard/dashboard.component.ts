import { Component } from '@angular/core';
import { ApiService } from "../../core/api/services/api.service";
import { CardComponent } from "./card/card.component";

interface Card {
  name: string;
  icon: string;
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
    },
    {
      name: 'Lightning system',
      icon: 'lightbulb',
    },
    {
      name: 'Climate',
      icon: 'thermostat',
    },
    {
      name: 'Energy usage',
      icon: 'bolt',
    },
    {
      name: 'Remote control',
      icon: 'remote_gen',
    },
    {
      name: 'Rooms',
      icon: 'sensor_door'
    }
  ]

  constructor(private readonly apiService: ApiService) {
  }
}
