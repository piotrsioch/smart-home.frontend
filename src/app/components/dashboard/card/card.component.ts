import { Component, Input } from '@angular/core';

@Component({
  selector: 'sh-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) icon: string = '';
}
