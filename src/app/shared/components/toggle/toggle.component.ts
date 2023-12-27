import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'sh-toggle',
  standalone: true,
    imports: [
        MatSlideToggleModule
    ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {
  @Input({ required: true}) checkValue: boolean;
  @Input({ required: true }) textWhenUnchecked: string;
  @Input({ required: true }) textWhenChecked: string;
  @Output() change = new EventEmitter<MatSlideToggleChange>();

  handleStateChange($event: MatSlideToggleChange) {
    this.change.emit($event);
  }
}
