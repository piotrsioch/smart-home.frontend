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
import { TableColumn, TableColumnType, TablePaginatedListInput } from "../components/table/table.assets";

export type SensorServiceType = ReedSwitchDto | LightDto | DhtSensorDto | PirSensorDto | SmokeSensorDto | AlarmDto;

export type GetPaginatedSensorData = {
  items: SensorServiceType[],
  total: number
}

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

  public getPaginatedData(type: 'dhtSensor' | 'pirSensor' | 'reedSwitch' | 'light' | 'mqSensor' | 'alarm', pagination: TablePaginatedListInput) {
    switch (type) {
      case "dhtSensor":
        return this.dhtSensorService.dhtSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });


      case "pirSensor":
        return this.pirSensorService.pirSensorControllerPirSensorList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });


      case "reedSwitch":
        return this.reedSwitchService.reedSwitchControllerReedSwitchList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });


      case "light":
        return this.lightService.lightControllerLightList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });


      case "mqSensor":
        return this.smokeSensorService.smokeSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });


      case "alarm":
        return this.alarmService.alarmControllerAlarmList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
        });

      default:
        return this.dhtSensorService.dhtSensorControllerDhtSensorList({
          page: pagination.page,
          limit: pagination.limit,
          search: pagination.search ?? '',
          orderField: pagination.orderField ?? '',
          orderDirection: pagination.orderDirection,
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
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'Temperature',
      dataKey: 'temperature',
      isSortable: true,
    },
    {
      name: 'Humidity',
      dataKey: 'humidity',
      isSortable: true,
    },
  ]

  private reedSwitchColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'Is Opened',
      dataKey: 'isOpened',
      isSortable: true,
    },
  ]

  private lightColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'Is On',
      dataKey: 'isOn',
      isSortable: true,
    },
  ]

  private pirSensorColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'Sensor Id',
      dataKey: 'sensorId',
      isSortable: true,
    },
  ]

  private smokeSensorColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'Value',
      dataKey: 'value',
      isSortable: true,
    },
  ]

  private alarmColumns = [
    {
      name: 'Created At',
      dataKey: 'createdAt',
      type: TableColumnType.DATE,
      isSortable: true,
    },
    {
      name: 'State',
      dataKey: 'state',
      isSortable: true,
    },
  ]
}
