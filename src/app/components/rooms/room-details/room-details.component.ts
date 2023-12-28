import { Component, OnDestroy } from '@angular/core';
import { RoomService } from "../../../core/api/services/room.service";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { BehaviorSubject, first, forkJoin, Observable, of, Subscription, switchMap } from "rxjs";
import { RoomDto } from "../../../core/api/models/room-dto";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { filter, map, tap } from "rxjs/operators";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModalService, ModalStyle } from "../../../shared/services/modal.service";
import {
  AssignSensorModalComponent,
  AssignSensorReturnModalData
} from "./assign-sensor-modal/assign-sensor-modal.component";
import {
  EditRoomModalComponent,
  EditRoomModalReturnData,
} from "./edit-room-modal/edit-room-modal.component";

export interface AssignSensorModalData {
  sensors: SensorDto[];
}

export interface EditRoomModalData {
  room: RoomDto;
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
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private readonly subscription = new Subscription();

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
      this.fetchRoomAndUnassignedSensorData().subscribe(([roomSensors, unassignedSensors]) => {
        this.roomSensors = roomSensors;
        this.unassignedSensors = unassignedSensors;
      })
    )
  }

  public assignSensorToRoom(): void {
    const modalRef =
      this.modalService.open<AssignSensorModalComponent, AssignSensorModalData, AssignSensorReturnModalData>(
        AssignSensorModalComponent, {
          data: {
            sensors: this.unassignedSensors,
          },
          style: ModalStyle.Small,
        });

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        switchMap(data => this.roomService.roomControllerAssignSensorToRoom({
            body: {
              sensorId: data!.sensorId,
              roomId: this.room._id,
            },
          })
        ),
        switchMap(_ => this.fetchRoomAndUnassignedSensorData()),
      ).subscribe(([roomSensors, unassignedSensors]) => {
        this.roomSensors = roomSensors;
        this.unassignedSensors = unassignedSensors;
      })
    );
  }

  public editRoom(): void {
    const modalRef =
      this.modalService.open<EditRoomModalComponent, EditRoomModalData, EditRoomModalReturnData>(
        EditRoomModalComponent, {
          data: {
            room: this.room,
          },
        });

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        switchMap(data => this.roomService.roomControllerEditRoom({
          body: {
            id: this.room._id,
            name: data?.name || '',
            roomType: data?.roomType || undefined,
            description: data?.description || '',
          }
        })),
        switchMap(_ => this.fetchRoomAndRoomSensorsData()),
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchRoomAndUnassignedSensorData(): Observable<[SensorDto[], SensorDto[]]> {
    return forkJoin([
      this.fetchRoomAndRoomSensorsData(),
      this.fetchUnassignedSensorsData()
    ])
  }

  private fetchRoomAndRoomSensorsData(): Observable<SensorDto[]> {
    return this.roomService.roomControllerGetRoomById({
      id: this.route.snapshot.paramMap.get('id')!,
    }).pipe(
      tap(data => this.room = data),
      switchMap(room => {
        if (room.sensorsIds.length === 0) {
          return of([]);
        }

        const observableArray = room.sensorsIds.map(id => this.sensorsService.sensorControllerGetById({id}));

        return forkJoin(observableArray);
      }),
    )
  }

  private fetchUnassignedSensorsData(): Observable<SensorDto[]> {
    return this.sensorsService.sensorControllerSensorList({
      page: 0, limit: 100
    }).pipe(
      map(data => data.items!),
      map(data => data!.filter(sensor => sensor.roomId == null || sensor.roomId == '')),
      first(),
    )
  }
}
