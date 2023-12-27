import { Component } from '@angular/core';
import { ModalHeaderComponent } from "../../../shared/components/modal/modal-header/modal-header.component";
import { ModalButtonsComponent } from "../../../shared/components/modal/modal-buttons/modal-buttons.component";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SelectComponent } from "../../../shared/components/select/select.component";

export interface AlarmModalReturnData {
  name: string;
  roomType: string;
  description?: string;
}

@Component({
  selector: 'sh-add-room-modal',
  standalone: true,
  imports: [
    ModalHeaderComponent,
    ModalButtonsComponent,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './add-room-modal.component.html',
  styleUrl: './add-room-modal.component.scss'
})
export class AddRoomModalComponent {
  public roomTypes = ["Bedroom", "Garage"];
  public addRoomForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    roomType: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })
  constructor(
    public dialogRef: MatDialogRef<AddRoomModalComponent>,
  ) {
  }

  public close(data?: AlarmModalReturnData) {
    this.dialogRef.close(data);
  }

  public handleButtonClicked($event: boolean): void {
    ($event && this.addRoomForm.valid) ? this.close({
      name: this.addRoomForm.value.name ?? '',
      roomType: this.addRoomForm.value.roomType ?? '',
      description: this.addRoomForm.value.description ?? '',
    }) : this.close();
  }
}
