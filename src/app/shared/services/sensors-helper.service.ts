import { Injectable } from '@angular/core';
import { DhtSensorService } from "../../core/api/services/dht-sensor.service";
import { SmokeSensorService } from "../../core/api/services/smoke-sensor.service";
import { PirSensorService } from "../../core/api/services/pir-sensor.service";
import { ReedSwitchService } from "../../core/api/services/reed-switch.service";
import { ReedSwitchDto } from "../../core/api/models/reed-switch-dto";
import { LightDto } from "../../core/api/models/light-dto";
import { DhtSensorDto } from "../../core/api/models/dht-sensor-dto";
import { PirSensorDto } from "../../core/api/models/pir-sensor-dto";
import { SmokeSensorDto } from "../../core/api/models/smoke-sensor-dto";
import { AlarmService } from "../../core/api/services/alarm.service";
import { LightService } from "../../core/api/services/light.service";
import { AlarmDto } from "../../core/api/models/alarm-dto";
import { TableColumn } from "../components/table/table.assets";

export type SensorServiceType = ReedSwitchDto | LightDto | DhtSensorDto | PirSensorDto | SmokeSensorDto | AlarmDto;

@Injectable({
  providedIn: 'root'
})
export class SensorsHelperService {
  constructor(
    private readonly dhtSensorService: DhtSensorService,
    private readonly smokeSensorService: SmokeSensorService,
    private readonly pirSensorService: PirSensorService,
    private readonly reedSwitchService: ReedSwitchService,
    private readonly alarmService: AlarmService,
    private readonly lightService: LightService,
  ) {
  }

  public getPaginatedData(type: 'dhtSensor' | 'pirSensor' | 'reedSwitch' | 'light' | 'mqSensor' | 'alarm', pagination: any) {
    switch (type) {
      case "dhtSensor":
        return this.dhtSensorService.dhtSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit
        });


      case "pirSensor":
        return this.pirSensorService.pirSensorControllerPirSensorList({
          page: pagination.page,
          limit: pagination.limit
        });


      case "reedSwitch":
        return this.reedSwitchService.reedSwitchControllerReedSwitchList({
          page: pagination.page,
          limit: pagination.limit
        });


      case "light":
        return this.lightService.lightControllerLightList({
          page: pagination.page,
          limit: pagination.limit
        });


      case "mqSensor":
        return this.smokeSensorService.smokeSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit
        });


      case "alarm":
        return this.alarmService.alarmControllerAlarmList({
          page: pagination.page,
          limit: pagination.limit
        });

      default:
        return this.dhtSensorService.dhtSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit
        });
    }
  }

  public getSensorColumns(type: 'dhtSensor' | 'pirSensor' | 'reedSwitch' | 'light' | 'mqSensor' | 'alarm'): TableColumn[] {
    switch (type) {
      case "dhtSensor":
        return this.dhtSensorColumns;


      case "pirSensor":
        return this.pirSensorColumns;


      case "reedSwitch":
        return this.reedSwitchColumns;


      case "light":
        return this.lightColumns;


      case "mqSensor":
        return this.smokeSensorColumns;


      case "alarm":
        return this.alarmColumns;

      default:
        return this.dhtSensorColumns;
    }
  }

  private dhtSensorColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'Temperature',
      dataKey: 'temperature',
    },
    {
      name: 'Humidity',
      dataKey: 'humidity',
    },
  ]

  private reedSwitchColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'Is Opened',
      dataKey: 'isOpened',
    },
  ]

  private lightColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'Is On',
      dataKey: 'isOn',
    },
  ]

  private pirSensorColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'Sensor Id',
      dataKey: 'sensorId',
    },
  ]

  private smokeSensorColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'Value',
      dataKey: 'value',
    },
  ]

  private alarmColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
    },
    {
      name: 'State',
      dataKey: 'state',
    },
  ]
}
