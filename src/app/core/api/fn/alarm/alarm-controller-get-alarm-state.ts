/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AlarmDto } from '../../models/alarm-dto';

export interface AlarmControllerGetAlarmState$Params {
  sensorId: string;
}

export function alarmControllerGetAlarmState(http: HttpClient, rootUrl: string, params: AlarmControllerGetAlarmState$Params, context?: HttpContext): Observable<StrictHttpResponse<AlarmDto>> {
  const rb = new RequestBuilder(rootUrl, alarmControllerGetAlarmState.PATH, 'get');
  if (params) {
    rb.query('sensorId', params.sensorId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AlarmDto>;
    })
  );
}

alarmControllerGetAlarmState.PATH = '/alarm/get-state';
