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
import { smokeSensorControllerAddSmokeSensorData } from '../fn/smoke-sensor/smoke-sensor-controller-add-smoke-sensor-data';
import { SmokeSensorControllerAddSmokeSensorData$Params } from '../fn/smoke-sensor/smoke-sensor-controller-add-smoke-sensor-data';
import { smokeSensorControllerDhtSensorList } from '../fn/smoke-sensor/smoke-sensor-controller-dht-sensor-list';
import { SmokeSensorControllerDhtSensorList$Params } from '../fn/smoke-sensor/smoke-sensor-controller-dht-sensor-list';
import { smokeSensorControllerGetLatestData } from '../fn/smoke-sensor/smoke-sensor-controller-get-latest-data';
import { SmokeSensorControllerGetLatestData$Params } from '../fn/smoke-sensor/smoke-sensor-controller-get-latest-data';
import { SmokeSensorDto } from '../models/smoke-sensor-dto';

@Injectable({ providedIn: 'root' })
export class SmokeSensorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `smokeSensorControllerAddSmokeSensorData()` */
  static readonly SmokeSensorControllerAddSmokeSensorDataPath = '/smoke-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `smokeSensorControllerAddSmokeSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  smokeSensorControllerAddSmokeSensorData$Response(params: SmokeSensorControllerAddSmokeSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<SmokeSensorDto>> {
    return smokeSensorControllerAddSmokeSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `smokeSensorControllerAddSmokeSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  smokeSensorControllerAddSmokeSensorData(params: SmokeSensorControllerAddSmokeSensorData$Params, context?: HttpContext): Observable<SmokeSensorDto> {
    return this.smokeSensorControllerAddSmokeSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<SmokeSensorDto>): SmokeSensorDto => r.body)
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
  smokeSensorControllerDhtSensorList$Response(params: SmokeSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<SmokeSensorDto>;
}>> {
    return smokeSensorControllerDhtSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `smokeSensorControllerDhtSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  smokeSensorControllerDhtSensorList(params: SmokeSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<SmokeSensorDto>;
}> {
    return this.smokeSensorControllerDhtSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<SmokeSensorDto>;
}>): PaginationOutput & {
'items'?: Array<SmokeSensorDto>;
} => r.body)
    );
  }

  /** Path part for operation `smokeSensorControllerGetLatestData()` */
  static readonly SmokeSensorControllerGetLatestDataPath = '/smoke-sensor/latest-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `smokeSensorControllerGetLatestData()` instead.
   *
   * This method doesn't expect any request body.
   */
  smokeSensorControllerGetLatestData$Response(params: SmokeSensorControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<SmokeSensorDto>> {
    return smokeSensorControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `smokeSensorControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  smokeSensorControllerGetLatestData(params: SmokeSensorControllerGetLatestData$Params, context?: HttpContext): Observable<SmokeSensorDto> {
    return this.smokeSensorControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<SmokeSensorDto>): SmokeSensorDto => r.body)
    );
  }

}
