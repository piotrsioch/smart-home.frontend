import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { ModalHeaderComponent } from "../../../shared/components/modal/modal-header/modal-header.component";

interface IAlarmData {
  state: string;
}

@Component({
  selector: 'sh-alarm-modal',
  standalone: true,
  imports: [
    ModalHeaderComponent, ModalHeaderComponent
  ],
  templateUrl: './alarm-modal.component.html',
  styleUrl: './alarm-modal.component.scss'
})
export class AlarmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AlarmModalComponent>,
  ) {
  }

  public close() {
    this.dialogRef.close();
  }
}
