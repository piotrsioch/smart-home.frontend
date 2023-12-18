/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { alarmControllerAlarmList } from '../fn/alarm/alarm-controller-alarm-list';
import { AlarmControllerAlarmList$Params } from '../fn/alarm/alarm-controller-alarm-list';
import { alarmControllerChangeLightState } from '../fn/alarm/alarm-controller-change-light-state';
import { AlarmControllerChangeLightState$Params } from '../fn/alarm/alarm-controller-change-light-state';
import { alarmControllerGetAlarmState } from '../fn/alarm/alarm-controller-get-alarm-state';
import { AlarmControllerGetAlarmState$Params } from '../fn/alarm/alarm-controller-get-alarm-state';
import { AlarmDto } from '../models/alarm-dto';
import { PaginationOutput } from '../models/pagination-output';

@Injectable({ providedIn: 'root' })
export class AlarmService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `alarmControllerChangeLightState()` */
  static readonly AlarmControllerChangeLightStatePath = '/alarm/change-state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alarmControllerChangeLightState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alarmControllerChangeLightState$Response(params: AlarmControllerChangeLightState$Params, context?: HttpContext): Observable<StrictHttpResponse<AlarmDto>> {
    return alarmControllerChangeLightState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerChangeLightState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alarmControllerChangeLightState(params: AlarmControllerChangeLightState$Params, context?: HttpContext): Observable<AlarmDto> {
    return this.alarmControllerChangeLightState$Response(params, context).pipe(
      map((r: StrictHttpResponse<AlarmDto>): AlarmDto => r.body)
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
  alarmControllerGetAlarmState$Response(params: AlarmControllerGetAlarmState$Params, context?: HttpContext): Observable<StrictHttpResponse<AlarmDto>> {
    return alarmControllerGetAlarmState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerGetAlarmState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerGetAlarmState(params: AlarmControllerGetAlarmState$Params, context?: HttpContext): Observable<AlarmDto> {
    return this.alarmControllerGetAlarmState$Response(params, context).pipe(
      map((r: StrictHttpResponse<AlarmDto>): AlarmDto => r.body)
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
  alarmControllerAlarmList$Response(params: AlarmControllerAlarmList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<AlarmDto>;
}>> {
    return alarmControllerAlarmList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alarmControllerAlarmList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alarmControllerAlarmList(params: AlarmControllerAlarmList$Params, context?: HttpContext): Observable<PaginationOutput & {
'items'?: Array<AlarmDto>;
}> {
    return this.alarmControllerAlarmList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginationOutput & {
'items'?: Array<AlarmDto>;
}>): PaginationOutput & {
'items'?: Array<AlarmDto>;
} => r.body)
    );
  }

}
