import { Component } from '@angular/core';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { BehaviorSubject, Observable, of, Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { ModalService } from "../../../shared/services/modal.service";
import { tap } from "rxjs/operators";
import { RoomDto } from "../../../core/api/models/room-dto";
import { RoomService } from "../../../core/api/services/room.service";

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

  public editSensor(id: string): void {

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
