import { Component } from '@angular/core';
import { SensorsService } from "../../core/api/services/sensors.service";
import { AlarmService } from "../../core/api/services/alarm.service";
import { ReedSwitchService } from "../../core/api/services/reed-switch.service";
import { map, switchMap, tap } from "rxjs/operators";
import { AlarmDto } from "../../core/api/models/alarm-dto";
import { ReedSwitchDto } from "../../core/api/models/reed-switch-dto";

@Component({
  selector: 'sh-security',
  standalone: true,
  imports: [],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  public alarm: AlarmDto;
  public readonly reedSwitches: ReedSwitchDto[];

  constructor(
    private readonly sensorsService: SensorsService,
    private readonly alarmService: AlarmService,
    private readonly reedSwitchService: ReedSwitchService
  ) {
    this.sensorsService.sensorControllerSensorList({
      search: 'alarm',
      page: 0,
      limit: 5
    }).pipe(
      map(data => data.items!),
      map(data => data[0]._id),
      switchMap(id => this.alarmService.alarmControllerGetAlarmState({ sensorId: id}))
    )
      .subscribe(data => this.alarm = data);

    this.sensorsService.sensorControllerSensorList({
      search: 'rs_',
      page: 0,
      limit: 40
    }).pipe(
      map(data => data.items!),
      tap(data => console.log(data)),
    ).subscribe(data => console.log(data));
  }
}
