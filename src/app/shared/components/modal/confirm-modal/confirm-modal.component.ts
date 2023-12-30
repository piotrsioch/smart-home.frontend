import { Component, Inject } from '@angular/core';
import { ModalButtonsComponent } from "../modal-buttons/modal-buttons.component";
import { ModalHeaderComponent } from "../modal-header/modal-header.component";
import { SelectComponent } from "../../select/select.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface ConfirmModalData {
  title?: string;
  description: string;
}

@Component({
  selector: 'sh-confirm-modal',
  standalone: true,
  imports: [
    ModalButtonsComponent,
    ModalHeaderComponent,
    SelectComponent
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  public title: string = 'Are you sure?';
  public description: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModalData,
  ) {
    if (this.data.title) {
      this.title = this.data.title;
    }

    this.description = this.data.description;
  }

  public close(value?: boolean) {
    this.dialogRef.close(value);
  }

  public handleButtonClicked($event: boolean): void {
    $event ? this.close(true) : this.dialogRef.close();
  }
}
