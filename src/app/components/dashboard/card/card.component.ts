import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

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
  @Input({ required: true }) path: string = '';

  constructor(private readonly router: Router) {
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
