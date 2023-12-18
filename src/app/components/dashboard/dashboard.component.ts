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
      icon: '',
    },
    {
      name: 'Lightning system',
      icon: '',
    },
    {
      name: 'Climate',
      icon: '',
    },
    {
      name: 'Energy usage',
      icon: '',
    },
    {
      name: 'Remote control',
      icon: '',
    }
  ]

  constructor(private readonly apiService: ApiService) {
  }
}
