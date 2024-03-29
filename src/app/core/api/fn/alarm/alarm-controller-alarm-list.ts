/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AlarmDto } from '../../models/alarm-dto';
import { PaginationOutput } from '../../models/pagination-output';

export interface AlarmControllerAlarmList$Params {
  page: number;
  limit: number;
  orderField?: 'sensorId' | 'createdAt' | 'state';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function alarmControllerAlarmList(http: HttpClient, rootUrl: string, params: AlarmControllerAlarmList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<AlarmDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, alarmControllerAlarmList.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('orderField', params.orderField, {});
    rb.query('orderDirection', params.orderDirection, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginationOutput & {
      'items'?: Array<AlarmDto>;
      }>;
    })
  );
}

alarmControllerAlarmList.PATH = '/alarm/list';
