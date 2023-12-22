import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

export enum ModalStyle {
  Small = 'sh-small-modal',
  Default = 'sh-modal'
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public constructor(private readonly _modal: MatDialog) {
  }

  public open<C, D = any, R = any>(
    component: ComponentType<C>,
    config: { data?: D, style: ModalStyle } = { style: ModalStyle.Default}
  ): MatDialogRef<C, R> {
    return this._modal.open<C, D, R>(component, {
      data: config.data,
      panelClass: ['sh-modal', config.style],
    });
  }
}
