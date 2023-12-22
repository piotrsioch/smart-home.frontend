import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { ModalHeaderComponent } from "../../../shared/components/modal/modal-header/modal-header.component";
import { SelectComponent } from "../../../shared/components/select/select.component";

@Component({
  selector: 'sh-alarm-modal',
  standalone: true,
  imports: [
    ModalHeaderComponent, ModalHeaderComponent, SelectComponent
  ],
  templateUrl: './alarm-modal.component.html',
  styleUrl: './alarm-modal.component.scss'
})
export class AlarmModalComponent {
  public states = ['off', 'armed', 'on'];
  public value: string;

  constructor(
    public dialogRef: MatDialogRef<AlarmModalComponent>,
  ) {

  }

  public close() {
    this.dialogRef.close();
  }

  public valueSelected(event: string): void {
    this.value = event;
  }
}
