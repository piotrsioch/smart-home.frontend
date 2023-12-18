/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginationOutput } from '../models/pagination-output';
import { sensorControllerCreateSensor } from '../fn/sensors/sensor-controller-create-sensor';
import { SensorControllerCreateSensor$Params } from '../fn/sensors/sensor-controller-create-sensor';
import { sensorControllerGetById } from '../fn/sensors/sensor-controller-get-by-id';
import { SensorControllerGetById$Params } from '../fn/sensors/sensor-controller-get-by-id';
import { sensorControllerSensorList } from '../fn/sensors/sensor-controller-sensor-list';
import { SensorControllerSensorList$Params } from '../fn/sensors/sensor-controller-sensor-list';
import { SensorDto } from '../models/sensor-dto';

@Injectable({ providedIn: 'root' })
export class SensorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sensorControllerCreateSensor()` */
  static readonly SensorControllerCreateSensorPath = '/sensors/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sensorControllerCreateSensor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerCreateSensor$Response(params: SensorControllerCreateSensor$Params, context?: HttpContext): Observable<StrictHttpResponse<SensorDto>> {
    return sensorControllerCreateSensor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerCreateSensor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerCreateSensor(params: SensorControllerCreateSensor$Params, context?: HttpContext): Observable<SensorDto> {
    return this.sensorControllerCreateSensor$Response(params, context).pipe(
      map((r: StrictHttpResponse<SensorDto>): SensorDto => r.body)
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
  sensorControllerSensorList$Response(params: SensorControllerSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<SensorDto>;
}>> {
    return sensorControllerSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sensorControllerSensorList(params: SensorControllerSensorList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<SensorDto>;
}> {
    return this.sensorControllerSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<SensorDto>;
}>): PaginationOutput & {
'items'?: Array<SensorDto>;
} => r.body)
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
  sensorControllerGetById$Response(params: SensorControllerGetById$Params, context?: HttpContext): Observable<StrictHttpResponse<SensorDto>> {
    return sensorControllerGetById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sensorControllerGetById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sensorControllerGetById(params: SensorControllerGetById$Params, context?: HttpContext): Observable<SensorDto> {
    return this.sensorControllerGetById$Response(params, context).pipe(
      map((r: StrictHttpResponse<SensorDto>): SensorDto => r.body)
    );
  }

}
