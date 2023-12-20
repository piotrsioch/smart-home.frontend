/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AlarmDto } from '../../models/alarm-dto';
import { ChangeAlarmStateInputDto } from '../../models/change-alarm-state-input-dto';

export interface AlarmControllerChangeAlarmState$Params {
      body: ChangeAlarmStateInputDto
}

export function alarmControllerChangeAlarmState(http: HttpClient, rootUrl: string, params: AlarmControllerChangeAlarmState$Params, context?: HttpContext): Observable<StrictHttpResponse<AlarmDto>> {
  const rb = new RequestBuilder(rootUrl, alarmControllerChangeAlarmState.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

alarmControllerChangeAlarmState.PATH = '/alarm/change-state';
