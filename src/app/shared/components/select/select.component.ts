import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'sh-select',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    TitleCasePipe,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements ControlValueAccessor {
  @Input({ required: true }) values: string[];
  @Input() disabled = false;
  @Output() valueSelected = new EventEmitter<string>();

  value = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  selectValue($event: MatSelectChange) {
    this.value = $event.value;
    this.valueSelected.emit($event.value);
    this.onChange($event.value);
  }

  set selectedItem(selected: string) {
    this.value = selected;
    this.onChange(selected);
  }

  writeValue(value: string) {
    this.value = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }
}
