import { Component, Input, OnDestroy } from '@angular/core';
import { RoomService } from "../../../core/api/services/room.service";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { BehaviorSubject, forkJoin, Subscription, switchMap } from "rxjs";
import { RoomDto } from "../../../core/api/models/room-dto";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { map, tap } from "rxjs/operators";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

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
    private readonly sensorsService: SensorsService
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.roomService.roomControllerGetRoomById({
        id: this.route.snapshot.paramMap.get('id')!,
      }).pipe(
        tap(_ => this.loadingSubject.next(true)),
        tap(data => this.room = data),
        switchMap(room => {
          const observableArray = room.sensorsIds.map(id => this.sensorsService.sensorControllerGetById({id}));

          return forkJoin(observableArray);
        })
      ).subscribe(data => {
        this.roomSensors = data;
        this.loadingSubject.next(false);
      })
    )

    this.subscription.add(
      this.sensorsService.sensorControllerSensorList({
          page: 0, limit: 100
        }
      ).pipe(
        tap(_ => this.loadingSubject.next(true)),
        map(data => data.items),
        map(data => data!.filter(sensor => sensor.roomId == null)),
      ).subscribe(data => {
        this.unassignedSensors = data!;
        this.loadingSubject.next(false);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
