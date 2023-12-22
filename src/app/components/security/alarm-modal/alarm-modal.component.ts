import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { ModalHeaderComponent } from "../../../shared/components/modal/modal-header/modal-header.component";
import { SelectComponent } from "../../../shared/components/select/select.component";
import { ModalButtonsComponent } from "../../../shared/components/modal/modal-buttons/modal-buttons.component";

@Component({
  selector: 'sh-alarm-modal',
  standalone: true,
  imports: [
    ModalHeaderComponent,
    ModalHeaderComponent,
    SelectComponent,
    ModalButtonsComponent,
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

  public close(data?: string) {
    this.dialogRef.close(data);
  }

  public valueSelected(event: string): void {
    this.value = event;
  }

  public handleButtonClicked($event: boolean): void {
    $event ? this.close(this.value) : this.close();
  }
}
