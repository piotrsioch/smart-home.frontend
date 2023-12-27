/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AddDhtSensorDataInputDto } from '../models/add-dht-sensor-data-input-dto';
import { dhtSensorControllerAddDhtSensorData } from '../fn/dht-sensor/dht-sensor-controller-add-dht-sensor-data';
import { DhtSensorControllerAddDhtSensorData$Params } from '../fn/dht-sensor/dht-sensor-controller-add-dht-sensor-data';
import { dhtSensorControllerDhtSensorList } from '../fn/dht-sensor/dht-sensor-controller-dht-sensor-list';
import { DhtSensorControllerDhtSensorList$Params } from '../fn/dht-sensor/dht-sensor-controller-dht-sensor-list';
import { dhtSensorControllerGetLatestData } from '../fn/dht-sensor/dht-sensor-controller-get-latest-data';
import { DhtSensorControllerGetLatestData$Params } from '../fn/dht-sensor/dht-sensor-controller-get-latest-data';
import { DhtSensorDto } from '../models/dht-sensor-dto';
import { PaginationOutput } from '../models/pagination-output';

@Injectable({ providedIn: 'root' })
export class DhtSensorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `dhtSensorControllerAddDhtSensorData()` */
  static readonly DhtSensorControllerAddDhtSensorDataPath = '/dht-sensor/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dhtSensorControllerAddDhtSensorData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dhtSensorControllerAddDhtSensorData$Response(params: DhtSensorControllerAddDhtSensorData$Params, context?: HttpContext): Observable<StrictHttpResponse<AddDhtSensorDataInputDto>> {
    return dhtSensorControllerAddDhtSensorData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerAddDhtSensorData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  dhtSensorControllerAddDhtSensorData(params: DhtSensorControllerAddDhtSensorData$Params, context?: HttpContext): Observable<AddDhtSensorDataInputDto> {
    return this.dhtSensorControllerAddDhtSensorData$Response(params, context).pipe(
      map((r: StrictHttpResponse<AddDhtSensorDataInputDto>): AddDhtSensorDataInputDto => r.body)
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
  dhtSensorControllerDhtSensorList$Response(params: DhtSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<DhtSensorDto>;
}>> {
    return dhtSensorControllerDhtSensorList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerDhtSensorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerDhtSensorList(params: DhtSensorControllerDhtSensorList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<DhtSensorDto>;
}> {
    return this.dhtSensorControllerDhtSensorList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<DhtSensorDto>;
}>): PaginationOutput & {
'items'?: Array<DhtSensorDto>;
} => r.body)
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
  dhtSensorControllerGetLatestData$Response(params: DhtSensorControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<DhtSensorDto>> {
    return dhtSensorControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dhtSensorControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dhtSensorControllerGetLatestData(params: DhtSensorControllerGetLatestData$Params, context?: HttpContext): Observable<DhtSensorDto> {
    return this.dhtSensorControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<DhtSensorDto>): DhtSensorDto => r.body)
    );
  }

}
