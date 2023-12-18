import { Component } from '@angular/core';
import { SensorsService } from "../../core/api/services/sensors.service";
import { AlarmService } from "../../core/api/services/alarm.service";
import { ReedSwitchService } from "../../core/api/services/reed-switch.service";
import { map } from "rxjs/operators";
import { PaginationOutput } from "../../core/api/models/pagination-output";

@Component({
  selector: 'sh-security',
  standalone: true,
  imports: [],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
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
      map(data => data)
    )
      .subscribe(data => console.log(data.items));
  }
}
