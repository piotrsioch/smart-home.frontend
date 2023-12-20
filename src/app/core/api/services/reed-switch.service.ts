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
import { reedSwitchControllerAddReedSwitchController } from '../fn/reed-switch/reed-switch-controller-add-reed-switch-controller';
import { ReedSwitchControllerAddReedSwitchController$Params } from '../fn/reed-switch/reed-switch-controller-add-reed-switch-controller';
import { reedSwitchControllerGetLatestData } from '../fn/reed-switch/reed-switch-controller-get-latest-data';
import { ReedSwitchControllerGetLatestData$Params } from '../fn/reed-switch/reed-switch-controller-get-latest-data';
import { reedSwitchControllerReedSwitchList } from '../fn/reed-switch/reed-switch-controller-reed-switch-list';
import { ReedSwitchControllerReedSwitchList$Params } from '../fn/reed-switch/reed-switch-controller-reed-switch-list';
import { ReedSwitchDto } from '../models/reed-switch-dto';

@Injectable({ providedIn: 'root' })
export class ReedSwitchService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `reedSwitchControllerAddReedSwitchController()` */
  static readonly ReedSwitchControllerAddReedSwitchControllerPath = '/reed-switch/add-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reedSwitchControllerAddReedSwitchController()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reedSwitchControllerAddReedSwitchController$Response(params: ReedSwitchControllerAddReedSwitchController$Params, context?: HttpContext): Observable<StrictHttpResponse<ReedSwitchDto>> {
    return reedSwitchControllerAddReedSwitchController(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerAddReedSwitchController$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reedSwitchControllerAddReedSwitchController(params: ReedSwitchControllerAddReedSwitchController$Params, context?: HttpContext): Observable<ReedSwitchDto> {
    return this.reedSwitchControllerAddReedSwitchController$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReedSwitchDto>): ReedSwitchDto => r.body)
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
  reedSwitchControllerReedSwitchList$Response(params: ReedSwitchControllerReedSwitchList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<ReedSwitchDto>;
}>> {
    return reedSwitchControllerReedSwitchList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerReedSwitchList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerReedSwitchList(params: ReedSwitchControllerReedSwitchList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<ReedSwitchDto>;
}> {
    return this.reedSwitchControllerReedSwitchList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<ReedSwitchDto>;
}>): PaginationOutput & {
'items'?: Array<ReedSwitchDto>;
} => r.body)
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
  reedSwitchControllerGetLatestData$Response(params: ReedSwitchControllerGetLatestData$Params, context?: HttpContext): Observable<StrictHttpResponse<ReedSwitchDto>> {
    return reedSwitchControllerGetLatestData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reedSwitchControllerGetLatestData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reedSwitchControllerGetLatestData(params: ReedSwitchControllerGetLatestData$Params, context?: HttpContext): Observable<ReedSwitchDto> {
    return this.reedSwitchControllerGetLatestData$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReedSwitchDto>): ReedSwitchDto => r.body)
    );
  }

}
