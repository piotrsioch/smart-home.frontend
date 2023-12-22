import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-modal-header',
  standalone: true,
  imports: [],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss'
})
export class ModalHeaderComponent {
  @Input({ required: true }) title: string;
  @Output() closeClicked = new EventEmitter<void>();

  public close(): void {
    this.closeClicked.emit()
  }
}
