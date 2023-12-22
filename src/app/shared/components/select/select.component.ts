import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'sh-select',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input({ required: true }) values: string[];
  @Output() valueSelected = new EventEmitter<string>();

  value = new FormControl('');

  selectValue($event: MatSelectChange) {
    this.valueSelected.emit($event.value);
  }
}
