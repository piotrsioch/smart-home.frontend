/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { alarmControllerAlarmList } from '../fn/operations/alarm-controller-alarm-list';
import { AlarmControllerAlarmList$Params } from '../fn/operations/alarm-controller-alarm-list';
import { alarmControllerChangeLightState } from '../fn/operations/alarm-controller-change-light-state';
import { AlarmControllerChangeLightState$Params } from '../fn/operations/alarm-controller-change-light-state';
import { alarmControllerGetAlarmState } from '../fn/operations/alarm-controller-get-alarm-state';
import { AlarmControllerGetAlarmState$Params } from '../fn/operations/alarm-controller-get-alarm-state';
import { dhtSensorControllerAddDhtSensorData } from '../fn/operations/dht-sensor-controller-add-dht-sensor-data';
import { DhtSensorControllerAddDhtSensorData$Params } from '../fn/operations/dht-sensor-controller-add-dht-sensor-data';
import { dhtSensorControllerDhtSensorList } from '../fn/operations/dht-sensor-controller-dht-sensor-list';
import { DhtSensorControllerDhtSensorList$Params } from '../fn/operations/dht-sensor-controller-dht-sensor-list';
import { dhtSensorControllerGetLatestData } from '../fn/operations/dht-sensor-controller-get-latest-data';
import { DhtSensorControllerGetLatestData$Params } from '../fn/operations/dht-sensor-controller-get-latest-data';
import { lightControllerChangeLightState } from '../fn/operations/light-controller-change-light-state';
import { LightControllerChangeLightState$Params } from '../fn/operations/light-controller-change-light-state';
import { lightControllerGetLightState } from '../fn/operations/light-controller-get-light-state';
import { LightControllerGetLightState$Params } from '../fn/operations/light-controller-get-light-state';
import { lightControllerLightList } from '../fn/operations/light-controller-light-list';
import { LightControllerLightList$Params } from '../fn/operations/light-controller-light-list';
import { notificationControllerGetNotificationById } from '../fn/operations/notification-controller-get-notification-by-id';
import { NotificationControllerGetNotificationById$Params } from '../fn/operations/notification-controller-get-notification-by-id';
import { notificationControllerNotificationList } from '../fn/operations/notification-controller-notification-list';
import { NotificationControllerNotificationList$Params } from '../fn/operations/notification-controller-notification-list';
import { pirSensorControllerAddPirSensorData } from '../fn/operations/pir-sensor-controller-add-pir-sensor-data';
import { PirSensorControllerAddPirSensorData$Params } from '../fn/operations/pir-sensor-controller-add-pir-sensor-data';
import { pirSensorControllerPirSensorList } from '../fn/operations/pir-sensor-controller-pir-sensor-list';
import { PirSensorControllerPirSensorList$Params } from '../fn/operations/pir-sensor-controller-pir-sensor-list';
import { reedSwitchControllerAddReedSwitchController } from '../fn/operations/reed-switch-controller-add-reed-switch-controller';
import { ReedSwitchControllerAddReedSwitchController$Params } from '../fn/operations/reed-switch-controller-add-reed-switch-controller';
import { reedSwitchControllerGetLatestData } from '../fn/operations/reed-switch-controller-get-latest-data';
import { ReedSwitchControllerGetLatestData$Params } from '../fn/operations/reed-switch-controller-get-latest-data';
import { reedSwitchControllerReedSwitchList } from '../fn/operations/reed-switch-controller-reed-switch-list';
import { ReedSwitchControllerReedSwitchList$Params } from '../fn/operations/reed-switch-controller-reed-switch-list';
import { sensorControllerCreateSensor } from '../fn/operations/sensor-controller-create-sensor';
import { SensorControllerCreateSensor$Params } from '../fn/operations/sensor-controller-create-sensor';
import { sensorControllerGetById } from '../fn/operations/sensor-controller-get-by-id';
import { SensorControllerGetById$Params } from '../fn/operations/sensor-controller-get-by-id';
import { sensorControllerSensorList } from '../fn/operations/sensor-controller-sensor-list';
import { SensorControllerSensorList$Params } from '../fn/operations/sensor-controller-sensor-list';
import { smokeSensorControllerAddSmokeSensorData } from '../fn/operations/smoke-sensor-controller-add-smoke-sensor-data';
import { SmokeSensorControllerAddSmokeSensorData$Params } from '../fn/operations/smoke-sensor-controller-add-smoke-sensor-data';
import { smokeSensorControllerDhtSensorList } from '../fn/operations/smoke-sensor-controller-dht-sensor-list';
import { SmokeSensorControllerDhtSensorList$Params } from '../fn/operations/smoke-sensor-controller-dht-sensor-list';
import { usersTestControllerTest } from '../fn/operations/users-test-controller-test';
import { UsersTestControllerTest$Params } from '../fn/operations/users-test-controller-test';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `usersTestControllerTest()` */
  static readonly UsersTestControllerTestPath = '/users/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersTestControllerTest()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersTestControllerTest$Response(params?: UsersTestControllerTest$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return usersTestControllerTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersTestControllerTest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersTestControllerTest(params?: UsersTestControllerTest$Params, context?: HttpContext): Observable<void> {
    return this.usersTestControllerTest$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `dhtSensorControllerAddDhtSensorData()` */
  static readonly DhtSensorControllerAddDhtSensorDataPath = '/dht-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dhtSensorControllerAddDhtSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dhtSensorControllerAddDhtSensorData$Response(params: DhtSensorControllerAddDhtSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return dhtSensorControllerAddDhtSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerAddDhtSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dhtSensorControllerAddDhtSensorData(params: DhtSensorControllerAddDhtSensorData$Params, context?: HttpContext): Observable<void> {
    return this.dhtSensorControllerAddDhtSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `dhtSensorControllerDhtSensorList()` */
  static readonly DhtSensorControllerDhtSensorListPath = '/dht-sensor/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dhtSensorControllerDhtSensorList()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerDhtSensorList$Response(params: DhtSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return dhtSensorControllerDhtSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerDhtSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerDhtSensorList(params: DhtSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<void> {
    return this.dhtSensorControllerDhtSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `dhtSensorControllerGetLatestData()` */
  static readonly DhtSensorControllerGetLatestDataPath = '/dht-sensor/latest-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dhtSensorControllerGetLatestData()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerGetLatestData$Response(params: DhtSensorControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return dhtSensorControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerGetLatestData(params: DhtSensorControllerGetLatestData$Params, context?: HttpContext): Observable<void> {
    return this.dhtSensorControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `sensorControllerCreateSensor()` */
  static readonly SensorControllerCreateSensorPath = '/sensors/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorControllerCreateSensor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerCreateSensor$Response(params: SensorControllerCreateSensor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sensorControllerCreateSensor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerCreateSensor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerCreateSensor(params: SensorControllerCreateSensor$Params, context?: HttpContext): Observable<void> {
    return this.sensorControllerCreateSensor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `sensorControllerSensorList()` */
  static readonly SensorControllerSensorListPath = '/sensors/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorControllerSensorList()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorControllerSensorList$Response(params: SensorControllerSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sensorControllerSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorControllerSensorList(params: SensorControllerSensorList$Params, context?: HttpContext): Observable<void> {
    return this.sensorControllerSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `sensorControllerGetById()` */
  static readonly SensorControllerGetByIdPath = '/sensors/get-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorControllerGetById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerGetById$Response(params: SensorControllerGetById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sensorControllerGetById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerGetById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerGetById(params: SensorControllerGetById$Params, context?: HttpContext): Observable<void> {
    return this.sensorControllerGetById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `pirSensorControllerAddPirSensorData()` */
  static readonly PirSensorControllerAddPirSensorDataPath = '/pir-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pirSensorControllerAddPirSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pirSensorControllerAddPirSensorData$Response(params: PirSensorControllerAddPirSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return pirSensorControllerAddPirSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pirSensorControllerAddPirSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pirSensorControllerAddPirSensorData(params: PirSensorControllerAddPirSensorData$Params, context?: HttpContext): Observable<void> {
    return this.pirSensorControllerAddPirSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `pirSensorControllerPirSensorList()` */
  static readonly PirSensorControllerPirSensorListPath = '/pir-sensor/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pirSensorControllerPirSensorList()` instead.
   *
   * This method doesn't expect any request body.
   */
  pirSensorControllerPirSensorList$Response(params: PirSensorControllerPirSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return pirSensorControllerPirSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pirSensorControllerPirSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pirSensorControllerPirSensorList(params: PirSensorControllerPirSensorList$Params, context?: HttpContext): Observable<void> {
    return this.pirSensorControllerPirSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `smokeSensorControllerAddSmokeSensorData()` */
  static readonly SmokeSensorControllerAddSmokeSensorDataPath = '/smoke-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `smokeSensorControllerAddSmokeSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  smokeSensorControllerAddSmokeSensorData$Response(params: SmokeSensorControllerAddSmokeSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return smokeSensorControllerAddSmokeSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `smokeSensorControllerAddSmokeSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  smokeSensorControllerAddSmokeSensorData(params: SmokeSensorControllerAddSmokeSensorData$Params, context?: HttpContext): Observable<void> {
    return this.smokeSensorControllerAddSmokeSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `smokeSensorControllerDhtSensorList()` */
  static readonly SmokeSensorControllerDhtSensorListPath = '/smoke-sensor/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `smokeSensorControllerDhtSensorList()` instead.
   *
   * This method doesn't expect any request body.
   */
  smokeSensorControllerDhtSensorList$Response(params: SmokeSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return smokeSensorControllerDhtSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `smokeSensorControllerDhtSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  smokeSensorControllerDhtSensorList(params: SmokeSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<void> {
    return this.smokeSensorControllerDhtSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `reedSwitchControllerAddReedSwitchController()` */
  static readonly ReedSwitchControllerAddReedSwitchControllerPath = '/reed-switch/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reedSwitchControllerAddReedSwitchController()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reedSwitchControllerAddReedSwitchController$Response(params: ReedSwitchControllerAddReedSwitchController$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return reedSwitchControllerAddReedSwitchController(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerAddReedSwitchController$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reedSwitchControllerAddReedSwitchController(params: ReedSwitchControllerAddReedSwitchController$Params, context?: HttpContext): Observable<void> {
    return this.reedSwitchControllerAddReedSwitchController$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `reedSwitchControllerReedSwitchList()` */
  static readonly ReedSwitchControllerReedSwitchListPath = '/reed-switch/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reedSwitchControllerReedSwitchList()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerReedSwitchList$Response(params: ReedSwitchControllerReedSwitchList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return reedSwitchControllerReedSwitchList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerReedSwitchList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerReedSwitchList(params: ReedSwitchControllerReedSwitchList$Params, context?: HttpContext): Observable<void> {
    return this.reedSwitchControllerReedSwitchList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `reedSwitchControllerGetLatestData()` */
  static readonly ReedSwitchControllerGetLatestDataPath = '/reed-switch/latest-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reedSwitchControllerGetLatestData()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerGetLatestData$Response(params: ReedSwitchControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return reedSwitchControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerGetLatestData(params: ReedSwitchControllerGetLatestData$Params, context?: HttpContext): Observable<void> {
    return this.reedSwitchControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `lightControllerChangeLightState()` */
  static readonly LightControllerChangeLightStatePath = '/light/change-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerChangeLightState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lightControllerChangeLightState$Response(params: LightControllerChangeLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return lightControllerChangeLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerChangeLightState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lightControllerChangeLightState(params: LightControllerChangeLightState$Params, context?: HttpContext): Observable<void> {
    return this.lightControllerChangeLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `lightControllerLightList()` */
  static readonly LightControllerLightListPath = '/light/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerLightList()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerLightList$Response(params: LightControllerLightList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return lightControllerLightList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerLightList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerLightList(params: LightControllerLightList$Params, context?: HttpContext): Observable<void> {
    return this.lightControllerLightList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `lightControllerGetLightState()` */
  static readonly LightControllerGetLightStatePath = '/light/get-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lightControllerGetLightState()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerGetLightState$Response(params: LightControllerGetLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return lightControllerGetLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lightControllerGetLightState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lightControllerGetLightState(params: LightControllerGetLightState$Params, context?: HttpContext): Observable<void> {
    return this.lightControllerGetLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `alarmControllerChangeLightState()` */
  static readonly AlarmControllerChangeLightStatePath = '/alarm/change-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alarmControllerChangeLightState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alarmControllerChangeLightState$Response(params: AlarmControllerChangeLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return alarmControllerChangeLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerChangeLightState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alarmControllerChangeLightState(params: AlarmControllerChangeLightState$Params, context?: HttpContext): Observable<void> {
    return this.alarmControllerChangeLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `alarmControllerGetAlarmState()` */
  static readonly AlarmControllerGetAlarmStatePath = '/alarm/get-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alarmControllerGetAlarmState()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerGetAlarmState$Response(params: AlarmControllerGetAlarmState$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return alarmControllerGetAlarmState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerGetAlarmState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerGetAlarmState(params: AlarmControllerGetAlarmState$Params, context?: HttpContext): Observable<void> {
    return this.alarmControllerGetAlarmState$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `alarmControllerAlarmList()` */
  static readonly AlarmControllerAlarmListPath = '/alarm/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alarmControllerAlarmList()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerAlarmList$Response(params: AlarmControllerAlarmList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return alarmControllerAlarmList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerAlarmList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerAlarmList(params: AlarmControllerAlarmList$Params, context?: HttpContext): Observable<void> {
    return this.alarmControllerAlarmList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `notificationControllerGetNotificationById()` */
  static readonly NotificationControllerGetNotificationByIdPath = '/notifications/get-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerGetNotificationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetNotificationById$Response(params: NotificationControllerGetNotificationById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return notificationControllerGetNotificationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerGetNotificationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerGetNotificationById(params: NotificationControllerGetNotificationById$Params, context?: HttpContext): Observable<void> {
    return this.notificationControllerGetNotificationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `notificationControllerNotificationList()` */
  static readonly NotificationControllerNotificationListPath = '/notifications/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notificationControllerNotificationList()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerNotificationList$Response(params: NotificationControllerNotificationList$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return notificationControllerNotificationList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notificationControllerNotificationList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notificationControllerNotificationList(params: NotificationControllerNotificationList$Params, context?: HttpContext): Observable<void> {
    return this.notificationControllerNotificationList$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
