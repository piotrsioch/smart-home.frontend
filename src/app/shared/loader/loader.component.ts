import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'sh-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input({required: true}) loading: boolean = false;
}
