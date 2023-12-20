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
import { pirSensorControllerAddPirSensorData } from '../fn/pir-sensor/pir-sensor-controller-add-pir-sensor-data';
import { PirSensorControllerAddPirSensorData$Params } from '../fn/pir-sensor/pir-sensor-controller-add-pir-sensor-data';
import { pirSensorControllerPirSensorList } from '../fn/pir-sensor/pir-sensor-controller-pir-sensor-list';
import { PirSensorControllerPirSensorList$Params } from '../fn/pir-sensor/pir-sensor-controller-pir-sensor-list';
import { PirSensorDto } from '../models/pir-sensor-dto';

@Injectable({ providedIn: 'root' })
export class PirSensorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `pirSensorControllerAddPirSensorData()` */
  static readonly PirSensorControllerAddPirSensorDataPath = '/pir-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pirSensorControllerAddPirSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pirSensorControllerAddPirSensorData$Response(params: PirSensorControllerAddPirSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<PirSensorDto>> {
    return pirSensorControllerAddPirSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pirSensorControllerAddPirSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pirSensorControllerAddPirSensorData(params: PirSensorControllerAddPirSensorData$Params, context?: HttpContext): Observable<PirSensorDto> {
    return this.pirSensorControllerAddPirSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<PirSensorDto>): PirSensorDto => r.body)
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
  pirSensorControllerPirSensorList$Response(params: PirSensorControllerPirSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<PirSensorDto>;
}>> {
    return pirSensorControllerPirSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pirSensorControllerPirSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pirSensorControllerPirSensorList(params: PirSensorControllerPirSensorList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<PirSensorDto>;
}> {
    return this.pirSensorControllerPirSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<PirSensorDto>;
}>): PaginationOutput & {
'items'?: Array<PirSensorDto>;
} => r.body)
    );
  }

}
