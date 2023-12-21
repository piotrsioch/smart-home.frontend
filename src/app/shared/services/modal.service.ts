import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public constructor(private readonly _modal: MatDialog) {
  }

  public open<C, D = any, R = any>(
    component: ComponentType<C>,
    data?: D,
  ): MatDialogRef<C, R> {
    return this._modal.open<C, D, R>(component, {
      data,
      panelClass: ['sh-modal'],
    });
  }
}
