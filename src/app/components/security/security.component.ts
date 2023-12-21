import { Component, OnDestroy } from '@angular/core';
import { SensorsService } from "../../core/api/services/sensors.service";
import { AlarmService } from "../../core/api/services/alarm.service";
import { ReedSwitchService } from "../../core/api/services/reed-switch.service";
import { map, switchMap, tap } from "rxjs/operators";
import { AlarmDto } from "../../core/api/models/alarm-dto";
import { ReedSwitchDto } from "../../core/api/models/reed-switch-dto";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { forkJoin, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ModalService } from "../../shared/services/modal.service";
import { AlarmModalComponent } from "./alarm-modal/alarm-modal.component";

@Component({
  selector: 'sh-security',
  standalone: true,
  imports: [CommonModule, LoaderComponent, AlarmModalComponent],
  providers: [ModalService],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent implements OnDestroy {
  public isLoading = true;
  public alarm: AlarmDto;
  public alarmSensor: SensorDto;
  public reedSwitchSensors: SensorDto[] = [];
  public reedSwitches: ReedSwitchDto[] = [];
  private subscriptions = new Subscription();

  constructor(
    private readonly sensorsService: SensorsService,
    private readonly alarmService: AlarmService,
    private readonly reedSwitchService: ReedSwitchService,
    private readonly modalService: ModalService,
  ) {
    this.subscriptions.add(this.sensorsService.sensorControllerSensorList({
      search: 'alarm',
      page: 0,
      limit: 5
    }).pipe(
      tap(_ => this.isLoading = true),
      map(data => data.items!),
      tap(data => this.alarmSensor = data[0]),
      map(data => data[0]._id),
      switchMap(id => this.alarmService.alarmControllerGetAlarmState({sensorId: id}))
    )
      .subscribe(data => {
        this.alarm = data;
        this.isLoading = false;
      }));

    this.sensorsService.sensorControllerSensorList({
      search: 'RS_',
      page: 0,
      limit: 100,
    }).pipe(
      tap(_ => this.isLoading = true),
      map(data => data.items!),
      tap(data => this.reedSwitchSensors = data),
      switchMap(sensors => {
        const observableArray = sensors.map(sensor =>
          this.reedSwitchService.reedSwitchControllerGetLatestData({
            sensorId:
            sensor._id
          }));
        return forkJoin(observableArray);
      })
    ).subscribe(data => {
      this.reedSwitches = data;
      this.isLoading = false;
    });
  }

  public openAlarmModal(): void {
    const modalRef = this.modalService.open<AlarmModalComponent>(AlarmModalComponent);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}