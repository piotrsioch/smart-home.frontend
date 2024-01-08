import { Component } from '@angular/core';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { BehaviorSubject, Observable, of, Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { ModalService } from "../../../shared/services/modal.service";
import { filter, tap } from "rxjs/operators";
import { RoomDto } from "../../../core/api/models/room-dto";
import { RoomService } from "../../../core/api/services/room.service";
import { EditSensorModalComponent, EditSensorModalReturnData } from "../edit-sensor-modal/edit-sensor-modal.component";
import { sensorsTypesMap } from "../sensors.assets";

export interface EditSensorModalData {
  sensor: SensorDto;
}

@Component({
  selector: 'sh-sensor-details',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.scss'
})
export class SensorDetailsComponent {
  public sensor: SensorDto;
  public loading = true;
  public room: RoomDto;
  public sensorTypesMap = sensorsTypesMap;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private readonly subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
    private readonly roomService: RoomService,
  ) {
    this.loadingSubject.subscribe(isLoading => {
      this.loading = isLoading;
    })

    this.subscription.add(
      this.fetchSensorData().subscribe(data => {
        if (data) {
          this.room = data;
        }
        this.loadingSubject.next(false);
      })
    )
  }

  public editSensor(): void {
    const modalRef =
      this.modalService.open<EditSensorModalComponent, EditSensorModalData, EditSensorModalReturnData>(
        EditSensorModalComponent, {
          data: {
            sensor: this.sensor,
          },
        });

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        tap(_ => this.loadingSubject.next(true)),
        switchMap(data => this.sensorsService.sensorControllerEditSensor({
          body: {
            id: this.sensor._id,
            name: data?.name || '',
            location: data?.location || '',
          }
        })),
        switchMap(_ => this.fetchSensorData()),
      ).subscribe(_ => this.loadingSubject.next(false))
    )
  }

  private fetchSensorData(): Observable<RoomDto | null> {
    return this.sensorsService.sensorControllerGetById({
      id: this.route.snapshot.paramMap.get('id')!,
    }).pipe(
      tap(_ => this.loadingSubject.next(true)),
      tap(data => this.sensor = data),
      switchMap(data => {
        if (!data.roomId) {
          return of(null);
        }

        return this.roomService.roomControllerGetRoomById({
          id: data.roomId,
        })
      })
    )
  }
}
