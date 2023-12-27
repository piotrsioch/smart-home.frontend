import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-modal-buttons',
  standalone: true,
  imports: [],
  templateUrl: './modal-buttons.component.html',
  styleUrl: './modal-buttons.component.scss'
})
export class ModalButtonsComponent {
  @Input() closeText = 'Cancel';
  @Input() saveText = 'Apply';
  @Input() disabled = false;
  @Output() buttonClicked = new EventEmitter<boolean>();

  public close($event: boolean): void {
    this.buttonClicked.emit($event);
  }
}
