import { Component } from '@angular/core';
import { NotificationsService } from "../../core/api/services/notifications.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { NotificationDto } from "../../core/api/models/notification-dto";
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from "rxjs";
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
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'sh-notifications',
  standalone: true,
  imports: [
    CommonModule,
    NotificationCardComponent,
    LoaderComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  public unreadNotifications: NotificationDto[] = [];
  public notificationsSensors: SensorDto[] = [];
  public loading = true;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private subscription = new Subscription();

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly sensorsService: SensorsService,
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.fetchUnreadNotifications().pipe(
        tap(_ => this.loadingSubject.next(true))
      ).subscribe(data => {
        this.loadingSubject.next(false);
        this.notificationsSensors = data;
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
        tap(_ => this.loadingSubject.next(true)),
        switchMap(_ => {
          return this.notificationsService.notificationControllerMarkAsRead({
            body: {
              id,
            }
          })
        }),
        switchMap(_ => this.fetchUnreadNotifications())
      ).subscribe(data => {
        this.notificationsSensors = data;
        this.loadingSubject.next(false);
      })
    )
  }

  private fetchUnreadNotifications(): Observable<SensorDto[]> {
    return this.notificationsService.notificationControllerGetUnreadNotifications().pipe(
      map(data => data.notifications),
      tap(data => this.unreadNotifications = data),
      switchMap(data => {
        if (data.length === 0) {
          return of([]);
        }

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
