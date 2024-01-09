import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButtonsComponent } from "../../../shared/components/modal/modal-buttons/modal-buttons.component";
import { ModalHeaderComponent } from "../../../shared/components/modal/modal-header/modal-header.component";
import { SelectComponent } from "../../../shared/components/select/select.component";
import { EditSensorModalData } from "../sensor-details/sensor-details.component";

export interface EditSensorModalReturnData {
  name?: string;
  location?: string
}

@Component({
  selector: 'sh-edit-sensor-modal',
  standalone: true,
  imports: [
    FormsModule,
    ModalButtonsComponent,
    ModalHeaderComponent,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './edit-sensor-modal.component.html',
  styleUrl: './edit-sensor-modal.component.scss'
})
export class EditSensorModalComponent implements OnDestroy {
  public editSensorForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
  })

  public isFormValid = false;

  private subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EditSensorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSensorModalData,
  ) {
    this.editSensorForm.setValue({
      name: data.sensor.name,
      location: data.sensor.location
    });

    this.subscription.add(
      this.editSensorForm.valueChanges.subscribe(values => {
        this.isFormValid = values.name !== data.sensor.name ||
          values.location !== data.sensor.location
      })
    )
  }

  public close(data?: EditSensorModalReturnData) {
    this.dialogRef.close(data);
  }

  public handleButtonClicked($event: boolean): void {
    ($event && this.isFormValid) ? this.close({
      name: this.editSensorForm.value.name ?? '',
      location: this.editSensorForm.value.location ?? '',
    }) : this.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
