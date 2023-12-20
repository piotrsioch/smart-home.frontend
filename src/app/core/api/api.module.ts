/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { DhtSensorService } from './services/dht-sensor.service';
import { SensorsService } from './services/sensors.service';
import { PirSensorService } from './services/pir-sensor.service';
import { SmokeSensorService } from './services/smoke-sensor.service';
import { ReedSwitchService } from './services/reed-switch.service';
import { LightService } from './services/light.service';
import { AlarmService } from './services/alarm.service';
import { RoomService } from './services/room.service';
import { NotificationsService } from './services/notifications.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    DhtSensorService,
    SensorsService,
    PirSensorService,
    SmokeSensorService,
    ReedSwitchService,
    LightService,
    AlarmService,
    RoomService,
    NotificationsService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
