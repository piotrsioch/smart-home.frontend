import { Component, Inject } from '@angular/core';
import { ModalButtonsComponent } from "../../../../shared/components/modal/modal-buttons/modal-buttons.component";
import { ModalHeaderComponent } from "../../../../shared/components/modal/modal-header/modal-header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AssignSensorModalData } from "../room-details.component";
import { CommonModule } from "@angular/common";

export interface AssignSensorReturnData {
  sensorId: string;
}

@Component({
  selector: 'sh-assign-sensor-modal',
  standalone: true,
  imports: [
    ModalButtonsComponent,
    ModalHeaderComponent,
    ReactiveFormsModule,
    SelectComponent,
    CommonModule,
  ],
  templateUrl: './assign-sensor-modal.component.html',
  styleUrl: './assign-sensor-modal.component.scss'
})
export class AssignSensorModalComponent {
  public sensorNames: string[] = [];
  public assignSensorForm = new FormGroup({
    sensorName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor(
    public dialogRef: MatDialogRef<AssignSensorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignSensorModalData,
  ) {
    this.sensorNames = this.data.sensors.map(sensor => sensor.name + ` (id: ${ sensor._id })`);
  }

  public close(data?: AssignSensorReturnData) {
    this.dialogRef.close(data);
  }

  public handleButtonClicked($event: boolean): void {
    const trimmedIdFromForm = this.assignSensorForm.value.sensorName?.split(' (id:')[1].split(')')[0].trim() || '';

    ($event && this.assignSensorForm.valid) ? this.close({
      sensorId: trimmedIdFromForm,
    }) : this.close();
  }
}
