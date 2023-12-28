import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EditRoomModalData } from "../room-details.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateRoomInputDto } from "../../../../core/api/models/create-room-input-dto";
import { ModalButtonsComponent } from "../../../../shared/components/modal/modal-buttons/modal-buttons.component";
import { ModalHeaderComponent } from "../../../../shared/components/modal/modal-header/modal-header.component";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { Subscription } from "rxjs";

export interface EditRoomModalReturnData {
  name?: string;
  roomType?: CreateRoomInputDto['roomType'];
  description?: string;
}

@Component({
  selector: 'sh-edit-room-modal',
  standalone: true,
  imports: [
    FormsModule,
    ModalButtonsComponent,
    ModalHeaderComponent,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './edit-room-modal.component.html',
  styleUrl: './edit-room-modal.component.scss'
})
export class EditRoomModalComponent implements OnDestroy {
  public roomTypes = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Dining Room', 'Home Office',
    'Garage', 'Basement', 'Attic', 'Guest Room', 'Hallway', 'Laundry Room',
    'Pantry', 'Play Room', 'Storage Room', 'Gym', 'Home Theater', 'Garden',
    'Balcony', 'Other'];

  public editRoomForm = new FormGroup({
    name: new FormControl(''),
    roomType: new FormControl(''),
    description: new FormControl('')
  })

  public isFormValid = false;

  private subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EditRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditRoomModalData,
  ) {
    this.editRoomForm.setValue({
        name: data.room.name,
        roomType: data.room.roomType,
        description: data.room.description
      }
    );

    this.subscription.add(
      this.editRoomForm.valueChanges.subscribe(values => {
        this.isFormValid = values.name !== data.room.name ||
          values.roomType !== data.room.roomType ||
          values.description !== data.room.description;
      })
    )
  }

  public close(data?: EditRoomModalReturnData) {
    this.dialogRef.close(data);
  }

  public handleButtonClicked($event: boolean): void {
    ($event && this.isFormValid) ? this.close({
      name: this.editRoomForm.value.name ?? '',
      roomType: this.editRoomForm.value.roomType as CreateRoomInputDto['roomType'] ?? '',
      description: this.editRoomForm.value.description ?? '',
    }) : this.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
