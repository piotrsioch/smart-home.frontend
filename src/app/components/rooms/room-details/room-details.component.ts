import { Component, OnDestroy } from '@angular/core';
import { RoomService } from "../../../core/api/services/room.service";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { BehaviorSubject, forkJoin, Observable, Subscription, switchMap } from "rxjs";
import { RoomDto } from "../../../core/api/models/room-dto";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { filter, map, tap } from "rxjs/operators";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModalService, ModalStyle } from "../../../shared/services/modal.service";
import {
  AssignSensorModalComponent,
  AssignSensorReturnData
} from "./assign-sensor-modal/assign-sensor-modal.component";

export interface AssignSensorModalData {
  sensors: SensorDto[];
}

@Component({
  selector: 'sh-room-details',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnDestroy {
  public room: RoomDto;
  public roomSensors: SensorDto[] = [];
  public unassignedSensors: SensorDto[] = [];
  public loading = true;
  private readonly subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomService: RoomService,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
     this.fetchRoomAndRoomSensorsData().subscribe(data => this.roomSensors = data)
    );

    this.subscription.add(
      this.fetchUnassignedSensorsData().subscribe(data => this.unassignedSensors = data)
    )
  }

  public assignSensorToRoom(): void {
    const modalRef =
      this.modalService.open<AssignSensorModalComponent, AssignSensorModalData, AssignSensorReturnData>(
        AssignSensorModalComponent, {
          data: {
            sensors: this.unassignedSensors,
          },
          style: ModalStyle.Small,
        });

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        tap(data => console.log(data!.sensorId)),
        tap(_ => console.log(this.room._id)),
        switchMap(data => this.roomService.roomControllerAssignSensorToRoom({
            body: {
              sensorId: data!.sensorId,
              roomId: this.room._id,
            },
          })
        ),
        switchMap(_ => this.fetchRoomAndRoomSensorsData()),
      ).subscribe(data => this.roomSensors = data)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchRoomAndRoomSensorsData(): Observable<SensorDto[]> {
    return this.roomService.roomControllerGetRoomById({
      id: this.route.snapshot.paramMap.get('id')!,
    }).pipe(
      tap(data => this.room = data),
      switchMap(room => {
        const observableArray = room.sensorsIds.map(id => this.sensorsService.sensorControllerGetById({id}));

        return forkJoin(observableArray);
      })
    )
  }

  private fetchUnassignedSensorsData(): Observable<SensorDto[]> {
    return this.sensorsService.sensorControllerSensorList({
        page: 0, limit: 100
      }).pipe(
      map(data => data.items!),
      map(data => data!.filter(sensor => sensor.roomId == null)),
    )
  }
}
