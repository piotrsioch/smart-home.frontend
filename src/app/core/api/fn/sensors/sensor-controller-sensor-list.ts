/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginationOutput } from '../../models/pagination-output';
import { SensorDto } from '../../models/sensor-dto';

export interface SensorControllerSensorList$Params {
  page: number;
  limit: number;
  orderField?: 'sensorId' | 'createdAt' | 'isOpened';
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
}

export function sensorControllerSensorList(http: HttpClient, rootUrl: string, params: SensorControllerSensorList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginationOutput & {
'items'?: Array<SensorDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, sensorControllerSensorList.PATH, 'get');
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
      'items'?: Array<SensorDto>;
      }>;
    })
  );
}

sensorControllerSensorList.PATH = '/sensors/list';
