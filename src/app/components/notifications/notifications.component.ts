import { Component } from '@angular/core';
import { NotificationsService } from "../../core/api/services/notifications.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { NotificationDto } from "../../core/api/models/notification-dto";
import { forkJoin, Observable, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ModalService, ModalStyle } from "../../shared/services/modal.service";
import {
  ConfirmModalComponent,
  ConfirmModalData
} from "../../shared/components/modal/confirm-modal/confirm-modal.component";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { SensorsService } from "../../core/api/services/sensors.service";
import { NotificationCardComponent } from "./notification-card/notification-card.component";

@Component({
  selector: 'sh-notifications',
  standalone: true,
  imports: [
    CommonModule,
    NotificationCardComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  public unreadNotifications: NotificationDto[] = [];
  public notificationsSensors: SensorDto[] = [];
  private subscription = new Subscription();

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly sensorsService: SensorsService,
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.fetchUnreadNotifications().subscribe(data => {
        this.notificationsSensors = data
      })
    );
  }

  public navigateToAllNotifications(): void {
    this.router.navigate(['notifications/all']);
  }

  public markNotificationAsRead(id: string): void {
    const modalRef = this.modalService.open<ConfirmModalComponent, ConfirmModalData>(
      ConfirmModalComponent, {
        data: {
          description: 'Do you wish to mark this notification as read?'
        },
        style: ModalStyle.ConfirmModal,
      }
    )

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        switchMap(_ => {
          return this.notificationsService.notificationControllerMarkAsRead({
            body: {
              id,
            }
          })
        }),
        switchMap(_ => this.fetchUnreadNotifications())
      ).subscribe(data => this.notificationsSensors = data)
    )
  }

  private fetchUnreadNotifications(): Observable<SensorDto[]> {
    return this.notificationsService.notificationControllerGetUnreadNotifications().pipe(
      map(data => data.notifications),
      tap(data => this.unreadNotifications = data),
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
