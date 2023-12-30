import { Component, OnDestroy } from '@angular/core';
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { forkJoin, Observable, Subscription } from "rxjs";
import { NotificationsService } from "../../../core/api/services/notifications.service";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { ModalService, ModalStyle } from "../../../shared/services/modal.service";
import { NotificationDto } from "../../../core/api/models/notification-dto";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { NotificationCardComponent } from "../notification-card/notification-card.component";
import {
  ConfirmModalComponent,
  ConfirmModalData
} from "../../../shared/components/modal/confirm-modal/confirm-modal.component";

@Component({
  selector: 'sh-all-notifications',
  standalone: true,
  imports: [
    CommonModule,
    NotificationCardComponent
  ],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.scss'
})
export class AllNotificationsComponent implements OnDestroy {
  public notifications: NotificationDto[] = [];
  public notificationsSensors: SensorDto[] = [];
  private subscription = new Subscription();

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.fetchNotifications().subscribe(data => this.notificationsSensors = data)
    )
  }

  public deleteNotification(id: string): void {
    const modalRef = this.modalService.open<ConfirmModalComponent, ConfirmModalData>(
      ConfirmModalComponent, {
        data: {
          description: "Do you wish to proceed with deleting the selected notification?"
        },
        style: ModalStyle.ConfirmModal,
      }
    )

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        switchMap(_ => {
          return this.notificationsService.notificationControllerDelete({
            body: {
              id,
            }
          })
        }),
        switchMap(_ => this.fetchNotifications())
      ).subscribe(data => this.notificationsSensors = data)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchNotifications(): Observable<SensorDto[]> {
    return this.notificationsService.notificationControllerNotificationList({
      page: 0,
      limit: 100,
    }).pipe(
      map(data => data.items!),
      tap(data => this.notifications = data),
      switchMap(data => {
        const observableArray = data.map(notification =>
          this.sensorsService.sensorControllerGetById({
              id: notification.sensorId
            }
          ));

        return forkJoin(observableArray);
      })
    )
  }
}
