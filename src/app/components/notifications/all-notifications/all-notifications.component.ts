import { Component, OnDestroy } from '@angular/core';
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from "rxjs";
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
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'sh-all-notifications',
  standalone: true,
  imports: [
    CommonModule,
    NotificationCardComponent,
    LoaderComponent,
  ],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.scss'
})
export class AllNotificationsComponent implements OnDestroy {
  public notifications: NotificationDto[] = [];
  public notificationsSensors: SensorDto[] = [];
  public loading = true;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private subscription = new Subscription();

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.fetchNotifications().pipe(
        tap(_ => this.loadingSubject.next(true))
      ).subscribe(data => {
        this.notificationsSensors = data;
        this.loadingSubject.next(false);
      })
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
        tap(_ => this.loadingSubject.next(true)),
        switchMap(_ => {
          return this.notificationsService.notificationControllerDelete({
            body: {
              id,
            }
          })
        }),
        switchMap(_ => this.fetchNotifications())
      ).subscribe(data => {
        this.notificationsSensors = data;
        this.loadingSubject.next(false);
      })
    )
  }

  ngOnDestroy(): void {
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
